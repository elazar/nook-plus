const m = require("mithril");
const Page = require("./Page");
const Artwork = require("../models/Artwork");

module.exports = Page({

    title: "Artwork",

    load: Artwork.donated.load,

    results: Artwork.all(),

    search: Artwork.search,

    filters: [
        {
            name: "donated",
            label: "Donated",
            options: [ "Yes", "No" ],
        },
        {
            name: "forgeable",
            label: "Forgeable",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "description",
            label: "Description",
        },
        {
            name: "forgeable",
            label: "Forgeable",
            format: item => item.forgeable ? "Yes" : "No",
        },
    ],

    checkboxes: [
        {
            name: "donated",
            label: "Donated",
            onclick: (item, event) => Artwork.donated.set(item.name, event.target.checked),
            checked: item => Artwork.donated.contains(item.name),
        },
    ],

});
