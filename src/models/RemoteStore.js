const m = require("mithril");
const BASE_URL = "https://nook-plus.matthewturland.com/api";
const request = (url, options) => m.request(`${BASE_URL}${url}`, options);

const RemoteStore = {

    getUserId: () => {
        return request("/users", { method: "POST" });
    },

    getUser: id => {
        return request(`/users/${id}`);
    },

    getValues: (id, key) => {
        return request(`/users/${id}/${key}`);
    },

    addValues: (id, key, values) => {
        return request(`/users/${id}/${key}`, {
            method: "POST",
            body: JSON.stringify(values),
        });
    },

    addValue: (id, key, value) => {
        return request(`/users/${id}/${key}/${value}`, { method: "PUT" });
    },

    removeValue: (id, key, value) => {
        return request(`/users/${id}/${key}/${value}`, { method: "DELETE" });
    },

};

module.exports = RemoteStore;
