function CreateUploadInksoft() {

}

CreateUploadInksoft.events = {
    isInit: true,

    init: function() {
        var self = this;

        if (self.isInit) {
            $("#create-upload-inksoft-modal").on("click", ".modal-menu-mascot-header .mascot-menu-button", self.onChangeTab);
            self.isInit = false;
        }

        CreateUploadInksoft.funcs.loadCreateDesign();
        UIkit.modal("#create-upload-inksoft-modal").show();
    },

    onChangeTab: function() {
        var type = $(this).data("type");

        if (type === "upload") {
            CreateUploadInksoft.funcs.loadUploadDesign();
        } else if (type === "create") {
            CreateUploadInksoft.funcs.loadCreateDesign();
        }
    },
}

CreateUploadInksoft.funcs = {
    loadUploadDesign: function() {
        $("#embed-inksoft-upload").html("");
        var element = document.getElementById("embed-inksoft-upload");
        Inksoft.funcs.loadInksoftUploader(element);
    },

    loadCreateDesign: function() {
        $("#embed-inksoft-create").html("");
        var element = document.getElementById("embed-inksoft-create");
        Inksoft.funcs.loadInksoftDesigner(element);
    }
}
