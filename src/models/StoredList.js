const StoredList = key => {

    const stored = localStorage.getItem(key);
    let list = stored ? JSON.parse(stored) : [];

    return {

        contains: value => {
            return list.indexOf(value) !== -1;
        },

        set: (value, add) => {
            list = add ? list.concat([value]) : list.filter(existing => existing !== value);
            localStorage.setItem(key, JSON.stringify(list));
        }

    };

};

module.exports = StoredList;
