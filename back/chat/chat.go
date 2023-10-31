package chat

import (
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

func Chat(w http.ResponseWriter, r *http.Request) {
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
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(w, err)
			return
		}

		log.Printf("Received: %s\n", message)

		broadcast <- message
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
