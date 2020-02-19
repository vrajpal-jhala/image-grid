import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.scss";

var app = document.getElementById("image-grid");
const axios = require('axios').default;
var colStart = '<div class="col-md-3 col-sm-6 col-12">';
var divEnd = '</div>';
var imgPerColumn = [3, 2, 3, 2];

document.getElementById("searchBtn").onclick = function () {
    document.querySelector(".search").classList.toggle("hide");
    this.querySelector(".fas").classList.toggle("fa-times");
    this.querySelector(".fas").classList.toggle("fa-search");
};

function getImageComponent(src) {
    return '<img src="' + src + '" alt="image" />'
}

function showImages(images) {
    var allComponent = "";
    var elementCount = 0;
    var colNo = 0;
    var cnt = 0;

    allComponent += colStart;

    for (var i = 0; i < images.length; i++) {
        if (imgPerColumn[colNo] > elementCount++) {
            allComponent += getImageComponent(images[i].urls.small);
        } else {
            allComponent += divEnd + colStart;
            colNo++;
            elementCount = 0;
            i--;
        }
    }

    allComponent += divEnd;

    app.innerHTML = allComponent;
}

function showError(error) {
    app.classList.add("text-center");
    app.innerHTML = "<span class='h4'>" + error + "</span>";
}

function listImages() {
    axios({
        method: 'GET',
        url: 'https://api.unsplash.com/photos/?client_id=8HurEgRguetU5fAYBS1-_LSot8G_p3PcUCZjPVyuWws',
        responseType: 'json'
    }).then(function (response) {
        showImages(response.data);
    }).catch(function (error) {
        showError(error);
    });
}

document.getElementById("searchBar").oninput = function () {
    var query = this.value;
    if (query == "") {
        listImages();
    } else {
        axios({
            method: 'GET',
            url: 'https://api.unsplash.com/search/photos/?client_id=8HurEgRguetU5fAYBS1-_LSot8G_p3PcUCZjPVyuWws&query=' + query,
            responseType: 'json'
        }).then(function (response) {
            showImages(response.data.results);
        }).catch(function (error) {
            showError(error);
        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    listImages();
});
