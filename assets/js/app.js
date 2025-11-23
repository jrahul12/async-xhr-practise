const cl = console.log;

const postForm = document.getElementById('postForm');
const title = document.getElementById('title');
const content = document.getElementById('content');
const postId = document.getElementById('postId');
const postContainer = document.getElementById('postContainer');

let BASE_URL = "https://jsonplaceholder.typicode.com";
let POST_URL = `${BASE_URL}/posts`;

const createCards = arr => {
    let result = arr.map(post => {
        return `
        <div class="col-md-3 mb-3">
            <div class="card h-100" id="${post.id}">
                <div class="card-header">
                    <h5>${post.title}</h5>
                </div>
                <div class="card-body">
                    <p>${post.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>`;
    }).join('');
    postContainer.innerHTML = result;
};

function fetchAllPost() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", POST_URL);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let data = JSON.parse(xhr.response).reverse();
            createCards(data);
        }
    };
    xhr.send();
}

function onSubmit(eve) {
    eve.preventDefault();

    let postObj = {
        title: title.value,
        body: content.value,
        postId: postId.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", POST_URL);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let res = JSON.parse(xhr.response);

            let colDiv = document.createElement('div');
            colDiv.className = "col-md-3 mb-3";

            let card = document.createElement('div');
            card.className = "card h-100";
            card.id = res.id;

            card.innerHTML = `
                <div class="card-header">
                    <h5>${postObj.title}</h5>
                </div>
                <div class="card-body">
                    <p>${postObj.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            `;

            colDiv.append(card);
            postContainer.prepend(colDiv);
            postForm.reset();
        }
    };

    xhr.send(JSON.stringify(postObj));
}

postForm.addEventListener('submit', onSubmit);
fetchAllPost();
