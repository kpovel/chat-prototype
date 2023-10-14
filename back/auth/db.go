package db

import (
	"database/sql"
	"log"
	"os"
)

type HandlerDependencies struct {
  DB *sql.DB
}

func Connect() *sql.DB {
	dbToken := os.Getenv("TC_DB_AUTH_TOKEN")

	if dbToken == "" {
		log.Fatal("You should pass TC_DB_AUTH_TOKEN env")
	}

	dbUrl := "libsql://tc-chat-prototype-kpovel.turso.io?authToken=" + dbToken
	db, err := sql.Open("libsql", dbUrl)
	if err != nil {
		log.Fatalf("failed to open db %s: %s", dbUrl, err)
	}

	return db
}
