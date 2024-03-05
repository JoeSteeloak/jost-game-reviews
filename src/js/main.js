"use strict";

/* variabler */

const searchBtnEl = document.getElementById("searchBtn");
const searchValue = document.getElementById("gameInput");
const gameResultEl = document.getElementById("gameResult");
const gameReviewEl = document.getElementById("gameReview");
const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7dd4cb536emshace755aa949c97bp16ae4ajsn31b792268097',
        'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
};


/* eventhandlers */

searchBtnEl.addEventListener("click", fetchGame, false);


/* Hämta  API  */

async function fetchGame() {

    /* variabler för OpenCritic API: Game Search */
    const url1 = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${searchValue.value}`;

    try {
        const response = await fetch(url1, options1);
        const result = await response.json();

        console.log(result);

        /* Ladda in namn och skapa en div för varje resultat */
        result.forEach(e => {
            const gameName = e.name;
            const gameId = e.id;
            /*  gameResultEl.innerHTML += `<div id=${gameId}><h1>${gameName}</h1></div>`; */
            const gameContainer = document.createElement("div");
            gameContainer.id = gameId;
            const gameNameEl = document.createElement("h1");
            gameNameEl.textContent = gameName;

            gameContainer.addEventListener("click", () => {
                showReview(gameId); //Event listener för att ta fram recensioner och bild på spelet
            });
            gameContainer.appendChild(gameNameEl);
            gameResultEl.appendChild(gameContainer);
        });
    } catch (error) {
        console.error(error);
    }
};

// funktion för att visa spelet och recensionerna
async function showReview(gameId) {
    const urlReview = `https://opencritic-api.p.rapidapi.com/reviews/game/${gameId}?skip=3&sort=newest`;



    try {
        const response = await fetch(urlReview, options1);
        const result = await response.json();

        console.log(result);

        /* Ladda in 3 recensioner och skapa en div för varje resultat */
        for (let i = 0; i < 2; i++) {
            const reviewTitle = result[i].title;
            const reviewScore = result[i].score;
            const reviewOutlet = result[i].Outlet.name;
            const reviewSnippet = result[i].snippet;
            gameReviewEl.innerHTML += `<div><h1>${reviewTitle}</h1><p>${reviewSnippet}</p><h2>${reviewScore}</h2><p>${reviewOutlet}</p></div>`;
        }

    } catch (error) {
        console.error(error);
    }
}