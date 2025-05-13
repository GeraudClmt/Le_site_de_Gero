
const galerie = document.querySelectorAll(".imageGalerie");



function tailleMosaique() {
    galerie.forEach((img) => { img.style.width = "30%"; });
}

function tailleColonne() {
    galerie.forEach((img) => { img.style.width = "100%"; });
}

function fermerFormulaire() {
    const formulaire = document.getElementById("formulaireAjout");
    formulaire.remove();
}
function formulaireAjouterPhoto() {
    const divForm = document.getElementById("formulaire");

    divForm.innerHTML = `
            <form id="formulaireAjout">
                <fieldset>
                    <legend>Type :</legend>

                    <input type="radio" id="url" name="source" value="url" checked>
                    <label for="url">Url</label>

                    <input type="radio" id="local" name="source" value="local">
                    <label for="local">Local</label>
                </fieldset>
                <fieldset id="sources">
                    <legend>Source :</legend>
                    <input type="text" name="textUrl" id="textUrl" required>
                </fieldset>
                
                <button type="button" onclick="fermerFormulaire()">Annuler</button>
                <button type="submit" onclick="ajouterImageListe()">Ajouter</button>
            </form>
        `;


    //Ecoute des changements de status des radios boutons
    const radios = document.querySelectorAll('input[name="source"]');
    radios[0].addEventListener('change',
        function () {
            const sources = document.getElementById("sources");
            sources.innerHTML = `
                        <legend>Source :</legend>
                        <input type="text" name="textUrl" id="textUrl" required>
                `;
            console.log("valeur ", this.value);
        }
    )
    radios[1].addEventListener('change',
        function () {
            const sources = document.getElementById("sources");
            sources.innerHTML = `
                        <legend>Source :</legend>
                         <input type="file" name="fichierUrl" id="fichierUrl" accept="image/*" required>
                `;
            console.log("valeur ", this.value);

            const inputPhoto = document.getElementById("fichierUrl");
            inputPhoto.addEventListener("change", function (event) {
                if (event.target.files.length > 0) {
                    const src = URL.createObjectURL(event.target.files[0]);
                    let liste = JSON.parse(localStorage.getItem("listeUrl"));
                    if (!liste) {
                        liste = [];
                    }
                    liste.push(src);
                    localStorage.setItem("listeUrl", JSON.stringify(liste));
                }
            });
        }
    )
    //Fonction qui écoute si on click sur la page pour ferme le menu
    const btnAjouter = document.getElementById("btnAjouter");
    document.addEventListener("click", function (event) {
        if (!btnAjouter.contains(event.target) && !divForm.contains(event.target)) {
            fermerFormulaire()
        }
    })
}


function ajouterImageListe() {
    let liste = JSON.parse(localStorage.getItem("listeUrl"));
    let textUrl = document.getElementById("textUrl");
    //Si la liste est vide on la creer
    if (!liste) {
        liste = [];
    }
    liste.push(textUrl.value);
    localStorage.setItem("listeUrl", JSON.stringify(liste));
}


