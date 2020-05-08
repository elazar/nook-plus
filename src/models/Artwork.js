const all = require("../data/artwork.json");
all.sort((a, b) => a.name > b.name ? 1 : -1);

const StoredList = require("./StoredList");
const donated = StoredList("artwork-donated");

const Artwork = {
    all: () => all,

    donated,

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(artwork => artwork.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.donated !== null) {
            results = results.filter(artwork => donated.contains(artwork.name) === params.donated);
        }

        if (params.forgeable !== null) {
            results = results.filter(artwork => artwork.forgeable === params.forgeable);
        }

        return results;
    }
};

module.exports = Artwork;
