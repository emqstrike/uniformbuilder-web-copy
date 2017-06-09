$(document).ready(function() {

    ub.utilities['errorWithCode'] = function (errorCode, input) {

        var _errorCode = errorCode;

        if (typeof errorCode !== "undefined") {

            console.log('');
            console.error('Error Code: ' + _errorCode.errorCode);

            if (typeof _errorCode.captionForInput !== "undefined") { console.error(_errorCode.captionForInput + ': ' + input); }
            
            console.error(_errorCode.message);

            if (typeof _errorCode.example !== "undefined") { console.error('Example:', _errorCode.example); }
            
            console.error('Solution: ', _errorCode.solutions);
            console.log('');

        }

    }

    ub.errorCodes = {

        items: [

            {
                errorCode: "namesDontMatch",
                message: "Names of Material Option don't match (invalid case)",
                example: "Right Arm trim when in other perspective it's Right Arm Trim",
                solutions: "Check the name of the material option for correct casing.",
                captionForInput: "Material Option",
            },
            {
                errorCode: "zeroOneInchInPX",
                message: "One Inch In PX field is zero.",
                example: undefined,
                solutions: "Add a value to one_inch_in_px",
                captionForInput: undefined,
            },

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

            });

            ub.utilities.info('Error Codes prepared.');

            return true;

        }
    }

});