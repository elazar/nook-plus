const all = require("../data/recipes.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredListFactory = require("./StoredListFactory");
const need = StoredListFactory.create("recipes-need");

const unique = array => array.reduce((unique, element) => unique.indexOf(element) === -1 ? unique.concat([element]) : unique, []);

const categories = unique(all.map(item => item.category));
categories.sort();

const Recipes = {
    all: () => all,
    categories: () => categories,

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
            results = results.filter(item => item.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.category) {
            results = results.filter(item => item.category === params.category);
        }

        if (params.need !== null) {
            results = results.filter(item => need.contains(item.name) === params.need);
        }

        return results;
    }
};

module.exports = Recipes;
