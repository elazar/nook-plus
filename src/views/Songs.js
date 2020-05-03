const m = require("mithril");
const Page = require("./Page");
const Songs = require("../models/Songs");

module.exports = Page({

    title: "Songs",

    load: Songs.owned.load,

    columns: 4,

    results: Songs.all(),

    search: Songs.search,

    filters: [
        {
            name: "request",
            label: "Requested",
            options: [ "Yes", "No" ],
        },
        {
            name: "owned",
            label: "Owned",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "request",
            label: "Requested",
            format: item => item.request ? "Yes" : "No",
        },
    ],

    checkboxes: [
        {
            name: "owned",
            label: "Owned",
            onclick: (item, event) => Songs.owned.set(item.name, event.target.checked),
            checked: item => Songs.owned.contains(item.name),
        },
    ],

});
