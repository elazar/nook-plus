const all = require("../data/villagers.json");

const StoredListFactory = require("./StoredListFactory");
const residents = StoredListFactory.create("villagers-residents");
const favorites = StoredListFactory.create("villagers-favorites");

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
            return residents.contains(name);
        }
        residents.set(name, flag);
    },

    favorite: (name, flag) => {
        if (flag === undefined) {
            return favorites.contains(name);
        }
        favorites.set(name, flag);
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

        if (params.resident !== null) {
            results = results.filter(
                villager => residents.contains(villager.name) === params.resident
            );
        }

        if (params.favorite !== null) {
            results = results.filter(
                villager => favorites.contains(villager.name) === params.favorite
            );
        }

        return results;
    },
};

module.exports = Villagers;
