import tabJourEnOrdre from './Utilitaire/gestionTemps.js';

const keyAPI = '88b7accee21f70a6965faf992cd08f72';
let resultAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    }, () => {
        alert(`Vous avez refusé la géolocalisation l'application ne peut pas fonctionner, veuillez l'activer :)`);
    })
}

function AppelAPI(long,lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        resultAPI = data;

        temps.innerText = resultAPI.current.weather[0].description;

        temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`;

        localisation.innerText = resultAPI.timezone;

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = `00 h`;
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }         
        }
        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultAPI.hourly[j * 3].temp)}°`;
        }

        for(let k = 0; k < tabJourEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJourEnOrdre[k].slice(0,3);
        }

        for(let m = 0; m < 7; m++) {
            tempJoursDiv[m].innerText = `${Math.trunc(resultAPI.daily[m+1].temp.day)}°`;
        }

        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `./ressources/jour/${resultAPI.current.weather[0].icon}.svg`
        } else {
            imgIcone.src = `./ressources/nuit/${resultAPI.current.weather[0].icon}.svg`
        }

        chargementContainer.classList.add('disparition');
    })
}