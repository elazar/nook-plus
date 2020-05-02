const RemoteStore = require("./RemoteStore");
const StoredList = require("./StoredList");

const RemoteStoredList = (id, key) => {

    const list = StoredList(key);

    return {

        contains: list.contains,

        set: (value, add) => {
            list.set(value, add);
            const method = add ? "addValue" : "removeValue";
            RemoteStore[method](id, key, value);
        },

    };

};

module.exports = RemoteStoredList;
