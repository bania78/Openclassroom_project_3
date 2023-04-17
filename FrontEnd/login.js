const loginButton = document.querySelector(".submit");
let loginErrorMsg = document.querySelector(".login-error-msg");
let edit = document.getElementsByClassName("edit");

function addClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.querySelector(".log-mail").value;
    const password = document.querySelector(".log-pass").value;
    const login = 'http://localhost:5678/api/users/login';

    let i = fetch(login, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": username,
            "password": password
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.message == "user not found" || data.error) {
            loginErrorMsg.style.opacity = 1;
        } else {
            sessionStorage.setItem('log', data.token);
            console.log(sessionStorage.getItem('log'));
            window.open("index.html");
        }
    })
    .catch((err) => {
        console.log(err);
    }
    );
})