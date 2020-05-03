const RemoteStore = require("./RemoteStore");
const Settings = require("./Settings");

const StoredList = key => {

    let list = [];

    const remote = cb => {
        const id = Settings.get("user_id");
        id && cb(id);
    };

    const set = (value, add) => {
        list = add ? list.concat([value]) : list.filter(existing => existing !== value);
        localStorage.setItem(key, JSON.stringify(list));
        return remote(id => {
            const method = add ? "addValue" : "removeValue";
            RemoteStore[method](id, key, value);
        });
    };

    return {

        load: () => {
            const stored = localStorage.getItem(key);
            list = stored ? JSON.parse(stored) : [];
            return remote(id => {
                return RemoteStore.getValues(id, key)
                    .then(values => values.forEach(
                        value => set(value, true)
                    ));
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
