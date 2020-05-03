const m = require("mithril");
const Page = require("./Page");
const Furniture = require("../models/Furniture");

const format = new Intl.NumberFormat().format;

module.exports = Page({

    title: "Furniture",

    load: Furniture.need.load,

    results: Furniture.all(),

    search: Furniture.search,

    filters: [
        {
            name: "need",
            label: "Need",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "buy_price",
            label: "Buy Price",
            display: item => item.buy_price,
            format: item => format(item.buy_price),
        },
        {
            name: "sell_price",
            label: "Sell Price",
            display: item => item.sell_price,
            format: item => format(item.sell_price),
        },
        {
            name: "source",
            label: "Source",
            display: item => item.source,
        },
        {
            name: "variations",
            label: "Variations",
            display: item => item.variations,
        },
        {
            name: "customize",
            label: "Customize",
            display: item => item.customize,
        },
    ],

    checkboxes: [
        {
            name: "need",
            label: "Need",
            onclick: (item, event) => Furniture.need.set(item.name, event.target.checked),
            checked: item => Furniture.need.contains(item.name),
        },
    ],

});
