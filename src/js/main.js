"use strict";




/* Hämta  API */
const url = 'https://opencritic-api.p.rapidapi.com/game/search?criteria=helldivers';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7dd4cb536emshace755aa949c97bp16ae4ajsn31b792268097',
		'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
	}
};


async function fetchSteam() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

/* window.onload = fetchSteam(); */