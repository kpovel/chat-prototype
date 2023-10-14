package db

import (
	"back/hashing"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type SignupBody struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func (app *HandlerDependencies) Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Content-Type header is not application/json", http.StatusBadRequest)
		return
	}

	var signupBody SignupBody
	if err := json.NewDecoder(r.Body).Decode(&signupBody); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	if signupBody.Login == "" || signupBody.Password == "" {
		http.Error(w, "Login and password are required", http.StatusBadRequest)
		return
	}

	hashedPassword, err := hashing.HashPassword(signupBody.Password)

	if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Println(err)
    return
	}

	query, err := app.DB.Exec("insert into user (login, password) values (?, ?)", signupBody.Login, hashedPassword)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Println(err)
    return
  }

  _, err = query.LastInsertId()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Println(err)
    return
  }

  fmt.Fprintf(w, "User %s created", signupBody.Login)
}
