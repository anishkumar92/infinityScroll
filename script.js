// unsplash Api
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 5;
const apiKey = config.API_KEY;
var apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//check if all image loaded
function imageloaded() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden=true;
    count = 30;
  }
}
// create methord for display each photos
function displayPhotos() {
  totalImages = photosArray.length;
  imageLoaded = 0;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageloaded());
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from Api
async function getPhotos() {
  try {
    let response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error
    alert(error);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
