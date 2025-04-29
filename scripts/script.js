//=============> Les variables <=============
const nbDeFeeds = 5;
//Recupère l'acces au body du html
let div = document.getElementById("listeFeeds");

//Creation d'un objet qui contient une liste de post
const postBlague = {
    listeFeed: [],
    addpost(titre, type, question, reponse) {
        this.listeFeed.push({ titre, type, question, reponse })
    },
    affichageDesFeeds(){
        let feedsHtml = '';
        for (const elementTableau of this.listeFeed) {
            feedsHtml = retourneUnFeed(elementTableau, feedsHtml)
        }
        //Envoie du html dans la div feeds
        div.innerHTML = feedsHtml;
    },
};
//=============> Fin Variables <=============





//Appel de la fonction pour remplir le nombre de blague passé en paramètre
remplirTableauPost(nbDeFeeds);
console.log(postBlague.listeFeed);




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
                postBlague.addpost(resultat.category, resultat.type, resultat.setup, resultat.delivery);
                postBlague.affichageDesFeeds();
            })
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
    return divPost;
}

function feedRefresh(){
    postBlague.listeFeed = [];
    remplirTableauPost(nbDeFeeds);
}

//=============> Fin Fonctions <=============