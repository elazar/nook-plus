const all = require("../data/furniture.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredList = require("./StoredList");
const need = StoredList("furniture-need");

const Furniture = {
    all: () => all,

    need,

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

module.exports = Furniture;
