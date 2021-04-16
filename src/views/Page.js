const m = require("mithril");
const Layout = require("./Layout");

function Page(config) {
    let { results } = config;

    config.image = config.image || (() => config.title.toLowerCase());
    config.columns = (config.columns + 1) || 3;

    const oninit = config.load().then(m.redraw);

    const defaultQuery = config.filters.reduce(
        (query, filter) => {
            query[filter.name] = null;
            return query;
        },
        { name: null }
    );

    const reset = () => {
        query = Object.assign({}, defaultQuery);
    };

    reset();

    const search = () => {
        results = config.search(query);
    };

    const filter = event => {
        const { target } = event;
        let value;
        switch (target.value) {
            case "Yes":
                value = true;
                break;
            case "No":
                value = false;
                break;
            default:
                value = target.value || null;
        }
        query[target.name] = value;
        search();
    };

    const clear = () => {
        const filters = config.filters
            .map(filter => filter.name)
            .concat(["name"]);

        filters.forEach(id => {
            document.getElementById(id).value = "";
        });

        reset();
        search();
    };

    const select = (name, label, values, onchange = filter, selected = null) => {
        const value = selected === null ? {} : { value: selected };
        return (
            <select id={ name } name={ name } onchange={ onchange } {...value} className="mr-4 ml-4 mt-2 mb-2 p-2 border">
                <option value="">{ label }</option>
                { values.map(value => (
                <option value={ value }>{ value }</option>
                )) }
            </select>
        );
    };

    const checkbox = (name, label, onclick, checked) => (
        <span className="m-2 whitespace-no-wrap">
            <input type="checkbox" id={ name } name={ name } onclick={ onclick } checked={ checked } />
            <label htmlFor={ name } className="ml-2">{ label }</label>
        </span>
    );

    const display = () => true;

    const view = () => Layout(
        <div className="text-center">
            <h1 className="font-bold text-2xl mb-4">{ config.title }</h1>
            <div className="flex flex-wrap justify-center self-stretch">
                <input type="text" placeholder="Name" id="name" name="name" className="border-2 shadow-md text-xl p-2 mr-4" onkeyup={ filter } />
                <button className="bg-blue-500 text-white p-2 rounded shadow mt-4 md:mt-0" onclick={ clear }>Clear</button>
            </div>
            <div className="flex flex-wrap items-center justify-center mt-4 mb-4">
                { config.filters.map(field => <div className="pr-2">{ select(field.name, field.label, field.options) }</div>) }
            </div>
            <div className="flex flex-wrap justify-center">
            { results.map(item => (
                <div className={ `rounded lg:w-1/${config.columns} flex border-2 shadow-md mb-4 p-2 mr-4` }>
                    <a href={ item.link }><img loading="lazy" className="image" src={ item.image ? item.image : `images/blank.png` } alt={ item.name } /></a>
                    <div className="text-left ml-4">
                        <h2 className="name font-bold text-lg mb-2">
                            <a href={ item.link }>{ item.name }</a>
                        </h2>
                        <div className="flex flex-wrap">
                            { config.fields.map(field => (
                            (field.display || display)(item) && <div className="w-full">
                                <span className="font-bold pr-2">{ field.label }</span>
                                { field.format ? field.format(item) : item[field.name] }
                            </div>
                            )) }
                            { (config.checkboxes || []).map(checkbox => (
                            <div className="pr-2 pt-2 w-1/3 whitespace-no-wrap">
                                <input type="checkbox" id={ `${checkbox.name}-${item.name}` } onclick={ event => checkbox.onclick(item, event) } checked={ checkbox.checked(item) } />
                                <label htmlFor={ `${checkbox.name}-${item.name}` } className="ml-2">{ checkbox.label }</label>
                            </div>
                            )) }
                            { (config.selects || []).map(s => (
                            <div className="pr-2 pt-2 w-1/3 whitespace-no-wrap">
                                { select(
                                    s.name,
                                    s.label,
                                    s.values,
                                    event => s.onchange(item, event),
                                    s.selected(item)
                                ) }
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            )) }
            </div>
        </div>
    );

    return { oninit, view };
}

module.exports = Page;
