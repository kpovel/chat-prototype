package main

import (
	"back/auth"
	"back/chat"
	"fmt"
	"log"
	"net/http"

	_ "github.com/libsql/libsql-client-go/libsql"
)

func main() {
	dbConn := db.Connect()

	deps := &db.HandlerDependencies{
		DB: dbConn,
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Root page, have no any protection")
	})

	http.HandleFunc("/auth/signup", deps.Signup)
	http.HandleFunc("/auth/login", deps.Login)
	http.HandleFunc("/auth/validate", deps.ValidateSession)
	http.HandleFunc("/ws/chat", chat.Chat)
	go chat.HandleBroadcast()
	http.HandleFunc("/websocket.html", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "websocket.html")
	})

	err := http.ListenAndServe(":6969", nil)
	if err != nil {
		log.Fatal(err)
	}
}
