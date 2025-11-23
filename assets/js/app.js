// const cl = console.log;

// const postForm = document.getElementById('postForm');
// const title = document.getElementById('title');
// const content = document.getElementById('content');
// const postId = document.getElementById('postId');
// const postContainer = document.getElementById('postContainer');
// const addBtn = document.getElementById('addBtn');
// const updateBtn = document.getElementById('updateBtn');

// let BASE_URL = "https://blog-80452-default-rtdb.firebaseio.com";
// let POST_URL = `${BASE_URL}/blog.json`;

// const convertArr = (obj) => {
//     let res = [];
//     for (const key in obj) {
//         res.push({ ...obj[key], id: key });
//     }
//     return res;
// }

// const createCards = arr => {
//     let result = arr.map(post => {
//         return `
//         <div class="col-md-3 mb-3">
//             <div class="card h-100" id="${post.id}">
//                 <div class="card-header">
//                     <h5 class="card-title">${post.title}</h5>
//                 </div>
//                 <div class="card-body">
//                     <p class="card-text">${post.body}</p>
//                 </div>
//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-sm btn-outline-primary" onClick="onEdit(this)">Edit</button>
//                     <button class="btn btn-sm btn-outline-danger" onClick="onRemove(this)">Delete</button>
//                 </div>
//             </div>
//         </div>`;
//     }).join('');
//     postContainer.innerHTML = result;
// };

// function fetchAllPost() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", POST_URL);
//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             let data = JSON.parse(xhr.response);
//             let result = convertArr(data).reverse(); // Latest first
//             createCards(result);
//         }
//     };
//     xhr.send();
// }

// function onSubmit(eve) {
//     eve.preventDefault();

//     let postObj = {
//         title: title.value,
//         body: content.value,
//         postId: postId.value
//     };

//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", POST_URL);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             fetchAllPost(); // Re-render UI
//             postForm.reset();
//         }
//     };
//     xhr.send(JSON.stringify(postObj));
// }

// const onRemove = (eve) => {
//     let REMOVE_ID = eve.closest(".card").id;
//     let REMOVE_URL = `${BASE_URL}/blog/${REMOVE_ID}.json`;
//     let xhr = new XMLHttpRequest();
//     xhr.open("DELETE", REMOVE_URL);
//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             fetchAllPost(); // Refresh UI after delete
//         }
//     }
//     xhr.send();
// }

// function onEdit(eve) {
//     let EDIT_ID = eve.closest('.card').id;
//     localStorage.setItem("EDIT_ID", EDIT_ID);
//     let EDIT_URL = `${BASE_URL}/blog/${EDIT_ID}.json`;

//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", EDIT_URL);
//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             let res = JSON.parse(xhr.response);
//             title.value = res.title;
//             content.value = res.body;
//             postId.value = res.postId || 1;

//             addBtn.classList.add("d-none");
//             updateBtn.classList.remove("d-none");

//             postForm.removeEventListener("submit", onSubmit);
//         }
//     }
//     xhr.send();
// }

// function onUpdate() {
//     let UPDATE_ID = localStorage.getItem("EDIT_ID");
//     let UPDATE_URL = `${BASE_URL}/blog/${UPDATE_ID}.json`;

//     let updateObj = {
//         title: title.value,
//         body: content.value,
//         postId: postId.value
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open("PATCH", UPDATE_URL);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             fetchAllPost(); // refresh updated post

//             postForm.reset();
//             addBtn.classList.remove('d-none');
//             updateBtn.classList.add('d-none');

//             localStorage.removeItem("EDIT_ID");
//             postForm.addEventListener('submit', onSubmit);
//         }
//     }
//     xhr.send(JSON.stringify(updateObj));
// }

// updateBtn.addEventListener("click", onUpdate);
// postForm.addEventListener('submit', onSubmit);
// fetchAllPost();


const cl = console.log;

const postForm = document.getElementById('postForm');
const title = document.getElementById('title');
const content = document.getElementById('content');
const postId = document.getElementById('postId');
const postContainer = document.getElementById('postContainer');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');

let BASE_URL = "https://blog-80452-default-rtdb.firebaseio.com";
let POST_URL = `${BASE_URL}/blog.json`;


const convertArr = (obj) =>{
    let res = [];
    for (const key in obj) {
       res.push({...obj[key] , id : key});
    }
    return res;
}

const createCards = arr => {
    let result = arr.map(post => {
        return `
        <div class="col-md-3 mb-3">
            <div class="card h-100" id="${post.id}">
                <div class="card-header">
                    <h5 class="card-title">${post.title}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">${post.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary" onClick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onClick="onRemove(this)">Delete</button>
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
            let data = JSON.parse(xhr.response);
            if(!data) {
                postContainer.innerHTML = "";
                return;
            }
            let result = convertArr(data).reverse();
            createCards(result);
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
            card.id = res.name;

            card.innerHTML = `
                <div class="card-header">
                    <h5 class="card-title">${postObj.title}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">${postObj.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary" onClick="onEdit(this)">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onClick="onRemove(this)">Delete</button>
                </div>
            `;

            colDiv.append(card);
            postContainer.prepend(colDiv);
            postForm.reset();
        }
    };

    xhr.send(JSON.stringify(postObj));
}

const onRemove = (eve) =>{
    let REMOVE_ID = eve.closest(".card").id;
    let REMOVE_URL = `${BASE_URL}/blog/${REMOVE_ID}.json`;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", REMOVE_URL);
    xhr.onload = function(){
        if (xhr.status >= 200 && xhr.status < 300) {
            eve.closest(".col-md-3").remove();
        }
    }
    xhr.send();
}

function onEdit(eve){
    let EDIT_ID = eve.closest('.card').id;
    localStorage.setItem("EDIT_ID", EDIT_ID);
    let EDIT_URL = `${BASE_URL}/blog/${EDIT_ID}.json`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", EDIT_URL);
    xhr.onload = function(){
        if (xhr.status >= 200 && xhr.status < 300) {
            let res = JSON.parse(xhr.response);
            title.value = res.title;
            content.value = res.body;
            postId.value = res.postId || 1;

            addBtn.classList.add("d-none");
            updateBtn.classList.remove("d-none");
        }
    }
    xhr.send();
}

function onUpdate() {
    let UPDATE_ID = localStorage.getItem("EDIT_ID");
    let UPDATE_URL = `${BASE_URL}/blog/${UPDATE_ID}.json`;

    let updateObj = {
        title: title.value,
        body: content.value,
        postId: postId.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", UPDATE_URL);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let card = document.getElementById(UPDATE_ID);
            card.querySelector('.card-title').innerHTML = updateObj.title;
            card.querySelector('.card-text').innerHTML = updateObj.body;

            postForm.reset();

            addBtn.classList.remove('d-none');
            updateBtn.classList.add('d-none');

            localStorage.removeItem("EDIT_ID");
        }
    }
    xhr.send(JSON.stringify(updateObj));
}

updateBtn.addEventListener("click", onUpdate);
postForm.addEventListener('submit', onSubmit);
fetchAllPost();
