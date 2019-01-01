export default {
    store,
    remove,
    load
}

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function remove(key) {
    localStorage.removeItem(key);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}
