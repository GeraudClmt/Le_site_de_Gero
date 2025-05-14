
const listeCheminImagePub = ["pub/1.jpg","pub/2.jpg","pub/3.jpg","pub/4.jpg"];
const divCarrousel = document.getElementById("carrousel");
let compteur = listeCheminImagePub.length -1;

changementPub();

function changementPub(){
    if(compteur < 0){
        compteur = listeCheminImagePub.length -1 ;
    }
    let div = `
            <a class="pub">
                <img class="imagePub" src="${listeCheminImagePub[compteur]}">
            </a>
    `;

    divCarrousel.innerHTML = div;
    compteur--;
    setTimeout(changementPub, 4000);
}


