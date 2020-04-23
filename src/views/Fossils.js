const m = require("mithril");
const Layout = require("./Layout");
const Fossils = require("../models/Fossils");

let results = Fossils.all();

const defaultQuery = {
    name: null,
    donated: null,
};

let query;

const reset = () => {
    query = Object.assign({}, defaultQuery);
};

const search = () => {
    results = Fossils.search(query);
};

const filterByForm = event => {
    const { target } = event;
    query[target.name] = target.type === "checkbox" ? target.checked : (target.value || null);
    search();
};

const clear = () => {
    document.getElementById("name").value = "";

    document.getElementById("donated").checked = false;

    reset();

    search();
};

const checkbox = (name, label, onclick, checked) => (
    <span className="m-2 whitespace-no-wrap">
        <input type="checkbox" id={ name } name={ name } onclick={ onclick } checked={ checked } />
        <label htmlFor={ name } className="ml-2">{ label }</label>
    </span>
);

const toggleDonated = name => event => {
    Fossils.donated(name, event.target.checked);
};

const isDonated = name => Fossils.donated(name);

reset();

const view = () => Layout.view(
    <div className="fossils text-center">
        <h1 className="font-bold text-2xl mb-4">Fossils</h1>
        <div className="flex flex-wrap justify-center self-stretch">
            <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filterByForm } />
            <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
            <div className="p-4">
                { checkbox("donated", "Donated", filterByForm) }
            </div>
        </div>
        <div className="flex flex-wrap justify-center">
        { results.map(fossil => ( 
            <div className="fossil rounded lg:w-1/3 flex border-2 shadow-md mb-4 p-2 mr-4">
                <a href={ fossil.link }><img loading="lazy" className="image" src={ `images/fossils/${fossil.name}.png` } alt={ fossil.name } /></a>
                <div className="text-left ml-4">
                    <h2 className="name font-bold text-lg mb-2">
                        <a href={ fossil.link }>{ fossil.name }</a>
                    </h2>
                    <div className="flex flex-wrap">
                        { fossil.category && <div className="w-full">
                            <span className="font-bold pr-2">Category</span>
                            { fossil.category }
                        </div> }
                        <div className="w-full pr-2 pt-2">
                            { checkbox(
                                `donated-${fossil.name}`,
                                "Donated",
                                toggleDonated(fossil.name),
                                isDonated(fossil.name)
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        )) }
        </div>
    </div>
);

module.exports = { view };
