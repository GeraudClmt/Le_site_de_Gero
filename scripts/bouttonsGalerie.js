
const galerie = document.querySelectorAll(".imageGalerie");

function tailleMosaique(){
    galerie.forEach((img) => {img.style.width = "30%";});
}

function tailleColonne(){
    galerie.forEach((img) => {img.style.width = "100%";});
}