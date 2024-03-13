"use strict";



/* variabler */

let slideIndex = 1; /* till slideshow */

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
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7dd4cb536emshace755aa949c97bp16ae4ajsn31b792268097',
        'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
    }
};


/* eventhandlers */

searchBtnEl.addEventListener("click", fetchGame, false);


/* Hämta  API  */

async function fetchGame() {

    /* rensa gamal sökning */
    gameResultEl.innerHTML = '';
    gameReviewEl.innerHTML = '';

    /* variabler för OpenCritic API: Game Search */
    const url1 = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${searchValue.value}`;

    try {
        const response = await fetch(url1, options1);
        const result = await response.json();


        /* Ladda in namn och skapa en div för varje resultat */
        result.forEach(e => {
            const gameName = e.name;
            const gameId = e.id;

            const gameContainer = document.createElement("div");
            gameContainer.id = gameId;
            const gameNameEl = document.createElement("h1");
            gameNameEl.textContent = gameName;

            gameContainer.addEventListener("click", () => {
                showReview(gameId, gameName); //Event listener för att ta fram recensioner och bilder på spelet
            });
            gameContainer.appendChild(gameNameEl);
            gameResultEl.appendChild(gameContainer);
        });
    } catch (error) {
        console.error(error);
    }
};

// funktion för att visa spelet och recensionerna
async function showReview(gameId, gameName) {
    const urlReview = `https://opencritic-api.p.rapidapi.com/reviews/game/${gameId}?skip=3&sort=newest`;
    const urlSteamGameId = `https://steam-api7.p.rapidapi.com/search?query=${gameName}&limit=1`;

    /* rensa diven på recensioner */
    gameReviewEl.innerHTML = '';

    try {
        /* fetch recensioner från API 1 */
        const response = await fetch(urlReview, options1);
        const result = await response.json();

        /* mash up för att hämta gameId */
        const response1 = await fetch(urlSteamGameId, options2);
        const result1 = await response1.json();

        if (result1.results.length > 0) { //skapa screenshots ifall de hittas

            const urlScreenshots = `https://steam-api7.p.rapidapi.com/media/screenshots/${result1.results[0].appid}`;

            /* fetch screenshots från API2 */
            const response2 = await fetch(urlScreenshots, options2);
            const result2 = await response2.json();

            /* skapa diven för slideshow */

            const slideshowContainerEl = document.createElement('div');
            slideshowContainerEl.classList.add('slideshow-container');
            gameReviewEl.appendChild(slideshowContainerEl);

            /* skapa screenshots */
            for (let i = 0; i < result2.screenshots.length; i++) {
                /* skapa bilden */
                const screenshotEl = document.createElement('img');
                screenshotEl.src = result2.screenshots[i];
                screenshotEl.style.width = "100%";
                /* skapa sliden */
                const mySlidesEl = document.createElement('div');
                mySlidesEl.classList.add('mySlides');
                mySlidesEl.classList.add('fade');
                /* skapa index */
                const numberTextEl = document.createElement('div');
                numberTextEl.classList.add('numbertext');
                numberTextEl.innerHTML = `${i + 1}/ ${result2.screenshots.length}`;

                /* klistra ihop i DOM */
                mySlidesEl.appendChild(numberTextEl);
                mySlidesEl.appendChild(screenshotEl);
                slideshowContainerEl.appendChild(mySlidesEl);
                gameReviewEl.appendChild(slideshowContainerEl);
            }
            /* Next and previous buttons*/
            const prevBtnEl = document.createElement('a');
            prevBtnEl.classList.add('prev');
            prevBtnEl.innerHTML = `&#10094;`;
            slideshowContainerEl.appendChild(prevBtnEl);

            const nextBtnEl = document.createElement('a');
            nextBtnEl.classList.add('next');
            nextBtnEl.id = 'next';
            nextBtnEl.innerHTML = `&#10095;`;
            slideshowContainerEl.appendChild(nextBtnEl);

            /* skapa cirklarna för slideshowen i DOM */
            const dotTray = document.createElement('div');
            dotTray.style.textAlign = 'center';

            for (let i = 0; i < result2.screenshots.length; i++) {
                const dot = document.createElement("span");
                dot.classList.add('dot');
                dot.id = i + 1;
                dotTray.appendChild(dot);
            }
            gameReviewEl.appendChild(dotTray);
        }

        /* Ladda in 3 recensioner och skapa en div för varje resultat */
        for (let i = 0; i < 3; i++) {
            const reviewTitle = result[i].title;
            const reviewScore = result[i].score;
            const reviewOutlet = result[i].Outlet.name;
            const reviewSnippet = result[i].snippet;
            const reviewUrl = result[i].externalUrl;
            gameReviewEl.innerHTML += `<div class='review'><h1>${gameName}</h1><h2>${reviewTitle}</h2><p>${reviewSnippet}</p><h3>${reviewScore} / 100</h3><p>Published in: ${reviewOutlet}</p><a href=${reviewUrl}>Läs mer</a></div>`;
        }
        /* initierar slideshow */
        showSlides(slideIndex);

    } catch (error) {
        console.error(error);
    }
}


/* SLIDESHOW */
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

/* eventtrigger för att bläddra framåt bland bilderna */
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('next')) {
        plusSlides(1);
    }
})

/* eventtrigger för att bläddra bakåt bland bilderna */
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('prev')) {
        plusSlides(-1);
    }
})

/* eventtrigger för att få image control att fungera */

document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('dot')) {
        currentSlide(e.target.id);
    }
})