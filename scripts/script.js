

//Creation d'un objet qui contient une liste de post
const postBlague = {
    listePost: [],

    //Fonction pour ajouter un post dans la liste listePost
    addpost(titre, type, question, reponse) {
        this.listePost.push({ titre, type, question, reponse })
    },
};


remplirTableauPost(5);
console.log(postBlague.listePost);



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
            })
    }
}
