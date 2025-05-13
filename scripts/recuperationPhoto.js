
let nbImages = 7;
let divGalerie = document.getElementById('galerie');
let liste = JSON.parse(localStorage.getItem("listeUrl"));



for (i = 1; i < nbImages; i++) {
    let img = document.createElement("img");
    img.src = `gallery/${i}.jpg`;
    img.alt = "image galerie";
    img.className = "imageGalerie";

    divGalerie.appendChild(img);
}


try {
    for (let i = 0; i < Object.keys(liste).length; i++) {
        let img = document.createElement("img");
        img.src = liste[i];
        img.alt = "image galerie";
        img.className = "imageGalerie opacitySurvol";
        img.id = i;
        img.onclick = function () {
            supElement(i);
        }

        divGalerie.appendChild(img);

    }
} catch (error) {
}
function suppressionPhoto() {
    localStorage.clear();
    location.reload();
}

function supElement(id){
    const element = document.getElementById(id);
    liste = JSON.parse(localStorage.getItem("listeUrl"));

    liste.splice(id, id + 1);
    localStorage.setItem("listeUrl", JSON.stringify(liste));
    element.remove();  
}