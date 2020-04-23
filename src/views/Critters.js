const m = require("mithril");
const Layout = require("./Layout");
const Critters = require("../models/Critters");

let results = Critters.all();

const defaultQuery = {
    name: null,
    caught: null,
    donated: null,
    catchable: null,
};

let query;

const reset = () => {
    query = Object.assign({}, defaultQuery);
};

const search = () => {
    results = Critters.search(query);
};

const filterByForm = event => {
    const { target } = event;
    query[target.name] = target.type === "checkbox" ? target.checked : (target.value || null);
    search();
};

const clear = () => {
    document.getElementById("name").value = "";

    [
        "caught",
        "donated",
        "catchable",
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

const toggleCaught = name => event => {
    Critters.caught(name, event.target.checked);
};

const isCaught = name => Critters.caught(name);

const toggleDonated = name => event => {
    Critters.donated(name, event.target.checked);
};

const isDonated = name => Critters.donated(name);

const formatNumber = number => new Intl.NumberFormat().format(number);

reset();

const view = () => Layout.view(
    <div className="critters text-center">
        <h1 className="font-bold text-2xl mb-4">Critters</h1>
        <div className="flex flex-wrap justify-center self-stretch">
            <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filterByForm } />
            <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">

            <div className="p-4">
                { checkbox("caught", "Caught", filterByForm) }
            </div>
            <div className="p-4">
                { checkbox("donated", "Donated", filterByForm) }
            </div>
            <div className="p-4">
                { checkbox("catchable", "Catchable", filterByForm) }
            </div>
        </div> 
        <div className="flex flex-wrap justify-center">
        { results.map(critter => ( 
            <div className="critter rounded lg:w-1/3 flex border-2 shadow-md mb-4 p-2 mr-4">
                <a href={ critter.link }><img loading="lazy" className="image" src={ `images/${critter.type === "bug" ? "bugs" : "fish"}/${critter.name}.png` } alt={ critter.name } /></a>
                <div className="text-left ml-4">
                    <h2 className="name font-bold text-lg mb-2">
                        <a href={ critter.link }>{ critter.name }</a>
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <span className="font-bold pr-2">Price (-20% / +50%)</span>
                            { formatNumber(critter.price) } ({ formatNumber(critter.price * 0.8) } / { formatNumber(critter.price * 1.5) })
                        </div>
                        <div className="w-full">
                            <span className="font-bold pr-2">Location</span>
                            { critter.location }
                        </div>
                        { critter.type === "fish" && <div className="w-full">
                            <span className="font-bold pr-2">Shadow</span>
                            { critter.shadow }
                        </div> }
                        <div className="w-full">
                            <span className="font-bold pr-2">Catchable</span>
                            { Critters.catchable(critter) }
                        </div>
                        <div className="pr-2 pt-2 w-1/2">
                            { checkbox(
                                `caught-${critter.name}`,
                                "Caught",
                                toggleCaught(critter.name),
                                isCaught(critter.name)
                            ) }
                        </div>
                        <div className="pr-2 pt-2 w-1/2">
                            { checkbox(
                                `donated-${critter.name}`,
                                "Donated",
                                toggleDonated(critter.name),
                                isDonated(critter.name)
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
