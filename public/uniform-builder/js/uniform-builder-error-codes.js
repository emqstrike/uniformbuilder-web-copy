$(document).ready(function() {

    ub.utilities['errorWithCode'] = function (errorCode, input) {

        var _errorCode = errorCode;

        if (typeof errorCode !== "undefined") {

            console.log('');
            console.error('Error Code: ' + _errorCode.errorCode);
            console.error(_errorCode.captionForInput + ': ' + input);
            console.error(_errorCode.message);
            console.error('Example:', _errorCode.example);
            console.log('');

        }

    }

    ub.errorCodes = {

        items: [

            {
                errorCode: "namesDontMatch",
                message: "Please check the name of the material option for correct casing.",
                example: "Right Arm trim when in other perspective it's Right Arm Trim",
                solutions: "",
                captionForInput: "Material Option",
            }

        ],
        getCode: function (errorCode, input) {

            var _result = _.find(this.items, {errorCode: errorCode});

            if (typeof _result === "undefined") {

                ub.utilities.info('Invalid Error code. [' + errorCode + ']');

            }
            
            return _result;

        },
        prepareShortcuts: function () {

            ub.errorCode = {};

            _.each(this.items, function (item) {

                ub.errorCode[item.errorCode] = item;
                ub.utilities.info('Error Codes prepared.');

            });

            return true;

        }
    }

});