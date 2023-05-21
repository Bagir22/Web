function previewText(text, article, postCard) {
  const previewArticle = document.getElementById(article);
  previewArticle.textContent = text.value;

  if (postCard) {
      const previewPostCard = document.getElementById(postCard);
      previewPostCard.textContent = text.value;
  }
}

function previewImg(fileElem, imgElem, previewElem, deleteElemId) {
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
      show(deleteElemId)
    }
  }
  
  const show = elemId => {
      const elem = document.getElementById(elemId);
      if(elem)
      {
        elem.style.display = 'block';
      }
  }
  
  const hide = elemId => {
    const elem = document.getElementById(elemId);
    if(elem)
    {
      elem.style.display = 'none';
    }
  }


function removeImg(trashElem, imgElemId, previewElem, defaultImgUrl) {
    hide(trashElem)
    const img = document.getElementById(imgElemId);
    img.src = defaultImgUrl;
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

window.onload = () => {
  const formFileFields = document.getElementsByClassName('form-file-field');
  for (let formFileField in formFileFields)
  {
    const imgInput = null;
    const trash = null;
    imgInput.addEventListener('change', event => {
        const fileInput = event.target;
        const fileImage = null;
        /** get file from input, decodee and init fileImageInput  */
        const preview = document.getElementById('preview__post-card_img');

    })
  }
}
