package main

import (
	"log"
	"net/http"
	"text/template"

	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	FeaturedPosts   []featuredPostData
	MostRecentPosts []mostRecentPostData
}

type featuredPostData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
	Featured    string `db:"featured"`
}

type mostRecentPostData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
	Featured    string `db:"featured"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		mostRecentPosts, err := mostRecentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := indexPageData{
			FeaturedPosts:   featuredPosts,
			MostRecentPosts: mostRecentPosts,
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
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

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			author,
			author_url,
			publish_date
		FROM
			post
		WHERE featured = 1`

	var posts []featuredPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func mostRecentPosts(db *sqlx.DB) ([]mostRecentPostData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			author,
			author_url,
			publish_date
		FROM
			post
		WHERE featured = 0`

	var posts []mostRecentPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

/*func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("./pages/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	data := indexPage{
		FeaturedPosts:   featuredPosts(),
		MostRecentPosts: mostRecentPosts(),
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}*/

/*func featuredPosts() []featuredPostData {
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
			Category:    "Adevnture",
		},
	}
}*/

/*func mostRecentPosts() []mostRecentPostData {
	return []mostRecentPostData{
		{
			Title:       "Still Standing Tall",
			Subtitle:    "Life begins at the end of your comfort zone.",
			Image:       "static/img/posts/post1.jpg",
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
}*/
