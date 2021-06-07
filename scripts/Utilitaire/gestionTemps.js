const jourSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
console.log(ajd);
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
console.log(jourActuel);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJourEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));

export default tabJourEnOrdre;