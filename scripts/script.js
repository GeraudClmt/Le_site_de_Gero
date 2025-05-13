//=============> Les variables <=============
const nbDeFeeds = 6;
//Recupère l'acces au body du html
let div = document.getElementById("listeFeeds");
let menuDeroulant = document.getElementById("menuDeroulant");
let menuIsHidden = true;

//localStorage.setItem("feeds", JSON.stringify([{ titre: "test1", type: "test", question: "test", reponse: "test", personal: true }, { titre: "test", type: "test", question: "test", reponse: "test", personal: true }]))
let storageFeeds = JSON.parse(localStorage.getItem("feeds"));


//Creation d'un objet qui contient une liste de post
const postBlague = {
    listeFeed: [],
    addpost(titre, type, question, reponse, personal) {
        this.listeFeed.push({ titre, type, question, reponse, personal })

    },
    supPost(title) {
        for (const i in this.listeFeed) {
            if (this.listeFeed[i].titre == title) {
                this.listeFeed.splice(i, 1);
            }
        }
    },
    affichageDesFeeds() {
        try {
            let feedsHtml = '';
            for (const elementTableau of this.listeFeed) {
                feedsHtml = retourneUnFeed(elementTableau, feedsHtml)
            }
            //Envoie du html dans la div feeds
            div.innerHTML = feedsHtml;
        }
        catch (error) {

        }
    },
}
//=============> Fin Variables <=============


if (!storageFeeds) {
    storageFeeds = [];
}
else {
    for (const element of storageFeeds) {
        postBlague.addpost(element.titre, element.type, element.question, element.reponse, element.personal)
    }
}



//Appel de la fonction pour remplir le nombre de blague passé en paramètre
remplirTableauPost(nbDeFeeds);




//=============> Les Fonctions <=============

//Fonction qui remplie le tableau avec en paramètre le nombre de blague
function remplirTableauPost(nbDeBlagues) {
    for (i = 0; i < nbDeBlagues; i++) {
        fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
            .then(function (resultat) {
                //Recupération de la requete, transformé en JSON
                return resultat.json();
            })
            .then(function (resultat) {
                postBlague.addpost(resultat.category, resultat.type, resultat.setup, resultat.delivery, false);
                postBlague.affichageDesFeeds();
            })
            .catch((error) => {
                console.log("ERREUR ", error);
            });

    }
}

//Fonction qui retourne une variable en html 
function retourneUnFeed(feedObjet, feedHtml) {
    let divPost = `
        ${feedHtml}
        <div class = "feed">
            <h2>${feedObjet.titre}</h2>
            <h3>${feedObjet.type}</h3>
            <p>${feedObjet.question}</p>
            <p>${feedObjet.reponse}</p>
        </div>
    `;
    if (feedObjet.personal) {
        divPost = `
        ${feedHtml}
        <div class = "feed" id=${feedObjet.titre} >
            <h2>${feedObjet.titre}</h2>
            <h3>${feedObjet.type}</h3>
            <p>${feedObjet.question}</p>
            <p>${feedObjet.reponse}</p>
            <button type="submit" onclick="supParent('${feedObjet.titre}')">Supprimer</button>
        </div>

    `;
    }

    return divPost;
}

function feedRefresh() {
    for (const index in postBlague.listeFeed) {
        if (postBlague.listeFeed[index].personal == false) {
            postBlague.listeFeed.splice(index, 1);
        }
    }
    remplirTableauPost(nbDeFeeds);
}

//Fonction qui géré la fonction caché du menu
function cacherMenu() {
    if (menuIsHidden) {
        menuDeroulant.innerHTML = `
                                    <a class="elementMenu" href="index.html">Feed</a>
                                    <a class="elementMenu" href="gallery.html">Gallery</a>
                                    <a class="elementMenu" href="jeux.html">Jeux</a>
                                `;
        menuIsHidden = false;
    } else {
        menuDeroulant.innerHTML = ``;
        menuIsHidden = true;
    }

}
//Fonction qui écoute si on click sur la page pour ferme le menu
const bouttonMenu = document.getElementById("btnMenu");
document.addEventListener("click", function (event) {
    if (!bouttonMenu.contains(event.target)) {
        menuDeroulant.innerHTML = ``;
        menuIsHidden = true;
    }
})

//Fonction qui recupere les élements du formulaire et les mets dans le tableau
function pullFormulaire() {
    const titre = document.getElementById("titre");
    const type = document.getElementById("type");
    const question = document.getElementById("question");
    const reponse = document.getElementById("reponse");

    if (titre.value != '' && type.value != '' && question.value != '' && reponse.value) {
        postBlague.addpost(titre.value, type.value, question.value, reponse.value, true);

        //Ajout au localStorage
        storageFeeds = JSON.parse(localStorage.getItem("feeds"));
        if (!storageFeeds) {
            storageFeeds = [];
        }
        const tableau = { titre: titre.value, type: type.value, question: question.value, reponse: reponse.value, personal: true }
        storageFeeds.push(tableau)
        localStorage.setItem("feeds", JSON.stringify(storageFeeds));


        //Reset les values des inputs
        titre.value = '';
        type.value = '';
        question.value = '';
        reponse.value = '';

        postBlague.affichageDesFeeds();


    }
}

function supParent(id) {
    const element = document.getElementById(id);
    

    //Supprime dans le storage
    storageFeeds = JSON.parse(localStorage.getItem("feeds"));
    console.log(storageFeeds);
    console.log(id);
    for (const element of Object.keys(storageFeeds)){
        if(storageFeeds[element].titre == id){
            console.log("trouvé", element)
        }
    }
    localStorage.setItem("feeds", JSON.stringify(storageFeeds));

    element.remove();
    postBlague.supPost(id);
    

}
//=============> Fin Fonctions <=============