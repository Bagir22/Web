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
          img.style.marginLeft = "16px";
          const parentElem = document.getElementById('author-photo__upload');
          parentElem.appendChild(img);
      } else if (fileElem == 'input__hero-img-small_inp') {
          img.style.marginTop = "-40px";
          img.style.marginBottom = "56px";
          img.style.width = "24px";
          img.style.height = "24px";
          const parentElem = document.getElementById('input__hero-img-small');
          parentElem.appendChild(img);
      } else {
          img.style.marginTop = "12px";
          img.style.width = "24px";
          img.style.height = "24px";
          const parentElem = document.getElementById('input__hero-img-big');
          parentElem.appendChild(img);
      }
    }
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