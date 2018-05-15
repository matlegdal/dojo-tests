define([
    "dojo/dom"
], function (dom) {
    let oldText = {};
    return {
        setText: function (id, text) {
            let node = dom.byId(id);
            oldText[id] = node.innerHTML;
            node.innerHTML = text;
        },

        restoreText: function (id) {
            let node = dom.byId(id);
            node.innerHTML = oldText[id];
            delete oldText[id];
        }
    };
});