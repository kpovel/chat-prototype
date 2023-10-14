package main

import (
	"back/auth"
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

  http.HandleFunc("/signup", deps.Signup)
  http.HandleFunc("/login", deps.Login)

  err := http.ListenAndServe(":6969", nil)
	if err != nil {
		log.Fatal(err)
	}
}
