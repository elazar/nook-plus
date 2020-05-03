const RemoteStore = require("./RemoteStore");
const Settings = require("./Settings");

const StoredList = key => {

    let list = [];

    const set = (value, add) => {
        list = add ? list.concat([value]) : list.filter(existing => existing !== value);
        localStorage.setItem(key, JSON.stringify(list));

        const id = Settings.get("user_id");
        if (id) {
            const method = add ? "addValue" : "removeValue";
            RemoteStore[method](id, key, value);
        }
    };

    return {

        load: () => {
            const id = Settings.get("user_id");
            const promise = id
                ? RemoteStore.getValues(id, key)
                    .then(values => values.forEach(
                        value => set(value, true)
                    ))
                : Promise.resolve();

            return promise.then(() => {
                const stored = localStorage.getItem(key);
                list = stored ? JSON.parse(stored) : [];
            });
        },

        contains: value => {
            return list.indexOf(value) !== -1;
        },

        set,

        get: () => list.slice(0),

        key: () => key,

    };

};

module.exports = StoredList;
