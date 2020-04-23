const all = require("../data/fossils.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const DONATED_KEY = "fossils-donated";

const storedDonated = localStorage.getItem(DONATED_KEY);
let donated = storedDonated ? JSON.parse(storedDonated) : [];

const Fossils = {
    all: () => all,

    donated: (name, flag) => {
        if (flag === undefined) {
            return donated.indexOf(name) !== -1;
        }

        donated = flag ? donated.concat([name]) : donated.filter(song => song !== name);
        localStorage.setItem(DONATED_KEY, JSON.stringify(donated));
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(fossil => fossil.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.donated !== null) {
            results = results.filter(fossil => (donated.indexOf(fossil.name) !== -1) === params.donated);
        }

        return results;
    }
};

module.exports = Fossils;
