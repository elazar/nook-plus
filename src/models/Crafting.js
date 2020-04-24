const all = require("../data/crafting.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const NEED_KEY = "crafting-need";

const storedNeed = localStorage.getItem(NEED_KEY);
let need = storedNeed ? JSON.parse(storedNeed) : [];

const Crafting = {
    all: () => all,

    need: (name, flag) => {
        if (flag === undefined) {
            return need.indexOf(name) !== -1;
        }

        need = flag ? need.concat([name]) : need.filter(item => item !== name);
        localStorage.setItem(NEED_KEY, JSON.stringify(need));
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(critter => critter.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.always !== null) {
            results = results.filter(item => item.always === params.always);
        }

        if (params.need !== null) {
            results = results.filter(item => (need.indexOf(item.name) !== -1) === params.need);
        }

        return results;
    }
};

module.exports = Crafting;
