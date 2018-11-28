function FabricPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {};

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    }
};

FabricPanel.events = {
    is_events_init: false,

    init: function() {
        if (!FabricPanel.events.is_events_init) {
            $('#primary_options_container').on('click', '.fabric-layer .image-wrapper img', FabricPanel.events.onFabricLayerChange);

            FabricPanel.events.is_events_init = true;
        }
    },

    onFabricLayerChange: function() {
        $('#primary_options_container .fabric-layer .image-wrapper img').removeClass('active');
        $(this).addClass('active');
    }
};