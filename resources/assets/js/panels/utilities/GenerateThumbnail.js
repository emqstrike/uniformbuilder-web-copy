function GenerateThumbnail() {

}

GenerateThumbnail.events = {
    isInit: true,

    init: function() {
        var that = this;

        if (that.isInit) {
            $(".modifier_main_container").on("click", ".generate-thumbnail-container .perspective", that.onClickGenerateThumbnail);
            that.isInit = false;
        }
        ub.data.generateThumbnailShown = true;
        that.loadGenerateThumbnail();
    },

    loadGenerateThumbnail: function() {
        var template = document.getElementById("m-generate-thumbnail-controller").innerHTML;
        Mustache.render(template);

        $(".modifier_main_container").html("");
        $(".modifier_main_container").html(template);
    },

    onClickGenerateThumbnail: function() {
        var view = $(this).data("view");
        RichardsonSkin.funcs.generateThumbnail(view);
    }
}