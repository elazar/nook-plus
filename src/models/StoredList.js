const RemoteStore = require("./RemoteStore");
const Settings = require("./Settings");

const StoredList = key => {

    let list = [];

    const save = () => localStorage.setItem(key, JSON.stringify(list));

    return {

        load: () => {
            const id = Settings.get("user_id");
            const promise = id
                ? RemoteStore.getValues(id, key)
                    .then(values => {
                        list = values;
                        save();
                    })
                : Promise.resolve();

            return promise.then(() => {
                const stored = localStorage.getItem(key);
                list = stored ? JSON.parse(stored) : [];
            });
        },

        contains: value => {
            return list.indexOf(value) !== -1;
        },

        set: (value, add) => {
            list = add ? list.concat([value]) : list.filter(existing => existing !== value);
            save();

            const id = Settings.get("user_id");
            if (id) {
                const method = add ? "addValue" : "removeValue";
                RemoteStore[method](id, key, value);
            }
        },

        get: () => list.slice(0),

        key: () => key,

    };

};

module.exports = StoredList;
