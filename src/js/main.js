"use strict";


/* Hämta  API */
const url = 'https://boardgamegeek.com/xmlapi2/thing?id=363204';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7dd4cb536emshace755aa949c97bp16ae4ajsn31b792268097',
        'X-RapidAPI-Host': 'steamgames-special-offers.p.rapidapi.com'
    }
};
async function fetchSteamSales() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

/* window.onload = fetchSteamSales(); */