package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
)

type indexPage struct {
	Title           string
	FeaturedPosts   []featuredPostData
	MostRecentPosts []mostRecentPostData
}

type featuredPostData struct {
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

type mostRecentPostData struct {
	Title       string
	Subtitle    string
	Image       string
	Author      string
	AuthorImg   string
	PublishDate string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("./pages/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	data := indexPage{
		Title:           "Escape",
		FeaturedPosts:   featuredPosts(),
		MostRecentPosts: mostRecentPosts(),
	}

	fmt.Println(data)
	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}

func post(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("./pages/post.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	//data :=

	err = ts.Execute(w, nil)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgModifier: "featured-post_first",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/av/MatVogels.png",
			PublishDate: "September 25, 2015",
		},
		{
			Title:       "From Top Down",
			Subtitle:    "Once a year, go someplace you’ve never been before.",
			ImgModifier: "featured-post_second",
			Author:      "William Wong",
			AuthorImg:   "static/img/av/WilliamWong.png",
			PublishDate: "September 25, 2015",
		},
	}
}

func mostRecentPosts() []mostRecentPostData {
	return []mostRecentPostData{
		{
			Title:       "Still Standing Tall",
			Subtitle:    "Life begins at the end of your comfort zone.",
			Image:       "static/img/posts/post1.png",
			Author:      "William Wong",
			AuthorImg:   "static/img/av/WilliamWong.png",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Sunny Side Up",
			Subtitle:    "No place is ever as bad as they tell you it’s going to be.",
			Image:       "static/img/posts/post2.png",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/av/MatVogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Water Falls",
			Subtitle:    "We travel not to escape life, but for life not to escape us.",
			Image:       "static/img/posts/post3.png",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/av/MatVogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Through the Mist",
			Subtitle:    "Travel makes you see what a tiny place you occupy in the world.",
			Image:       "static/img/posts/post4.png",
			Author:      "William Wong",
			AuthorImg:   "static/img/av/WilliamWong.png",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Awaken Early",
			Subtitle:    "Not all those who wander are lost.",
			Image:       "static/img/posts/post5.png",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/av/MatVogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Try it Always",
			Subtitle:    "The world is a book, and those who do not travel read only one page.",
			Image:       "static/img/posts/post6.png",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/av/MatVogels.png",
			PublishDate: "9/25/2015",
		},
	}
}
