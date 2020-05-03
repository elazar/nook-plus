const all = require("../data/songs.json");

const StoredListFactory = require("./StoredListFactory");
const owned = StoredListFactory.create("songs-owned");

const Songs = {
    all: () => all,

    owned,

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(song => song.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.request !== null) {
            results = results.filter(song => song.request === params.request);
        }

        if (params.owned !== null) {
            results = results.filter(
                song => owned.contains(song.name) === params.owned
            );
        }

        return results;
    }
};

module.exports = Songs;
