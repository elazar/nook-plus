const m = require("mithril");
const Page = require("./Page");
const Plant = require("../models/Plant");

module.exports = Page({

    title: "Plants",

    load: Plant.quantity.load,

    results: Plant.all(),

    search: Plant.search,

    filters: [
        {
            name: "have",
            label: "Have",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "price",
            label: "Price",
            display: item => item.price,
            format: item => new Intl.NumberFormat().format(item.price),
        },
        {
            name: "source",
            label: "Source",
        },
    ],

    selects: [
        {
            name: "quantity",
            label: "Quantity",
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String),
            onchange: (item, event) => Plant.quantity.set(item.name, event.target.value),
            selected: item => Plant.quantity.getItem(item.name) || '',
        },
    ],

});
