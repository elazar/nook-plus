const all = require("../data/clothing.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredList = require("./StoredList");
const need = StoredList("clothing-need");

const Clothing = {
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
            results = results.filter(item => item.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.need !== null) {
            results = results.filter(item => need.contains(item.name) === params.need);
        }

        return results;
    }
};

module.exports = Clothing;
