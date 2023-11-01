package chat

import (
	"back/hashing"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var (
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan []byte)
	mu        sync.Mutex
)

type MessageBody struct {
	Message string `json:"message"`
	Session string `json:"session"`
}

func Chat(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(w, err)
		return
	}

	defer remoteClient(conn)
	mu.Lock()
	clients[conn] = true
	mu.Unlock()

	for {
		_, messageBody, err := conn.ReadMessage()
		if err != nil {
			log.Println(w, err)
			return
		}

		var encodedBody MessageBody
		if err := json.Unmarshal(messageBody, &encodedBody); err != nil {
			log.Println(err)
			return
		}

		r.Header.Set("Cookie", fmt.Sprintf("session=%s", encodedBody.Session))
		session, err := hashing.GetStore().Get(r, "session")
		if err != nil {
			log.Println(err)
			return
		}

		userId := session.Values["userId"]
		messageRows, err := DB.Query("insert into chat (message, user_id) values (?, ?) returning id as messageId, sent_at as sentAt", encodedBody.Message, userId)
		if err != nil {
			log.Println(err)
			return
		}
		defer messageRows.Close()

		var messageId int
		var sentAt string

		for messageRows.Next() {
			if err := messageRows.Scan(&messageId, &sentAt); err != nil {
				log.Println(err)
				return
			}
		}

		userLogin, err := DB.Query("select login from user where id = ?", userId)
		if err != nil {
			log.Println(err)
			return
		}
		defer userLogin.Close()

		var login string
		for userLogin.Next() {
			err := userLogin.Scan(&login)
			if err != nil {
				log.Println(err)
				return
			}
		}

		log.Printf("Received: %s\n", encodedBody.Message)

		broadcast <- []byte(fmt.Sprintf(`{"sendBy": "%s", "messageId": %d, "sentAt": "%s", "message": "%s"}`, login, messageId, sentAt, encodedBody.Message))
	}
}

func HandleBroadcast() {
	for {
		message := <-broadcast
		mu.Lock()
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				log.Println(err)
				client.Close()
				delete(clients, client)
			}
		}
		mu.Unlock()
	}
}

func remoteClient(conn *websocket.Conn) {
	mu.Lock()
	delete(clients, conn)
	mu.Unlock()
	conn.Close()
}
