import "core-js/stable";
import "regenerator-runtime/runtime";

const m = require("mithril");

import "./index.css";

m.route(document.body, "/villagers", {
    "/villagers": { onmatch: async () => {
        try {
            return await import(/* webpackChunkName: "villagers" */ "./views/Villagers");
        } catch (error) {
            console.log(error);
            Sentry.captureException(error);
            return <div>
                We are having a small problem. It is probably temporary.
                Care to { m(m.route.Link, { href: "/villagers" }, "try again") }?
            </div>;
        }
    } },
    "/critters": { onmatch: () => import(/* webpackChunkName: "critters" */ "./views/Critters") },
    "/songs": { onmatch: () => import(/* webpackChunkName: "songs" */ "./views/Songs") },
    "/fossils": { onmatch: () => import(/* webpackChunkName: "fossils" */ "./views/Fossils") },
    "/crafting": { onmatch: () => import(/* webpackChunkName: "crafting" */ "./views/Crafting") },
    "/recipes": { onmatch: () => import(/* webpackChunkName: "recipes" */ "./views/Recipes") },
    "/furniture": { onmatch: () => import(/* webpackChunkName: "furniture" */ "./views/Furniture") },
    "/clothing": { onmatch: () => import(/* webpackChunkName: "clothing" */ "./views/Clothing") },
    "/artwork": { onmatch: () => import(/* webpackChunkName: "artwork" */ "./views/Artwork") },
    "/plants": { onmatch: () => import(/* webpackChunkName: "plants" */ "./views/Plants") },
    "/settings": { onmatch: () => import(/* webpackChunkName: "settings" */ "./views/Settings") },
});
