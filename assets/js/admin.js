function previewText(text, article, postCard) {
  const previewArticle = document.getElementById(article);
  previewArticle.textContent = text.value;

  if (postCard) {
      const previewPostCard = document.getElementById(postCard);
      previewPostCard.textContent = text.value;
  }
}

function previewImg(fileElem, imgElem, previewElem) {
    const file = document.getElementById(fileElem).files[0];
    const img = document.getElementById(imgElem);
    const preview = document.getElementById(previewElem);
    const reader = new FileReader();
  
    reader.addEventListener(
      "load",
      () => {
          // convert image file to base64 string
          img.src = reader.result;
          preview.src = reader.result;
      },
      false
    );
  
    if (file) {
      reader.readAsDataURL(file);
      const img = document.createElement('img');
      img.src = 'static/img/icons/trash.png';
      if (fileElem == 'input__author-photo_inp') {
          const trash = document.getElementById('input__author-photo_trash');
          trash.style.display = "block";
      } else if (fileElem == 'input__hero-img-small_inp') {
          const trash = document.getElementById('input__hero-image-small_trash');
          trash.style.display = "block";
      } else {
          const trash = document.getElementById('input__hero-image_trash');
          trash.style.display = "block";
      }
    }
  }  

function removeImg(trashElem, imgElem, previewElem) {
    const trash = document.getElementById(trashElem);
    trash.style.display = "none";

    const img = document.getElementById(imgElem);
    if (trashElem == "input__author-photo_trash") {
        img.src = 'static/img/icons/camera.png';
    } else if (trashElem == "input__hero-image_trash") {
        img.src = 'static/img/icons/FrameBig.png';
    } else {
        img.src = 'static/img/icons/FrameSmall.png';        
    }

    const preview = document.getElementById(previewElem).removeAttribute('src');
}

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formDataObj = {};
    data.forEach((value, key) => {
        if (key == "authorPhoto" || key == "heroImgBig" || key == "heroImgSmall") {
            formDataObj[key] = b64EncodeUnicode(value['name']);
        } else {
            formDataObj[key] = value;
        }
    });
    if (formDataObj['title'] == "" || formDataObj['authorName'] == "" || formDataObj['content'] == "") {
        alert("Не все поля введены")
    } else {
        console.log(formDataObj);
        var json = JSON.stringify(formDataObj);
        console.log(json);
    }  
  }


const formElem = document.getElementById("new-post");
formElem.addEventListener('submit', handleSubmit);
  

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}