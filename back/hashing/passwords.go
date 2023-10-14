package hashing

import (
	"crypto/rand"
	"github.com/gorilla/sessions"

	"golang.org/x/crypto/bcrypt"
)

var (
	SESSION_KEY = GenerateKey()
	store       = sessions.NewCookieStore(SESSION_KEY)
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateKey() []byte {
	key := make([]byte, 32) // AES-256

	_, err := rand.Read(key)
	if err != nil {
		panic(err)
	}

	return key
}

func GetStore() (*sessions.CookieStore) {
	return store
}
