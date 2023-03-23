package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = ":3000"

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/home", index)
	mux.HandleFunc("/post", post)
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./assets"))))
	fmt.Println("Start server")
	err := http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}
}
