let addToy = false;
const toyColectionPlace = document.querySelector("#toy-collection");
const inputForm = document.querySelector(".add-toy-form")
let counterId = 0;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // show toy using toyObject from the initial fexth promise
  function showToy(toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";

    const toyH2 = document.createElement("h2");
    toyH2.textContent = toy.name;

    const toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";

    const toyP = document.createElement("p");
    toyP.id = `like-${toy.id}`
    toyP.textContent = toy.likes;

    const toyBtn = document.createElement("button");
    toyBtn.textContent = "Like ❤️";
    toyBtn.className = "like-btn";
    toyBtn.id = toy.id;


    // event listenter on like btn
    toyBtn.addEventListener("click", e => {
      e.preventDefault();
      patchLikes(toy);
    });

    toyColectionPlace.appendChild(toyCard);
    toyCard.append(toyH2, toyImg, toyP, toyBtn);
  }// end function showToy

  // in initial fetch
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toysData => {
      toysData.forEach(toyData => {
        showToy(toyData);
        counterId++;
        console.log(counterId);
      })
    });
  // end fetch

  // event listener on add form
  inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    counterId++;

    const inputFieldName = document.querySelector(`.input-text[name = "name"]`);
    const inputFieldImg = document.querySelector(`.input-text[name = "image"]`);
    
    // configuring object for post and patch 
    const toyObj = {
      "id": 0,
      "name": "",
      "image": "",
      "likes": 0
    }
    // modifing fields of object
    toyObj.id = counterId;
    toyObj.name = inputFieldName.value;
    toyObj.image = inputFieldImg.value;
    // configure object for Post
    let confObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyObj),
    }

    // post
    fetch("http://localhost:3000/toys", confObj)
      .then(r => r.json())
      .then(obj => showToy(obj));
  })// end event listener inoput form

  function patchLikes(toyObj) {
    toyObj.likes++;
    console.log(toyObj.id);
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        "likes": toyObj.likes
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(patchedToy => {
        console.log(patchedToy);
        const pID = document.getElementById(`like-${patchedToy.id}`);
        pID.textContent = patchedToy.likes;
      })
      //end fetch
  }// end patchLikes
});

// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })


// [
// {
//   "id": 1,
//   "name": "Woody",
//   "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
//   "likes": 5
  