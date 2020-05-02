const all = require("../data/fossils.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredListFactory = require("./StoredListFactory");
const donated = StoredListFactory.create("fossils-donated");

const Fossils = {
    all: () => all,

    donated: (name, flag) => {
        if (flag === undefined) {
            return donated.contains(name);
        }
        donated.set(name, flag);
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(fossil => fossil.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.donated !== null) {
            results = results.filter(fossil => donated.contains(fossil.name) === params.donated);
        }

        return results;
    }
};

module.exports = Fossils;
