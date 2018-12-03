/**
 * GradientPanel.js
 * - handle gradient behavior
 * @since November 29, 2018
 * @authors
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function GradientPanel() {

}

GradientPanel.init = function() {
    if (ub.current_material.material.gradient !== null) {
        GradientPanel.utilities.initGradientLogo(ub.current_material.material.gradient)
    }
}

GradientPanel.utilities = {
    initGradientLogo: function(gradient_data) {
        if (!util.isNullOrUndefined(gradient_data)) {
            var gradient = gradient_data.replace(new RegExp("\\\\", "g"), "");
            gradient = gradient.slice(1, -1);
            gradient = JSON.parse(gradient);

            ub.data.gradient = gradient;

            // _.each(ub.data.gradient, function(index, el) {
            //     ub.data.gradient[el].name = index.files[el].file;
            // });
        }
    },

    processGradientColor: function(gradients) {
        if (!util.isNullOrUndefined(gradients)) {
            _.each(gradients, function(gradient) {
                var _layerCount = 0;

                if (gradient.layer1) { _layerCount += 1 };
                if (gradient.layer2) { _layerCount += 1 };
                if (gradient.layer3) { _layerCount += 1 };
            });

            // var _hasSavedGradientData = (typeof ub.current_material.settings.gradients)

        } else {

            ub.utilities.info('This uniform has no Gradient.');

        }
    }
}