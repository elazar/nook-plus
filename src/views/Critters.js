const m = require("mithril");
const Page = require("./Page");
const Critters = require("../models/Critters");

const format = n => new Intl.NumberFormat().format(n);

module.exports = Page({

    title: "Critters",

    load: () => Promise.all([
        Critters.caught.load(),
        Critters.donated.load(),
    ]),

    results: Critters.all(),

    search: Critters.search,

    filters: [
        {
            name: "caught",
            label: "Caught",
            options: [ "Yes", "No" ],
        },
        {
            name: "donated",
            label: "Donated",
            options: [ "Yes", "No" ],
        },
        {
            name: "catchable",
            label: "Catchable",
            options: [ "Yes", "No" ],
        },
        {
            name: "type",
            label: "Type",
            options: [ "Bug", "Fish", "Sea" ],
        },
    ],

    fields: [
        {
            name: "price",
            label: "Price (-20% / +50%)",
            format: item => `${format(item.price)} (${format(item.price * 0.8)} / ${format(item.price * 1.5)})`,
        },
        {
            name: "location",
            label: "Location",
        },
        {
            name: "shadow",
            label: "Shadow",
            display: item => item.type === "fish",
        },
        {
            name: "catchable",
            label: "Catchable",
            format: Critters.catchable,
        },
    ],

    checkboxes: [
        {
            name: "caught",
            label: "Caught",
            onclick: (item, event) => Critters.caught.set(item.name, event.target.checked),
            checked: item => Critters.caught.contains(item.name),
        },
        {
            name: "donated",
            label: "Donated",
            onclick: (item, event) => {
                const { checked } = event.target;
                if (checked) {
                    const caught = document.getElementById(event.target.id.replace("donated", "caught"));
                    caught.checked || caught.click(event);
                }
                Critters.donated.set(item.name, checked);
            },
            checked: item => Critters.donated.contains(item.name),
        },
    ],

});
