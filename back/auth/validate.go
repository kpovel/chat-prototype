package db

import (
	"back/hashing"
	"fmt"
	"log"
	"net/http"
)

func (app *HandlerDependencies) ValidateSession(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	session, err := hashing.GetStore().Get(r, "session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println(err)
		return
	}

	if session.Values["userId"] == nil {
		http.Error(w, "Not authorized", http.StatusUnauthorized)
		return
	}

	fmt.Fprint(w, "You pass the validation")
}
