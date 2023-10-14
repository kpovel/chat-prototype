package db

import (
	"back/hashing"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type LoginBody struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type User struct {
	Id             int
	Login          string
	HashedPassword string
}

func (app *HandlerDependencies) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Content-Type header is not application/json", http.StatusBadRequest)
		return
	}

	var signupBody LoginBody
	if err := json.NewDecoder(r.Body).Decode(&signupBody); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	if signupBody.Login == "" || signupBody.Password == "" {
		http.Error(w, "Login and password are required", http.StatusBadRequest)
		return
	}

	query := app.DB.QueryRow("select * from user where login = ?", signupBody.Login)

	var user User

	if err := query.Scan(&user.Id, &user.Login, &user.HashedPassword); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	if !hashing.CheckPasswordHash(signupBody.Password, user.HashedPassword) {
		http.Error(w, "Wrong password", http.StatusBadRequest)
		return
	}

	session, err := hashing.GetStore().Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	session.Values["userId"] = user.Id
	session.Save(r, w)

	fmt.Fprint(w, "Logged in")
}
