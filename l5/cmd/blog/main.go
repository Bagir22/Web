package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = ":8004"

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/home", index)
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../static"))))
	fmt.Println("Start server")
	err := http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}

}
