"use strict";

/* variabler */

const searchBtnEl = document.getElementById("searchBtn");
const searchValue = document.getElementById("gameInput");


/* eventhandlers */

searchBtnEl.addEventListener("click", fetchGame, false);


/* Hämta  API  */

async function fetchGame() {

    /* variabler för OpenCritic API */
    const url1 = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${searchValue.value}`;
    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7dd4cb536emshace755aa949c97bp16ae4ajsn31b792268097',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url1, options1);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function clickEvent() {
    console.log(searchValue.value);
} 