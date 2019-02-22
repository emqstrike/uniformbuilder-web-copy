function SummaryPreviewPanel() {};


SummaryPreviewPanel.events = {
    is_init_events_called: 0,

    init: function() {
        if (SummaryPreviewPanel.events.is_init_events_called === 0) {
            $("#right-pane-column").on('click', '.richardson-footer .uniform-summary-preview', function(event) {
                event.preventDefault();
                /* Act on the event */
                console.log("Open Modal")
                UIkit.modal("#richardson-summary-preview").show();
            });
            SummaryPreviewPanel.events.is_init_events_called = 1
        }
    }
}