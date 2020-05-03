const m = require("mithril");
const Page = require("./Page");
const Villagers = require("../models/Villagers");

module.exports = Page({

    title: "Villagers",

    results: Villagers.all(),

    search: Villagers.search,

    filters: [
        {
            name: "gender",
            label: "Gender",
            options: Villagers.genders(),
        },
        {
            name: "species",
            label: "Species",
            options: Villagers.species(),
        },
        {
            name: "personality",
            label: "Personality",
            options: Villagers.personalities(),
        },
        {
            name: "month",
            label: "Month",
            options: Villagers.months(),
        },
        {
            name: "resident",
            label: "Resident",
            options: [ "Yes", "No" ],
        },
        {
            name: "favorite",
            label: "Favorite",
            options: [ "Yes", "No" ],
        },
    ],

    fields: [
        {
            name: "gender",
            label: "Gender",
        },
        {
            name: "species",
            label: "Species",
        },
        {
            name: "personality",
            label: "Personality",
        },
        {
            name: "birthday",
            label: "Birthday",
        }
    ],

    checkboxes: [
        {
            name: "resident",
            label: "Resident",
            onclick: (item, event) => Villagers.residents.set(item.name, event.target.checked),
            checked: item => Villagers.residents.contains(item.name),
        },
        {
            name: "favorite",
            label: "Favorite",
            onclick: (item, event) => Villagers.favorites.set(item.name, event.target.checked),
            checked: item => Villagers.favorites.contains(item.name),
        },
    ],

});
