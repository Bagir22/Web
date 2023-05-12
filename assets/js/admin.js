function previewTitle(text) {
    const previewArticle = document.getElementById('preview__article_title');
    const previewPostCard = document.getElementById('preview__postCard_title');

    previewArticle.textContent = text.value;
    previewPostCard.textContent = text.value;
  }

function previewDesc(text) {
    const previewArticle = document.getElementById('preview__article_description');
    const previewPostCard = document.getElementById('preview__postCard_description');

    previewArticle.textContent = text.value;
    previewPostCard.textContent = text.value;
  }  

function previewAuthorName(text) {
    const authorName = document.getElementById('preview__postCard_authorName');

    authorName.textContent = text.value;
  }  

function previewDate(date) {
    const previewDate = document.getElementById('preview__postCard_date');

    previewDate.textContent = date.value;
  }   

function previewHeroImgBig() {
    const file = document.getElementById("input__heroImage_inp").files[0];
    const img = document.getElementById('input__heroImage_img');
    const preview = document.getElementById('preview__article_img');
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
      img.style.marginTop = "12px";
      img.style.width = "24px";
      img.style.height = "24px";
      const parentElem = document.getElementById('input__heroImgBig');;
      parentElem.appendChild(img);
    }
  }

function previewHeroImgSmall() {
    const file = document.getElementById("input__heroImageSmall_inp").files[0];
    const img = document.getElementById('input__heroImageSmall_img');
    const preview = document.getElementById('preview__postCard_img');
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
      img.style.marginTop = "-40px";
      img.style.marginBottom = "56px";
      img.style.width = "24px";
      img.style.height = "24px";
      const parentElem = document.getElementById('input__heroImgSmall');;
      parentElem.appendChild(img);
    }
  }
 
function previewAuthorPhoto() {
    const file = document.getElementById("input__authorPhoto_inp").files[0];
    const img = document.getElementById('input__authorPhoto_img');
    const preview = document.getElementById('preview__postCard_authorImg');
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
      img.style.marginLeft = "16px";
      const parentElem = document.getElementById('authorPhoto__upload');;
      parentElem.appendChild(img);
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


const formElem = document.getElementById("newPost");
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