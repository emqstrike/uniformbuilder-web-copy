$(document).ready(function() {

    /// Setters and Getters, so values on the configuration object are not modified directly, and can be logged appropriately
    /// Todo: Attach methods to the settings object on prepare?, if proceeding with this be sure to clean up before saving because it is a possible atck vector

    ub.funcs.getAppSize = function (applicationID) {

        var _applicationObj = ub.funcs.getSettingsObject(applicationID);
        var _result = undefined;

        if (typeof _applicationObj === "undefined") {
            ub.utilities.warn('Application #' + applicationID + ' is undefined');
            _result = undefined;
        } else {
            _result = _applicationObj.font_size;
        }

        return _result;

    }

    ub.funcs.setAppSize = function (applicationID, size) {

        var _applicationObj = ub.funcs.getSettingsObject(applicationID);
        var _result = false;

        if (typeof _applicationObj === "undefined") {
            ub.utilities.warn('Application #' + applicationID + ' is undefined');
            _result = false;
        } else {
            ub.utilities.actionLog('Application #' + applicationID + ' set size from ' + _applicationObj.size + ' to ' + size);
            _applicationObj.size = size;
            _applicationObj.font_size = size;
            _result = true;
        }

        return _result;

    }

});