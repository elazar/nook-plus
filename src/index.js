const m = require("mithril");

import "./index.css";

m.route(document.body, "/villagers", {
    "/villagers": { onmatch: () => import(/* webpackChunkName: "villagers" */ "./views/Villagers") },
    "/critters": { onmatch: () => import(/* webpackChunkName: "critters" */ "./views/Critters") },
    "/songs": { onmatch: () => import(/* webpackChunkName: "songs" */ "./views/Songs") },
    "/fossils": { onmatch: () => import(/* webpackChunkName: "fossils" */ "./views/Fossils") },
    "/crafting": { onmatch: () => import(/* webpackChunkName: "crafting" */ "./views/Crafting") },
    "/recipes": { onmatch: () => import(/* webpackChunkName: "recipes" */ "./views/Recipes") },
    "/furniture": { onmatch: () => import(/* webpackChunkName: "furniture" */ "./views/Furniture") },
    "/clothing": { onmatch: () => import(/* webpackChunkName: "clothing" */ "./views/Clothing") },
    "/artwork": { onmatch: () => import(/* webpackChunkName: "artwork" */ "./views/Artwork") },
    "/settings": { onmatch: () => import(/* webpackChunkName: "settings" */ "./views/Settings") },
});
