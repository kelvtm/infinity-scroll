"use strict";
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// helper function to set attribute
function settingAttribute(element, arrAtribute) {
  for (const x in arrAtribute) {
    element.setAttribute(x, arrAtribute[x]);
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    // create unplash link
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    settingAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // item.setAttribute("target", "_blank");
    //  create image
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    settingAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute("title", photo.alt_description);
    // appending element
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

//unsplash API
const count = 10;
const apiKey = "TwXFVphGeu43IxzjEy3WGDbe5WiPrIFEGUegP0jPx6Y";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// get photo from unsplah API
async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
    //catch erro here
  }
}
// on load
getPhoto();
// console.dir(imgContainer);
