const all = require("../data/villagers.json");

const RESIDENTS_KEY = "villagers-residents";
const FAVORITES_KEY = "villagers-favorites";

const storedResidents = localStorage.getItem(RESIDENTS_KEY);
let residents = storedResidents ? JSON.parse(storedResidents) : [];

const storedFavorites = localStorage.getItem(FAVORITES_KEY);
let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

const unique = array => array.reduce((unique, element) => unique.indexOf(element) === -1 ? unique.concat([element]) : unique, []);

const genders = unique(all.map(villager => villager.gender));
genders.sort();

const species = unique(all.map(villager => villager.species));
species.sort();

const personalities = unique(all.map(villager => villager.personality));
personalities.sort();

const months = unique(all.map(villager => villager.birthday.split(" ")[0]));
months.sort((a, b) => new Date(`${a} 1, 2020`) > new Date(`${b} 1, 2020`));

const Villagers = {
    all: () => all,
    genders: () => genders,
    species: () => species,
    personalities: () => personalities,
    months: () => months,

    resident: (name, flag) => {
        if (flag === undefined) {
            return residents.indexOf(name) !== -1;
        }

        residents = flag ? residents.concat([name]) : residents.filter(resident => resident !== name);
        localStorage.setItem(RESIDENTS_KEY, JSON.stringify(residents));
    },

    favorite: (name, flag) => {
        if (flag === undefined) {
            return favorites.indexOf(name) !== -1;
        }

        favorites = flag ? favorites.concat([name]) : favorites.filter(resident => resident !== name);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(villager => villager.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.gender) {
            results = results.filter(villager => villager.gender === params.gender);
        }

        if (params.species) {
            results = results.filter(villager => villager.species === params.species);
        }

        if (params.personality) {
            results = results.filter(villager => villager.personality === params.personality);
        }

        if (params.month) {
            results = results.filter(villager => villager.birthday.indexOf(params.month) === 0);
        }

        if (params.resident) {
            results = results.filter(villager => residents.indexOf(villager.name) !== -1);
        }

        if (params.favorite) {
            results = results.filter(villager => favorites.indexOf(villager.name) !== -1);
        }

        return results;
    },
};

module.exports = Villagers;
