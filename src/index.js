import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.scss";

var app = document.getElementById("image-grid");
const axios = require('axios').default;
var colStart = '<div class="col-md-3 col-sm-6 col-12">';
var divEnd = '</div>';
var imgPerColumn = [3, 2, 3, 2];

var searchBar = document.getElementById("searchBar");

document.getElementById("searchBtn").onclick = function () {
    document.querySelector(".search").classList.toggle("hide");

    if (document.querySelector(".search").classList.contains("hide")) {
        searchBar.value = "";
        searchBar.dispatchEvent(new Event('input', { bubbles: true }));
    }

    this.querySelector(".fas").classList.toggle("fa-times");
    this.querySelector(".fas").classList.toggle("fa-search");
};

function getImageComponent(src, userName, userLocation) {
    return '<div class="image"><img src="' + src + '" alt="image" /><div class="user-info"><h1>'
        + userName + '</h1><h4>' + userLocation + '</h4></div></div>';
}

function showImages(images) {
    var allComponent = "";
    var elementCount = 0;
    var colNo = 0;

    allComponent += colStart;

    for (var i = 0; i < images.length; i++) {
        if (imgPerColumn[colNo] > elementCount++) {
            allComponent += getImageComponent(images[i].urls.small, images[i].user.name, images[i].user.location);
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

function apiCall(url, query) {
    axios({
        method: 'GET',
        url: url,
        responseType: 'json'
    }).then(function (response) {
        showImages(query == '' ? response.data : response.data.results);
    }).catch(function (error) {
        showError(error);
    });
}

function listImages() {
    apiCall('https://api.unsplash.com/photos/?client_id=8HurEgRguetU5fAYBS1-_LSot8G_p3PcUCZjPVyuWws', '');
}

function searchImages(query) {
    apiCall('https://api.unsplash.com/search/photos/?client_id=8HurEgRguetU5fAYBS1-_LSot8G_p3PcUCZjPVyuWws&query=' + query, query);
}

searchBar.oninput = function () {
    var query = this.value;
    if (query == "") {
        listImages();
    } else {
        searchImages(query);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    listImages();
});
