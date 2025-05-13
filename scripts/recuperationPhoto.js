
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
        img.className = "imageGalerie";
        img.id = `${i}`;

        divGalerie.appendChild(img);

        const image = document.getElementById(i);
        const btn = document.createElement("button");
        btn.value = "test";
        btn.type = "button"
        image.appendChild(btn);
    }
} catch (error) {
}
function suppressionPhoto() {
    localStorage.clear();
    location.reload();
}