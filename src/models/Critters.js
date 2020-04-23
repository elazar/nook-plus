const dayjs = require("dayjs");

const Settings = require("./Settings");

const bugs = require("../data/bugs.json").map(bug => {
    bug.type = "bug";
    return bug;
});

const fish = require("../data/fish.json").map(fish => {;
    fish.type = "fish";
    return fish;
});

const all = bugs.concat(fish);
all.sort((a, b) => a.name > b.name ? 1 : -1);

const CAUGHT_KEY = "critters-caught";
const DONATED_KEY = "critters-donated";

const storedCaught = localStorage.getItem(CAUGHT_KEY);
let caught = storedCaught ? JSON.parse(storedCaught) : [];

const storedDonated = localStorage.getItem(DONATED_KEY);
let donated = storedDonated ? JSON.parse(storedDonated) : [];

const pluralize = (quantity, unit) => `${quantity} ${unit}${quantity === 1 ? "" : "s"}`;

const Critters = {
    all: () => all,

    caught: (name, flag) => {
        if (flag === undefined) {
            return caught.indexOf(name) !== -1;
        }

        caught = flag ? caught.concat([name]) : caught.filter(critter => critter !== name);
        localStorage.setItem(CAUGHT_KEY, JSON.stringify(caught));
    },

    donated: (name, flag) => {
        if (flag === undefined) {
            return donated.indexOf(name) !== -1;
        }

        donated = flag ? donated.concat([name]) : donated.filter(critter => critter !== name);
        localStorage.setItem(DONATED_KEY, JSON.stringify(donated));
    },

    catchable: critter => {
        const hemisphere = Settings.get("hemisphere");
        const now = dayjs();
        const month = date => date.format("MMM").toLowerCase();

        const catchableThisMonth = critter.months[hemisphere][month(now)];
        if (!catchableThisMonth) {
            let nextCatchableMonth = now;
            do {
                nextCatchableMonth = nextCatchableMonth.add(1, "month");
            } while (!critter.months[hemisphere][month(nextCatchableMonth)]);
            const diff = nextCatchableMonth.diff(now, "month");
            return `No (in < ${pluralize(diff, "month")})`;
        }

        const allDay = critter.hours.filter(hour => !hour).length === 0;
        if (allDay) {
            return `Yes (all day)`;
        }

        const catchableThisHour = critter.hours[now.hour()];
        let nextTime = now.clone();
        while (critter.hours[nextTime.hour()] === catchableThisHour) {
            nextTime = nextTime.add(1, "hour");
        }
        const diff = nextTime.diff(now, "hour");
        const diffDisplayable = pluralize(diff, "hour");
        return catchableThisHour
            ? `Yes (for < ${diffDisplayable})`
            : `No (in < ${diffDisplayable})`;
    },

    search: params => {
        let results = all;

        if (params.name) {
            const name = params.name.toLowerCase();
            results = results.filter(critter => critter.name.toLowerCase().indexOf(name) !== -1);
        }

        if (params.caught) {
            results = results.filter(critter => caught.indexOf(critter.name) !== -1);
        }

        if (params.donated) {
            results = results.filter(critter => donated.indexOf(critter.name) !== -1);
        }

        if (params.catchable) {
            results = results.filter(critter => Critters.catchable(critter).indexOf("Yes") !== -1);
        }

        return results;
    },
};

module.exports = Critters;
