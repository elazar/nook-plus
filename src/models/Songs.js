const all = require("../data/songs.json");

const OWNED_KEY = "songs-owned";

const storedOwned = localStorage.getItem(OWNED_KEY);
let ownedSongs = storedOwned ? JSON.parse(storedOwned) : [];

const Songs = {
    all: () => all,

    owned: (name, flag) => {
        if (flag === undefined) {
            return ownedSongs.indexOf(name) !== -1;
        }

        ownedSongs = flag ? ownedSongs.concat([name]) : ownedSongs.filter(song => song !== name);
        localStorage.setItem(OWNED_KEY, JSON.stringify(ownedSongs));
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(song => song.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.request) {
            results = results.filter(song => song.request);
        }

        if (params.owned) {
            results = results.filter(song => ownedSongs.indexOf(song.name) !== -1);
        }

        return results;
    }
};

module.exports = Songs;
