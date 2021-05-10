const Artwork = require("./Artwork");
const Clothing = require("./Clothing");
const Crafting = require("./Crafting");
const Critters = require("./Critters");
const Fossils = require("./Fossils");
const Furniture = require("./Furniture");
const Plant = require("./Plant");
const Recipes = require("./Recipes");
const RemoteStore = require("./RemoteStore");
const Settings = require("./Settings");
const Songs = require("./Songs");
const Villagers = require("./Villagers");

const Synchronizer = {
    synchronize: () => {
        const id = Settings.get("user_id");
        const lists = [
            Artwork.donated,
            Clothing.need,
            Crafting.need,
            Critters.caught,
            Critters.donated,
            Critters.made,
            Fossils.donated,
            Furniture.need,
            Plant.quantity,
            Recipes.need,
            Songs.owned,
            Villagers.residents,
            Villagers.favorites,
            Villagers.photos,
        ];

        const promises = lists
            .filter(list => list.get().length > 0)
            .map(list => RemoteStore.addValues(id, list.key(), list.get()));

        return Promise.all(promises);
    },
};

module.exports = Synchronizer;
