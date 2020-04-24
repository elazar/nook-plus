const m = require("mithril");

const pages = [
    { path: "/villagers", name: "Villagers" },
    { path: "/critters", name: "Critters" },
    { path: "/fossils", name: "Fossils" },
    { path: "/songs", name: "Songs" },
    { path: "/crafting", name: "Crafting" },
    { path: "/settings", name: "Settings" },
];

const view = content => (
    <div className="container mx-auto p-4">
        <nav>
            <ul className="flex flex-row flex-wrap justify-center mb-8">
                { pages.map(page => (
                    <li className="mr-4 mt-4">
                        <a className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" href={ `#!${page.path}` }>{ page.name }</a>
                    </li>
                )) }
            </ul>
        </nav>
        { content }
    </div>
);

module.exports = { view };
