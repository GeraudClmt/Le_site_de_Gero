
const header = document.querySelector("header");

let divHeader = `
        <div class="logo">
            <img class="logoFluid" src="assets/Logo.png" alt="logo du site">
        </div>
        <div>
            <h1>Le site du Gero</h1>
        </div>
        <div class="containerBtnMenu">
            <button id="btnMenu" class="logoFluid" type="button" onclick="cacherMenu()"><img class="logoFluid" src="assets/menu.png" alt="logo du menu"></button>
            <div id="menuDeroulant">

            </div>
        </div>
`;

header.innerHTML = divHeader