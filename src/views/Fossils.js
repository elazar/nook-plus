const m = require("mithril");
const Page = require("./Page");
const Fossils = require("../models/Fossils");

module.exports = Page({

    title: "Fossils",

    load: Fossils.donated.load,

    results: Fossils.all(),

    search: Fossils.search,

    filters: [
        {
            name: "donated",
            label: "Donated",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "category",
            label: "Category",
            display: item => item.category,
        },
    ],

    checkboxes: [
        {
            name: "donated",
            label: "Donated",
            onclick: (item, event) => Fossils.donated.set(item.name, event.target.checked),
            checked: item => Fossils.donated.contains(item.name),
        },
    ],

});
