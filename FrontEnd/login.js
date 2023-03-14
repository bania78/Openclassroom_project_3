const loginButton = document.querySelector(".submit");
const loginErrorMsg = document.getElementById("login-error-msg");

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
        console.log(data)
        if (data.error) {
            loginErrorMsg.opacity = 1;
        } else {
            window.open("index.html");
        }
    })
    .catch((err) => {
        console.log(err);
    }
    );
})