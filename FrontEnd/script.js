async function getData(data)
{
    const apiUrl = 'http://localhost:5678/api/works';
    const response = await fetch(apiUrl);
    data = await response.json();
    console.log(data);
    for (let r of data) {
        let figure = document.createElement("figure");
        figure.id = r.categoryId;
        figure.setAttribute("name", r.id);
        figure.className = "work";
        let img = document.createElement('img');
        img.src = r.imageUrl;
        let figcaption = document.createElement('figcaption');
        figcaption.textContent = r.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        const currentDiv = document.querySelector(".gallery");
        currentDiv.appendChild(figure);
    }
    filterSelection("all");
}

function deleteData(id) {
    const login = 'http://localhost:5678/api/works/'+id;
    let currentElem = document.getElementsByName(id);
    let i = fetch(login, {
        method: "DELETE",
        headers: {
            Accept: "*/*",
            "Authorization": "Bearer "+sessionStorage.getItem('log'),
        }
    })
    .then((response) => {
        console.log(response)
        currentElem[0].remove()
        currentElem[0].remove()
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    }
    );
}

async function getDataMod(data)
{
    const apiUrl = 'http://localhost:5678/api/works';
    const response = await fetch(apiUrl);
    data = await response.json();
    console.log(data);
    for (let r of data) {
        let figure = document.createElement("figure");
        figure.id = r.categoryId;
        figure.setAttribute("name", r.id);
        figure.className = "work";
        let img = document.createElement('img');
        img.src = r.imageUrl;
        let i = document.createElement('i');
        i.className = "fa-solid fa-trash-can";
        i.onclick = function() {
            deleteData(r.id);
        };
        let figcaption = document.createElement('figcaption');
        figcaption.textContent = "éditer";
        figure.appendChild(i);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        const gallery_popup = document.querySelector(".gallery_popup");
        gallery_popup.appendChild(figure);
    }
    filterSelection("all");
}

function removeClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function addClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function filterSelection(param)
{
    let all = document.getElementsByClassName("work");
    if (param == "all") {
        for (let i = 0; i < all.length; i++)
            addClass(all[i], "show");
    } else {
        for (i = 0; i < all.length; i++) {
            removeClass(all[i], "show");
            if (all[i].id == param)
                addClass(all[i], "show");
        }
    }
}

function setFilters() {
    let filter = document.getElementsByClassName("li_fil");
    for (var i = 0; i < filter.length; i++) {
        filter[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            if (this.id) {
                filterSelection(this.id);
            } else {
                filterSelection('all');
            }
        });
    }
}

async function getFilter(data)
{
    const apiUrl = 'http://localhost:5678/api/categories';
    const response = await fetch(apiUrl);
    data = await response.json();
    console.log(data);
    for (let r of data) {
        let button = document.createElement("button");
        button.className = "li_fil";
        button.textContent = r.name;
        button.id = r.id;
        const currentDiv = document.querySelector(".filtres");
        currentDiv.appendChild(button);
    }
    setFilters();
}

async function getCategory(data)
{
    const apiUrl = 'http://localhost:5678/api/categories';
    const response = await fetch(apiUrl);
    data = await response.json();
    console.log(data);
    for (let r of data) {
        let option = document.createElement("option");
        option.className = "opt_cat";
        option.textContent = r.name;
        option.value = r.id;
        const currentDiv = document.querySelector(".selectCategory");
        currentDiv.appendChild(option);
    }
}

let data;
let databis;

var input = document.querySelector('.image_uploads');
const input_class = document.querySelector('.add_image');
getData(data);
getFilter(databis);

let edit = document.getElementsByClassName("edit");
let not_edit = document.getElementsByClassName("not_edit");
console.log(sessionStorage.getItem('log'));
if (sessionStorage.getItem('log')) {
    for (let i = 0; i < edit.length; i++)
            addClass(edit[i], "show_flex");
    for (let i = 0; i < not_edit.length; i++)
            addClass(not_edit[i], "not_show");
    getDataMod(data);
}

const logout = document.querySelector(".logout");
const modify = document.querySelector(".modify_bis")
const popup = document.querySelector(".dad_popup")
const cross = document.querySelector(".fa-xmark")
const arrow = document.querySelector(".fa-arrow-left")
const add = document.querySelector(".add")
const galerie = document.querySelector(".galerie")
const ajout = document.querySelector(".ajout")

var fileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png'
]

function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
        if(file.type == fileTypes[i])
            return true;
    }
    console.log("false")
    return false;
}

function validFileSize(number) {
    if(number < 1024) {
        return true;
    } else if(number >= 1024 && number <= 1048576) {
        return true;
    } else if(number > (1048576 * 4)) {
        return false;
    }
}

