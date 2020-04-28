const m = require("mithril");
const Layout = require("./Layout");
const Settings = require("../models/Settings");

let all = Settings.get();

const hemispheres = {
    "north": "North",
    "south": "South",
};

const update = event => {
    const { target } = event;
    all[target.name] = target.value;
    Settings.set(all);
};

const view = () => Layout(
    <div className="settings text-center">
        <h1 className="font-bold text-2xl mb-4">Settings</h1>
        <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
            <div className="pr-2">
                <label htmlFor="hemisphere" className="font-bold mr-2">Hemisphere</label>
                <select name="hemisphere" id="hemisphere" className="mr-4 ml-4 mt-2 mb-2 p-2 border" onchange={ update }>
                { Object.keys(hemispheres).map(value => (
                    <option value={ value } selected={ all["hemisphere"] === value }>{ hemispheres[value] }</option>
                )) }
                </select>
            </div>
        </div>
    </div>
);

module.exports = { view };
