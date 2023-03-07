async function getData(data)
{
    const apiUrl = 'http://localhost:5678/api/works';
    const response = await fetch(apiUrl);
    data = await response.json();
    console.log(data);
    for (let r of data) {
        let figure = document.createElement("figure");
        figure.id = r.categoryId;
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

let data;

getData(data);

let filter = document.getElementsByClassName("li_fil");
for (var i = 0; i < filter.length; i++) {
    filter[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
