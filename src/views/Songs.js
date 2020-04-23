const m = require("mithril");
const Layout = require("./Layout");
const Songs = require("../models/Songs");

let results = Songs.all();

const defaultQuery = {
    name: null,
    request: null,
    owned: null,
};

let query;

const reset = () => {
    query = Object.assign({}, defaultQuery);
};

const search = () => {
    results = Songs.search(query);
};

const filterByForm = event => {
    const { target } = event;
    query[target.name] = target.type === "checkbox" ? target.checked : (target.value || null);
    search();
};

const clear = () => {
    document.getElementById("name").value = "";

    [
        "request",
        "owned",
    ].forEach(id => {
        document.getElementById(id).checked = false;
    });

    reset();

    search();
};

const checkbox = (name, label, onclick, checked) => (
    <span className="m-2 whitespace-no-wrap">
        <input type="checkbox" id={ name } name={ name } onclick={ onclick } checked={ checked } />
        <label htmlFor={ name } className="ml-2">{ label }</label>
    </span>
);

const toggleOwned = name => event => {
    Songs.owned(name, event.target.checked);
};

const isOwned = name => Songs.owned(name);

reset();

const view = () => Layout.view(
    <div className="songs text-center">
        <h1 className="font-bold text-2xl mb-4">Songs</h1>
        <div className="flex flex-wrap justify-center self-stretch">
            <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filterByForm } />
            <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
            <div className="p-4">
                { checkbox("request", "Requested", filterByForm) }
            </div>
            <div className="p-4">
                { checkbox("owned", "Owned", filterByForm) }
            </div>
        </div>
        <div className="flex flex-wrap justify-center">
        { results.map(song => ( 
            <div className="song rounded lg:w-1/5 border-2 shadow-md mb-4 p-2 mr-4">
                <h2 className="name font-bold text-lg mb-2">
                    <a href={ song.link }>{ song.name }</a>
                </h2>
                <div className="w-full">
                    <span className="font-bold pr-2">Requested</span>
                    { song.request ? "Yes" : "No" }
                </div>
                <div className="w-full pr-2 pt-2">
                    { checkbox(
                        `owned-${song.name}`,
                        "Owned",
                        toggleOwned(song.name),
                        isOwned(song.name)
                    ) }
                </div>
            </div>
        )) }
        </div>
    </div>
);

module.exports = { view };
