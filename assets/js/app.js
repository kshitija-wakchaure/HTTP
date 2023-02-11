let cl = console.log;

let baseUrl = `https://jsonplaceholder.typicode.com/posts`;

const postContainer = document.getElementById("postContainer");
const postForm = document.getElementById("postForm");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

const deleteCard = () => {
  let getId = localStorage.getItem("deleteId");
  cl(document.getElementById(getId));
  document.getElementById(getId).remove();
}

const updateCard = (body) => {
  let getId = localStorage.getItem("updatedId");
  let card = document.getElementById(getId);
  cl([...card.children]);
  let child = [...card.children];
  child[0].innerHTML = `<h3>${body.title}</h3>`;
  child[1].innerHTML = `<p>${body.body}</p>`      
}

const createCard = (obj) => {
  let cardDiv = document.creatElement("div");
  cardDiv.className = "card mb-4";
  cardDiv.id = obj.id;
  cardDiv.innerHTML = `
                    <div class="card-header">
                      <h3>${obj.title}</h3>
                    </div>
                    <div class="card-body">
                      <p>${obj.body}</p>
                    </div>
                    <div class="card-footer text-right">
                      <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                      <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                    </div>
                    `
  postContainer.prepend(cardDiv);
}

const templating = (arr) => {
  let result = ``;
  arr.forEach(post => {
    result += `
                    <div class="card mb-4" id="${post.id}">
                      <div class="card-header">
                          <h3>${post.title}</h3>
                      </div>
                      <div class="card-body">
                          <p>${post.body}</p>
                      </div>
                      <div class="card-footer text-right">
                          <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                          <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                      </div>
                    </div>
              `
  });
  postContainer.innerHTML = result;
}

const makeApiCall = (methodName, apiUrl, body) => { 
  let xhr = new XMLHttpRequest();
  xhr.open(methodName, apiUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.response);
      if (Array.isArray(data)) {
        templating(data);
      } else {
        if (methodName === "GET") {
          titleControl.value = data.title;
          contentControl.value = data.body;
        } else if (methodName === "PATCH") {
          updateCard(body);
        } else {
          cl(data);
          deleteCard();
        }
      }
    } else if (xhr.status === 201) {
      cl(xhr.response);
      let res = JSON.parse(xhr.response);
      body.id = res.id;
      createCard(body);
    }
  }
  xhr.send(JSON.stringify(body));
}

const onPostSubmit = (eve) => {
  eve.preventDefault();
  let obj = {
    title: titleControl.value,
    body: contentControl.value,
    userId: Math.ceil(Math.random() * 10)
  }
  postForm.reset();
  makeApiCall("POST", baseUrl, obj);
}
makeApiCall("GET", baseUrl, null);

const onEdit = (ele) => {
  let getEditId = ele.closest(".card").id;
  localStorage.setItem("updatedId", getEditId);
  let getEditUrl = `${baseUrl}/${getEditId}`;
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  makeApiCall("GET", getEditUrl, null);
}


const onPostUpdate = () => {
  cl(`Updated!!`)
  let getUpdateId = localStorage.getItem("updatedId");
  let updateUrl = `${baseUrl}/${getUpdateId}`;
  let updatedObj = {
    title: titleControl.value,
    body: contentControl.value
  }
  postForm.reset();
  makeApiCall("PATCH", updateUrl, updatedObj);
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
}

const onDelete = (ele) => {
  let getDeleteId = ele.closest(".card").id;
  localStorage.setItem("deleteId", getDeleteId);
  let deleteUrl = `${baseUrl}/${getDeleteId}`;
  makeApiCall("DELETE", deleteUrl);
}


postForm.addEventListener("submit", onPostSubmit);
updateBtn.addEventListener("click", onPostUpdate);