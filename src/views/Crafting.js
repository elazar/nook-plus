const m = require("mithril");
const Layout = require("./Layout");
const Crafting = require("../models/Crafting");

let results = Crafting.all();

const defaultQuery = {
    name: null,
    always: null,
    need: null,
};

let query;

const reset = () => {
    query = Object.assign({}, defaultQuery);
};

const search = () => {
    results = Crafting.search(query);
};

const clear = () => {
    [
        "name",
        "always",
        "need",
    ].forEach(id => {
        document.getElementById(id).value = "";
    });
    reset();
    search();
};

const filterByName = event => {
    const { target } = event;
    query[target.name] = target.value || null;
    search();
};

const filterByMenu = event => {
    const { target } = event;
    query[target.name] = {
        "null": null,
        "true": true,
        "false": false,
    }[target.value];
    search();
};

const toggleNeed = name => event => {
    Crafting.need(name, event.target.checked);
};

const isNeeded = name => Crafting.need(name);

reset();

const view = () => Layout.view(
    <div className="crafting text-center">
        <h1 className="font-bold text-2xl mb-4">Crafting</h1>
        <div className="flex flex-wrap justify-center self-stretch">
            <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filterByName } />
            <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
            <div className="p-4">
                <select id="always" name="always" onchange={ filterByMenu } className="mr-4 ml-4 mt-2 mb-2 p-2 border">
                    <option value="null">Availability</option>
                    <option value="true">Year-round</option>
                    <option value="false">Seasonal/event</option>
                </select>
            </div>
            <div className="p-4">
                <select id="need" name="need" onchange={ filterByMenu } className="mr-4 ml-4 mt-2 mb-2 p-2 border">
                    <option value="null">Need</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
        <div className="flex flex-wrap justify-center">
        { results.map(item => (
            <div className="item rounded lg:w-1/3 flex border-2 shadow-md mb-4 p-2 mr-4">
                <a href={ item.link }><img loading="lazy" className="image" src={ `images/crafting/${item.name}.png` } alt={ item.name } /></a>
                <div className="text-left ml-4">
                    <h2 className="name font-bold text-lg mb-2">
                        <a href={ item.link }>{ item.name }</a>
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <span className="font-bold pr-2">Source</span>
                            { item.source }
                        </div>
                        <div className="w-full">
                            <span className="font-bold pr-2">Price</span>
                            { item.price }
                        </div>
                        <div className="w-full mt-2">
                            <span className="m-2 whitespace-no-wrap">
                                <input type="checkbox" id={ `need-${item.name}` } name={ `need-${item.name}` } onclick={ toggleNeed(item.name) } checked={ isNeeded(item.name) } />
                                <label htmlFor={ `need-${item.name}` } className="ml-2">Need</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )) }
        </div>
    </div>
);

module.exports = { view };
