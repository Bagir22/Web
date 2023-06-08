window.onload = () =>{
    eye = document.getElementById('form__password_eye');
    eye.addEventListener('click', e => {
        input = document.getElementById('form__password_inp');
        if (input.type == "password") {
            input.type = "text"
        } else {
            input.type = "password"
        }
    })

    const button = document.getElementById('logIn__form')
    button.addEventListener('submit', async e => { 
        e.preventDefault();
        email = document.getElementById('form__email_inp');
        pwd = document.getElementById('form__password_inp');
        if (email.value == ""  || pwd.value == "") {
            anim = document.getElementById('anim__check_error');
            if (email.value ==  "") {
                text = document.getElementById('input__email_error');
            } else {
                text = document.getElementById('input__pwd_error');
            }
            
            anim.style.display = 'block';
            text.style.display = 'block';
            setTimeout(function() {
                anim.style.display = 'none';
                text.style.display = 'none';
            }, 3000);
        } else if (email.value == "test@Email.com" && pwd.value == "testPwd") {
            anim = document.getElementById('anim__success_LogIn');
            anim.style.display = 'block';
            setTimeout(function() {
                anim.style.display = 'none';
            }, 3000);
        } else {
            anim = document.getElementById('anim__incorrect_error');
            anim.style.display = 'block';
            setTimeout(function() {
                anim.style.display = 'none';
            }, 3000);
        }
    })
}