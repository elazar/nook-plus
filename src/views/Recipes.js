const m = require("mithril");
const Page = require("./Page");
const Recipes = require("../models/Recipes");

module.exports = Page({

    title: "Recipes",

    load: Recipes.need.load,

    results: Recipes.all(),

    search: Recipes.search,

    filters: [
        {
            name: "category",
            label: "Category",
            options: Recipes.categories(),
        },
        {
            name: "need",
            label: "Need",
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
            name: "category",
            label: "Category",
        },
        {
            name: "materials",
            label: "Materials",
        },
        {
            name: "source",
            label: "Source",
            display: item => item.source,
        },
    ],

    checkboxes: [
        {
            name: "need",
            label: "Need",
            onclick: (item, event) => Recipes.need.set(item.name, event.target.checked),
            checked: item => Recipes.need.contains(item.name),
        },
    ],

});
