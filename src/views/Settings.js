const m = require("mithril");
const Layout = require("./Layout");
const Settings = require("../models/Settings");
const RemoteStore = require("../models/RemoteStore");
const Synchronizer = require("../models/Synchronizer");

let all = Settings.get();

const hemispheres = {
    "north": "North",
    "south": "South",
};

const update = (name, value) => {
    all[name] = value;
    Settings.set(all);
};

const updateFromEvent = event => {
    const { target } = event;
    update(target.name, target.value);
};

const generateUserId = event => {
    event.target.style.display = "none";

    const userId = document.getElementById("user_id");
    userId.disabled = true;
    userId.placeholder = "Generating...";

    let id;

    RemoteStore.getUserId()
        .then(response => {
            id = response;
            update("user_id", id);
            userId.placeholder = "Synchronizing...";
            return Synchronizer.synchronize();
        })
        .then(() => {
            userId.value = id;
        })
        .catch(error => {
            console.error(error);
            event.target.style.display = "";
        })
        .finally(() => {
            userId.placeholder = "User ID";
            userId.disabled = false;
        });
};

const view = () => Layout(
    <div className="settings text-center">
        <h1 className="font-bold text-2xl mb-4">Settings</h1>
        <div className="flex flex-col flex-wrap items-center justify-center mt-4 mb-4">
            <div className="pr-2 w-full">
                <label htmlFor="hemisphere" className="font-bold mr-2">Hemisphere</label>
                <select name="hemisphere" id="hemisphere" className="mr-4 ml-4 mt-2 mb-2 p-2 border" onchange={ updateFromEvent }>
                { Object.keys(hemispheres).map(value => (
                    <option value={ value } selected={ all["hemisphere"] === value }>{ hemispheres[value] }</option>
                )) }
                </select>
            </div>
            <div className="pr-2 mt-4 w-full">
                <input type="text" id="user_id" name="user_id" value={ all["user_id"] } placeholder="User ID" className="p-2 border" onchange={ updateFromEvent } />
            </div>
            <div className="pr-2 mt-2 w-full">
                { !all["user_id"] && <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ generateUserId }>Generate</button> }
            </div>
        </div>
    </div>
);

module.exports = { view };
