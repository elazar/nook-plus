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

const StoredListFactory = require("./StoredListFactory");
const caught = StoredListFactory.create("critters-caught");
const donated = StoredListFactory.create("critters-donated");

const pluralize = (quantity, unit) => `${quantity} ${unit}${quantity === 1 ? "" : "s"}`;

const Critters = {
    all: () => all,

    caught,

    donated,

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

        if (params.caught !== null) {
            results = results.filter(
                critter => caught.contains(critter.name) === params.caught
            );
        }

        if (params.donated !== null) {
            results = results.filter(
                critter => donated.contains(critter.name) === params.donated
            );
        }

        if (params.catchable !== null) {
            const catchable = params.catchable && "Yes" || "No";
            results = results.filter(critter => Critters.catchable(critter).indexOf(catchable) !== -1);
        }

        return results;
    },
};

module.exports = Critters;
