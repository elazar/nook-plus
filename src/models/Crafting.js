const all = require("../data/crafting.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredListFactory = require("./StoredListFactory");
const need = StoredListFactory.create("crafting-need");

const Crafting = {
    all: () => all,

    need: (name, flag) => {
        if (flag === undefined) {
            return need.contains(name);
        }
        need.set(name, flag);
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(critter => critter.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.always !== null) {
            const always = params.always === "Year-round";
            results = results.filter(item => item.always === always);
        }

        if (params.need !== null) {
            results = results.filter(item => (need.indexOf(item.name) !== -1) === params.need);
        }

        return results;
    }
};

module.exports = Crafting;
