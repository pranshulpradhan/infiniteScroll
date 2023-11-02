const imageContainer = document.getElementById("image-container");

const apiKey = "Hc7l_ipG4lAl0B_ilkQxnNsvDCDANzLkSlHUY60h-bg";
const apiUrl = "https://api.unsplash.com/photos/random";
// https://api.unsplash.com/photos/random/?client_id=Hc7l_ipG4lAl0B_ilkQxnNsvDCDANzLkSlHUY60h-bg&count=10

let ready = false;
let loadedImages = 0;
let totalImages = 0;

const getPhotos = async () => {
    const response =await fetch(`${apiUrl}?client_id=${apiKey}&count=10`);
    console.log("response",response);
    const data = await response.json();
    console.log("data", data);
    return data;
}

function setAttribute(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

const counter = () => {
    loadedImages++;
    console.log("loadedImages",loadedImages);
    console.log("totalImages", totalImages);
    if(loadedImages === totalImages){
        ready = true;
        console.log("ready", ready);
        displayPhotos();
    }
};

const displayPhotos = async () => {

    const photos = await getPhotos();
    totalImages = photos.length;
    console.log("totalImages", totalImages);
    console.log("display photos", photos);
    loadedImages=0;
    photos.forEach(photo => {

        const anc = document.createElement('a');
        setAttribute(anc,{
            href: photo.links.html,
            target: "_blank",
        });

        const image = document.createElement('img');
        setAttribute(image, {
            class: 'imgs',
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        anc.appendChild(image);

        image.addEventListener("load", counter);

        imageContainer.appendChild(anc);
    });
};

window.addEventListener("scroll", () =>{
    console.log("window listner");
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight && ready){
        ready = false;
        console.log("window listner ready", ready);
        displayPhotos();
    }
});

document.addEventListener("DOMContentLoaded", displayPhotos);
