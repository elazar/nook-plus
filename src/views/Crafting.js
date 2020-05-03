const m = require("mithril");
const Page = require("./Page");
const Crafting = require("../models/Crafting");

module.exports = Page({

    title: "Crafting",

    results: Crafting.all(),

    search: Crafting.search,

    filters: [
        {
            name: "always",
            label: "Availability",
            options: [ "Year-round", "Seasonal/event" ],
        },
        {
            name: "need",
            label: "Need",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "source",
            label: "Source",
        },
        {
            name: "price",
            label: "Price",
            display: item => item.price,
        },
        {
            name: "always",
            label: "Availability",
            format: item => item.always ? "Year-round" : "Seasonal/event",
        },
    ],

    checkboxes: [
        {
            name: "need",
            label: "Need",
            onclick: (item, event) => Crafting.need.set(item.name, event.target.checked),
            checked: item => Crafting.need.contains(item.name),
        },
    ],

});
