const m = require("mithril");
const Layout = require("./Layout");
const Villagers = require("../models/Villagers");

let results = Villagers.all();

const defaultQuery = {
    name: null,
    gender: null,
    species: null,
    personality: null,
    month: null,
    resident: null,
    favorite: null,
};

let query;

const reset = () => {
    query = Object.assign({}, defaultQuery);
};

const search = () => {
    results = Villagers.search(query);
};

const filterByForm = event => {
    const { target } = event;
    query[target.name] = target.type === "checkbox" ? target.checked : (target.value || null);
    search();
};

const filterByClick = (name, value) => {
    return () => {
        document.getElementById(name).value = value;
        query[name] = value || null;
        search();
    };
};

const clear = () => {
    [
        "name",
        "gender",
        "species",
        "personality",
        "month",
    ].forEach(id => {
        document.getElementById(id).value = "";
    });

    [
        "resident",
        "favorite",
    ].forEach(id => {
        document.getElementById(id).checked = false;
    });

    reset();

    search();
};

const pill = (name, content) => (
    <button onclick={ filterByClick(name, content) } className={ `villager-${name} inline-block bg-gray-200 whitespace-no-wrap rounded-full px-3 py-1 m-2 font-semibold text-gray-700` }>{ content }</button>
);

const select = (name, label, values) => (
    <select id={ name } name={ name } onchange={ filterByForm } className="mr-4 ml-4 mt-2 mb-2 p-2 border">
        <option value="">{ label }</option>
        { values.map(value => (
        <option value={ value }>{ value }</option>
        )) }
    </select>
);

const checkbox = (name, label, onclick, checked) => (
    <span className="m-2 whitespace-no-wrap">
        <input type="checkbox" id={ name } name={ name } onclick={ onclick } checked={ checked } />
        <label htmlFor={ name } className="ml-2">{ label }</label>
    </span>
);

const toggleResident = name => event => {
    Villagers.resident(name, event.target.checked);
};

const isResident = name => Villagers.resident(name);

const toggleFavorite = name => event => {
    Villagers.favorite(name, event.target.checked);
};

const isFavorite = name => Villagers.favorite(name);

reset();

const view = () => Layout.view(
    <div className="villagers text-center">
        <h1 className="font-bold text-2xl mb-4">Villagers</h1>
        <div className="flex flex-wrap justify-center self-stretch">
            <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filterByForm } />
            <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
            <div className="pr-2">
                { select("gender", "Gender", Villagers.genders()) }
            </div>
            <div className="pr-2">
                { select("species", "Species", Villagers.species()) }
            </div>
            <div className="pr-2">
                { select("personality", "Personality", Villagers.personalities()) }
            </div>
            <div className="pr-2">
                { select("month", "Month", Villagers.months()) }
            </div>
            <div className="p-4">
                { checkbox("resident", "Resident", filterByForm) }
            </div>
            <div className="p-4">
                { checkbox("favorite", "Favorite", filterByForm) }
            </div>
        </div>
        <div className="flex flex-wrap justify-center">
        { results.map(villager => ( 
            <div className="villager rounded lg:w-1/3 flex border-2 shadow-md mb-4 p-2 mr-4">
                <a href={ villager.link }><img loading="lazy" className="image" src={ `images/villagers/${villager.name}.png` } alt={ villager.name } /></a>
                <div className="text-left ml-4">
                    <h2 className="name font-bold text-lg mb-2">
                        <a href={ villager.link }>{ villager.name }</a>
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="pr-2 w-1/2">
                            { pill("gender", villager.gender) }
                        </div>
                        <div className="pr-2 w-1/2">
                            { pill("personality", villager.personality) }
                        </div>
                        <div className="pr-2 w-1/2">
                            { pill("species", villager.species) }
                        </div>
                        <div className="pr-2 w-1/2">
                            { pill("birthday", villager.birthday) }
                        </div>
                        <div className="pr-2 pt-2 w-1/2">
                            { checkbox(
                                `resident-${villager.name}`,
                                "Resident",
                                toggleResident(villager.name),
                                isResident(villager.name)
                            ) }
                        </div>
                        <div className="pr-2 pt-2 w-1/2">
                            { checkbox(
                                `favorite-${villager.name}`,
                                "Favorite",
                                toggleFavorite(villager.name),
                                isFavorite(villager.name)
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
