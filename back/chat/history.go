package chat

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"sort"
)

type message struct {
	MessageId uint
	Message   string
	SentBy    string
	SentAt    string
}

func History(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	historyQuery, err := DB.Query(`select chat.id as messageId, message, login as sentBy, sent_at as setnAt
  from chat inner
  join user on chat.user_id = user.id
  order by chat.id desc
  limit 100;`)
	if err != nil {
		log.Println(err)
		http.Error(w, "Failed to history", http.StatusInternalServerError)
		return
	}
	defer historyQuery.Close()

	var history []message
	for historyQuery.Next() {
		var msg message
		err := historyQuery.Scan(&msg.MessageId, &msg.Message, &msg.SentBy, &msg.SentAt)
		if err != nil {
			log.Println(err)
			http.Error(w, "Failed to parse history", http.StatusInternalServerError)
			return
		}
		history = append(history, msg)
	}

	sort.Slice(history, func(i, j int) bool {
		return history[i].MessageId < history[j].MessageId
	})

	w.Header().Set("Content-Type", "application/json")
	historyJson, err := json.Marshal(history)
	if err != nil {
		log.Println(err)
		http.Error(w, "Failed to parse history", http.StatusInternalServerError)
		return
	}

	w.Write(historyJson)
}
