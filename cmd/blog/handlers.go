package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"text/template"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	FeaturedPosts   []PostData
	MostRecentPosts []PostData
}

type PostData struct {
	PostId      int    `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
	Featured    string `db:"featured"`
	PostURL     string `db:"url"`
}

type Post struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	Image    string `db:"image_url"`
	Text     string `db:"content"`
}

type CreatePost struct {
	Title           string `json:"title"`
	Desc            string `json:"desc"`
	AuthorName      string `json:"authorName"`
	AuthorPhotoName string `json:"authorPhotoName"`
	AuthorPhotoVal  string `json:"authorPhotoVal"`
	Date            string `json:"date"`
	HeroImgBigName  string `json:"heroImgName"`
	HeroImgBigVal   string `json:"heroImgVal"`
	Content string `json:"content"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := getPosts(db, 1, 2)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		mostRecentPosts, err := getPosts(db, 0, 6)
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

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]
		postId, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post id", 403)
			log.Println(err)
			return
		}
		post, err := postByID(db, postId)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Post not found", 404)
				log.Println(err)
				return
			}

			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func admin(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("./pages/admin.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	err = ts.Execute(w, nil)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		reqData, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println("# ", err)
		}

		var req CreatePost

		err = json.Unmarshal(reqData, &req)
		if err != nil {
			log.Println("$ ", err)
		}

		saveImage(formatBase64String(req.AuthorPhotoVal), "assets/img/av/" + req.AuthorPhotoName)
		saveImage(formatBase64String(req.HeroImgBigVal), "assets/img/posts/" + req.HeroImgBigName)

		err = savePost(db, req)

		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		w.WriteHeader(http.StatusCreated)
		log.Println("Request completed successfully")
	}
}

func formatBase64String(value string) string {
	regex := regexp.MustCompile("^.+,")
	return regex.ReplaceAllString(value, "")
}

func savePost(db *sqlx.DB, req CreatePost) error {
	const query = `
		INSERT INTO 
				post 
		(
			title, 
			subtitle, 
			author, 
			author_url, 
			publish_date,
			image_url,
			content
		) 
		VALUES 
		(
			?, 
			?, 
			?, 
			?,
			?,
			?,
			?
		)
	`
	_, err := db.Exec(query, req.Title, req.Desc, req.AuthorName,
		"static/img/av/"+req.AuthorPhotoName, req.Date, "static/img/posts/"+req.HeroImgBigName, req.Content)

	if err != nil {
		log.Println("Insert into db error:")
		log.Println(err)
	}



	return err
}

func saveImage(image string, name string) error {
	img, err := base64.StdEncoding.DecodeString(image)
	file, err := os.Create(name)
	_, err = file.Write(img) 

	if err != nil {
		log.Println("Image not saved:")
		log.Println(err)
	}

	return err
}

func login(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("./pages/login.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	err = ts.Execute(w, nil)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request completed successfuly")
}

func postByID(db *sqlx.DB, id int) (Post, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			content
		FROM
			post
		WHERE post_id = ?`
	var post Post

	err := db.Get(&post, query, id)
	if err != nil {
		return Post{}, err
	}

	return post, nil
}

func getPosts(db *sqlx.DB, featured, limit int) ([]PostData, error) {
	var query = fmt.Sprintf(`
		SELECT
			post_id,
			title,
			subtitle,
			image_url,
			author,
			author_url,
			publish_date,
			CONCAT('post/', post_id) as 'url'
		FROM
			post
		WHERE featured = %d
		ORDER BY post_id DESC
		LIMIT %d`, featured, limit)

	var posts []PostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}
