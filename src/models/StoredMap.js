const RemoteStore = require("./RemoteStore");
const Settings = require("./Settings");

const StoredMap = key => {

    let map = {};

    const save = () => localStorage.setItem(key, JSON.stringify(map));

    return {

        load: () => {
            const id = Settings.get("user_id");
            const promise = id
                ? RemoteStore.getValues(id, key)
                    .then(values => {
                        values.forEach(value => {
                            [mkey, mvalue] = value.split('|');
                            map[mkey] = mvalue;
                        });
                        save();
                    })
                : Promise.resolve();

            return promise.then(() => {
                const stored = localStorage.getItem(key);
                map = stored ? JSON.parse(stored) : {};
            });
        },

        set: (mkey, mvalue) => {
            const id = Settings.get("user_id");
            if (id) {
                if (map[mkey]) {
                    RemoteStore.removeValue(id, key, `${mkey}|${map[mkey]}`);
                }
                RemoteStore.addValue(id, key, `${mkey}|${mvalue}`);
            }

            map[mkey] = mvalue;

            save();
        },

        get: () => Object.assign({}, map),

        getItem: mkey => map[mkey] || null,

        key: () => key,

    };

};

module.exports = StoredMap;
