const StoredList = require("./StoredList");
const RemoteStoredList = require("./RemoteStoredList");
const Settings = require("./Settings");

const StoredListFactory = {
    create: key => {
        const id = Settings.get("user_id");
        return id ? RemoteStoredList(id, key) : StoredList(key);
    },
};

module.exports = StoredListFactory;
