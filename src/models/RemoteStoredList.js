const RemoteStore = require("./RemoteStore");
const StoredList = require("./StoredList");

const RemoteStoredList = (id, key) => {

    const list = StoredList(key);

    RemoteStore.getValues(id, key)
        .then(values => values.forEach(value => list.set(value, true)));

    return {

        contains: list.contains,
        get: list.get,
        key: list.key,

        set: (value, add) => {
            list.set(value, add);
            const method = add ? "addValue" : "removeValue";
            RemoteStore[method](id, key, value);
        },

    };

};

module.exports = RemoteStoredList;
