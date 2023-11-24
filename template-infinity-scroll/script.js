"use strict";
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//unsplash API
const count = 30;
const apiKey = "TwXFVphGeu43IxzjEy3WGDbe5WiPrIFEGUegP0jPx6Y";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all image were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

// helper function to set attribute
function settingAttribute(element, arrAtribute) {
  for (const x in arrAtribute) {
    element.setAttribute(x, arrAtribute[x]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images=", totalImages);
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

    // check to see if image is loaded and execute a function
    img.addEventListener("load", imageLoaded);

    // img.setAttribute("title", photo.alt_description);
    // appending element
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// get photo from unsplah API
async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
    //catch erro here
  }
}

// cheeck to see if scrolling near buttom,load more image
window.addEventListener("scroll", function (e) {
  if (
    this.window.innerHeight + this.window.scrollY >=
      this.document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    // console.log(this.window.innerHeight);
    // console.log(this.window.scrollY);
    // console.log(this.document.body.offsetHeight - 1000);
    getPhoto();
    console.log("scrolled");
  }
});

// on load
getPhoto();
// console.dir(imgContainer);
