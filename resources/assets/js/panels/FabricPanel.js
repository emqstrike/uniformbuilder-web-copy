function FabricPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {};
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    }
};