var curFiles = input.files;
const bef_add = document.querySelectorAll('.before_add');
var img_type;
if (input.addEventListener('change', (e) => {
    e.preventDefault();
    curFiles = input.files;
    if (curFiles.length != 0) {
        if (validFileType(curFiles[0]) == true && validFileSize(curFiles[0].size) == true) {
            var image = document.createElement('img');
            image.src = window.URL.createObjectURL(curFiles[0]);
            img_type = curFiles[0].type;
            input_class.appendChild(image);
            image.className = "new_img";
            for (let i = 0; i < bef_add.length; i++)
                addClass(bef_add[i], "not_show");
            const label = document.querySelector('.label');
            const input_image = document.getElementById('image_uploads');
            label.style.display = 'none';
            input_image.style.display = 'none';
            const validButton = document.querySelector(".valid");
            removeClass(validButton, "grey");
            addClass(validButton, "green");
        }
}}));

let tokenErrorMsg = document.querySelector(".token-error-msg");
let contentErrorMsg = document.querySelector(".content-error-msg");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.reload();
});

modify.addEventListener("click", (e) => {
    e.preventDefault();
    addClass(popup, "show_flex");
});

cross.addEventListener("click", (e) => {
    e.preventDefault();
    tokenErrorMsg.style.display = "none";
    contentErrorMsg.style.display = "none";
    removeClass(galerie, "not_show");
    removeClass(ajout, "show");
    removeClass(arrow, "show");
    removeClass(popup, "show_flex");
});

add.addEventListener("click", (e) => {
    e.preventDefault();
    addClass(galerie, "not_show");
    addClass(ajout, "show");
    addClass(arrow, "show");
    getCategory();
    if (input.length != 0) {
        input.value = "";
        curFiles = input.files;
        for (let i = 0; i < bef_add.length; i++)
            removeClass(bef_add[i], "not_show");
        const label = document.querySelector('.label');
        const img = document.querySelector('.new_img');
        const input_image = document.getElementById('image_uploads');
        label.style.display = 'block';
        input_image.style.display = 'block';
        if (img != null)
            img.style.display = 'none';
    }
});

arrow.addEventListener("click", (e) => {
    e.preventDefault();
    tokenErrorMsg.style.display = "none";
    contentErrorMsg.style.display = "none";
    removeClass(galerie, "not_show");
    removeClass(ajout, "show");
    removeClass(arrow, "show");
});

const validButton = document.querySelector(".valid");
let img = input.files[0];
let title = document.querySelector(".title").value;
let category = document.querySelector(".selectCategory").value;

validButton.addEventListener("click", (e) => {
    e.preventDefault();
    img = input.files[0];
    title = document.querySelector(".title").value;
    category = document.querySelector(".selectCategory").value;

    if (img != null) {
        let formData  = new FormData();
        formData.append("image", img);
        formData.append("title", title);
        formData.append("category", category);
        const login = 'http://localhost:5678/api/works';

        fetch(login, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Authorization": "Bearer "+sessionStorage.getItem('log'),
            },
            body: formData,
        })
        .then((response) => {
            console.log(response.status)
            if (response.status > 300) {
                if (response.status == 401)
                    tokenErrorMsg.style.display = "block";
                if (response.status == 400)
                    contentErrorMsg.style.display = "block";
                throw new Error("error "+response.status)
            }
            return response.json()
        })
        .then((data) => {
            console.log(data);
            let figure = document.createElement("figure");
            figure.id = data.categoryId;
            figure.name = data.id;
            figure.setAttribute("name", data.id);
            figure.className = "work show";
            let img = document.createElement('img');
            img.src = data.imageUrl;
            let figcaption = document.createElement('figcaption');
            figcaption.textContent = data.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            const currentDiv = document.querySelector(".gallery");
            currentDiv.appendChild(figure);
            figure = document.createElement("figure");
            figure.id = data.categoryId;
            figure.setAttribute("name", data.id);
            figure.className = "work show";
            img = document.createElement('img');
            img.src = data.imageUrl;
            let i = document.createElement('i');
            i.className = "fa-solid fa-trash-can";
            i.onclick = function() {
                deleteData(data.id);
            };
            figcaption = document.createElement('figcaption');
            figcaption.textContent = "éditer";
            figure.appendChild(i);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            const gallery_popup = document.querySelector(".gallery_popup");
            gallery_popup.appendChild(figure);
            document.querySelector(".title").value = "";
            document.querySelector(".selectCategory").value = "";
            input.value = "";
            img = "";
            removeClass(popup, "show_flex");
            addClass(validButton, "grey");
            removeClass(validButton, "green");
            removeClass(galerie, "not_show");
            removeClass(ajout, "show");
            removeClass(arrow, "show");
            removeClass(popup, "show_flex");
            tokenErrorMsg.style.display = "none";
            contentErrorMsg.style.display = "none";
        })
        .catch((err) => {
            console.log(err);
        });
    }
})
