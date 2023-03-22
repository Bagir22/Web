package main

import (
	"log"
	"net/http"
	"text/template"
)

type indexPage struct {
	Title    string
	Subtitle string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("../pages/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	data := indexPage{
		Title:    "Blog",
		Subtitle: "My",
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}
