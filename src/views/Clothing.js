const m = require("mithril");
const Page = require("./Page");
const Clothing = require("../models/Clothing");

const format = new Intl.NumberFormat().format;

module.exports = Page({

    title: "Clothing",

    results: Clothing.all(),

    search: Clothing.search,

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
            name: "variation",
            label: "Variations",
            display: item => item.variation,
        },
    ],

    checkboxes: [
        {
            name: "need",
            label: "Need",
            onclick: (item, event) => Clothing.need(item.name, event.target.checked),
            checked: item => Clothing.need(item.name),
        },
    ],

});
