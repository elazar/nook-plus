const all = require("../data/plants.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredMap = require("./StoredMap");
const quantity = StoredMap("plants-quantity");

const Plant = {
    all: () => all,

    quantity,

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(plant => plant.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.have !== null) {
            results = results.filter(plant => (quantity.getItem(plant.name) !== null) == params.have);
        }

        return results;
    }
};

module.exports = Plant;
