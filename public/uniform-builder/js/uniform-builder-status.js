$(document).ready(function() {

    ub.status = {};
    ub.status.manipulatorDown = false;

    /// Used in temporarily cancelling rendering while sprites hasn't been constructed

    ub.status.render = {

        renderFrames: true,

        getRenderStatus: function () {

            return this.renderFrames;

        },

        setRenderStatus: function (status) {

            console.log('Setting Render status as: ' + status);

            this.renderFrames = status;
            return this.getRenderStatus();

        }

    }

});