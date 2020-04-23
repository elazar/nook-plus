const SETTINGS_KEY = "settings";

const storedSettings = localStorage.getItem(SETTINGS_KEY);
let all = storedSettings ? JSON.parse(storedSettings) : {
    "hemisphere": "north",
};

const Settings = {
    get: name => name ? all[name] : all,

    set: pairs => {
        Object.keys(pairs).forEach(key => {
            all[key] = pairs[key];
        });
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(all));
    },
};

module.exports = Settings;
