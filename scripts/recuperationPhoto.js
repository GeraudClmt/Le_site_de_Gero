
let divGalerie = document.getElementById('galerie');

for(i =1; i < 7; i++){
    let  img = document.createElement("img");
    img.src = `gallery/${i}.jpg`;
    img.alt = "image galerie";
    img.className = "imageGalerie";

    divGalerie.appendChild(img);
}