class Preview {
    constructor(fields) {
        this.fields = fields;
        this.formFileFields = document.getElementsByClassName('input__file-field');
        this.formTextFields = document.getElementsByClassName('input__text-field');
        this.trashes = document.getElementsByClassName('form-file-field__trash');
    }

    setImagePreview() {
        for (let i = 0; i < this.formFileFields.length; i++) {
            this.formFileFields[i].addEventListener('change', event => {
                const fileInput = event.target;
                this.setPicture(fileInput);
            })
        }
    }

    setTextPreview() {
        const {card, article} = this.fields.previews;
        const {title, description, date, authorName} = this.fields.inputs;
        date.addEventListener('change', event => {
            const input = event.target;
            if (input.id === date.id) {
                card.date.innerHTML = input.value;
            }
        })
        for (let i = 0; i < this.formTextFields.length; i++) {
            this.formTextFields[i].addEventListener('input', event => {
                const input = event.target;
                if (input.id === title.id) {
                    if (input.value.length !== 0) {
                        card.title.innerHTML = input.value;
                        article.title.innerHTML = input.value;
                    } else {
                        card.title.innerHTML = "New Post";
                        article.title.innerHTML = "New Post";
                    }
                }
                if (input.id === description.id) {
                    if (input.value.length !== 0) {
                        article.description.textContent = input.value;
                        card.description.innerHTML = input.value;
                    } else {
                        article.description.innerHTML = "Please, enter any description";
                        card.description.innerHTML = "Please, enter any description";
                    }
                }
                if (input.id === authorName.id) {
                    if (input.value.length !== 0) {
                        card.authorName.innerHTML = input.value;
                    } else {
                        card.authorName.innerHTML = "Enter author name";
                    }
                }
            })
        }
    }
    

    setPicture(fileInput) {
        const reader = new FileReader();
        const file = fileInput.files[0];
        const {heroImgSmall, heroImgBig, authorPhoto} = this.fields.inputs;
        const {image, authorImg} = this.fields.previews.card;
        const articleImage = this.fields.previews.article.image;
        const {heroImgSmallInput, heroImgBigInput, authorImageInput} = this.fields.previews.inputs;
        const {authorTrash, bigImgTrash, smallImgTrash} = this.fields.trashes;

        reader.onloadend = function () {
            if (fileInput.id === heroImgSmall.id) {
                heroImgSmallInput.src = reader.result;
                image.src = reader.result;
                smallImgTrash.style.display = "block";
            }
            if (fileInput.id === heroImgBig.id) {
                heroImgBigInput.src = reader.result;
                articleImage.src = reader.result;
                bigImgTrash.style.display = "block";
            }
            if (fileInput.id === authorPhoto.id) {
                authorImageInput.src = reader.result;
                authorImg.src = reader.result; 
                authorTrash.style.display = "block";              
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    setTrashes() {
        for (let i = 0; i < this.trashes.length; i++) {
            this.trashes[i].addEventListener('click', event => {
                if (i == 0) {
                    this.fields.previews.inputs.authorImageInput.src = 'static/img/icons/camera.png';
                    this.fields.previews.card.authorImg.removeAttribute('src');
                    this.trashes[i].style.display = "none";
                } else if (i == 1){
                    this.fields.previews.inputs.heroImgBigInput.src = 'static/img/icons/FrameBig.png';
                    this.fields.previews.article.image.removeAttribute('src');
                    this.trashes[i].style.display = "none";
                } else {
                    this.fields.previews.inputs.heroImgSmallInput.src = 'static/img/icons/FrameSmall.png';
                    this.fields.previews.card.image.removeAttribute('src');
                    this.trashes[i].style.display = "none";
                }             
            })
        }
    }

    show = (elemId) => {
        const elem = document.getElementById(elemId)
        if (elem) {
            elem.style.display = "none";
        }
    }

    hide = (elemId) => {
        const elem = document.getElementById(elemId);
        if (elem) {
            elem.style.display = 'none';
        }
    }
}

window.onload = () => {

    const fields = {
        inputs: {
            title: document.getElementById('input__title_form'),
            description: document.getElementById('input__desc_form'),
            authorName: document.getElementById('input__author-name_form'),
            authorPhoto: document.getElementById('input__author-photo_inp'),
            date: document.getElementById('input__date_form'),
            heroImgBig: document.getElementById('input__hero-image_inp'),
            heroImgSmall: document.getElementById('input__hero-img-small_inp'),                    
            content: document.getElementById('input__post-content_form')
        },
        previews: {
            article: {
                title: document.getElementById('preview__article_title'),
                description: document.getElementById('preview__article_description'),
                image: document.getElementById('preview__article_img')                
            },
            card: {
                title: document.getElementById('preview__post-card_title'),
                description: document.getElementById('preview__post-card_description'),
                authorImg: document.getElementById('preview__post-card_author-img'),                        
                authorName: document.getElementById('preview__post-card_author-name'),                
                date: document.getElementById('preview__post-card_date'),
                image: document.getElementById('preview__post-card_img'),
            },
            inputs: {
                authorImageInput: document.getElementById('input__author-photo_img'),
                heroImgBigInput: document.getElementById('input__hero-image_img'),
                heroImgSmallInput: document.getElementById('input__hero-img-small_img'),                
            }
        },
        trashes: {
            authorTrash: document.getElementById('input__author-photo_trash'),
            bigImgTrash: document.getElementById('input__hero-image_trash'),
            smallImgTrash: document.getElementById('input__hero-image-small_trash'),
        }
    };

    const button = document.getElementById('new-post')
    button.addEventListener('submit', async e => {
        try {
            e.preventDefault();
            const data = {
                title: fields.inputs.title.value,
                desc: fields.inputs.description.value,
                authorName: fields.inputs.authorName.value,
                authorPhotoName: fields.inputs.authorPhoto.files[0].name,
                authorPhotoVal: await toBase64(fields.inputs.authorPhoto.files[0]),        
                date: fields.inputs.date.value,
                heroImgName: fields.inputs.heroImgBig.files[0].name,
                heroImgVal: await toBase64(fields.inputs.heroImgBig.files[0]),
                content: fields.inputs.content.value
            }
            console.log(data)
            console.log(await JSON.stringify(data));
            const postData = async (url = '', data = {}) => {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                console.log(response)
                return response;
            }
            const response = postData('/api/post', data)
            if (response.status === 201) {
                console.log("Post added")
            } else {
                console.log("Post not adeed")
            }
        } catch (e) {
            console.log('JSON Error');
            console.log(e);
        }
    })
    const preview = new Preview(fields);
    preview.setImagePreview();
    preview.setTextPreview();
    preview.setTrashes();


    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
        reader.onerror = reject;
    });

}

