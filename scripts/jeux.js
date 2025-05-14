
/*const data =
    {
        "facile" : [
        "😀","😄","👿","🤡","🤑"],
        "moyen" : ["😀","😄","👿","🤡","🤑","💂","👮‍♂️","🧟‍♂️","🦹‍♂️","🥷","🤴","🥦","🍔","🧊","🍖"],
        "difficile" : ["😀","😄","👿","🤡","🤑","💂","👮‍♂️","🧟‍♂️","🦹‍♂️","🥷","🤴","🥦","🍔","🧊","🍖","🧁","🏄‍♀️","🚗","⛪️","🌍","🐂","🐢","🦃","🐐","🐬"]
    }
*/

let difficulte = "moyen";
let data = [];
let click1 = null;
let click2 = null;

async function recuperationData(difficile) {

    try {
        const reponse = await fetch("https://mocki.io/v1/f96b4765-38eb-4821-9f0f-92bae8d99063").then((data) => data.json());

        switch (difficile) {
            case "facile":
                data = reponse.facile;
                break

            case "moyen":
                data = reponse.moyen;
                break

            case "difficile":
                data = reponse.difficile;
                break

            default:
                console.log("Erreur de difficultée");
        }
        data = [...data, ...data];
    }
    catch (error) {
        console.log("ERREUR : ", error);
    }

}


recuperationData(difficulte);

function afficheData() {
    const main = document.getElementById("containerEmoji");
    for (const element of data) {
        let emoji = document.createElement("a");

        emoji.className = "emoji";
        emoji.text = "G";
        emoji.id = element;
        emoji.style = " background-color: #000000;"

        main.appendChild(emoji);
    }

}

document.addEventListener("click", function (event) {

    if (event.target.className == "emoji") {
        if (click1 == null) {
            console.log("clcik1");
            click1 = event.target;
            click1.text = click1.id;
        }
        else if (click2 == null) {
            console.log("clcik2");
            click2 = event.target;
            click2.text = click2.id;

            if (click1.id != click2.id) {
                setTimeout(() => {
                    console.log("non");
                    click1.text = "G";
                    click2.text = "G";
                    click1 = null;
                    click2 = null;

                }, 1000);
            }
            else {
                console.log("Trouvé");
                click1 = null;
                click2 = null;
            }

        }
        else {
            console.log("click3");
            click1 = null;
            click2 = null;
        }
    }

})