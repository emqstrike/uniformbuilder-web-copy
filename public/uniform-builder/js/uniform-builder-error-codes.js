$(document).ready(function() {

    ub.utilities['errorWithCode'] = function (errorCode, input) {

        var _errorCode = errorCode;

        if (typeof errorCode !== "undefined") {

            console.log(' ');
            console.error('Error Code: ' + _errorCode.errorCode);
            
            if (typeof _errorCode.captionForInput !== "undefined") { 
                console.error(_errorCode.captionForInput + ':'); 
                console.error(' ' + input); 
            }
            
            console.error('Message:'); 
            console.error(' ' + _errorCode.message);

            if (typeof _errorCode.example !== "undefined") { 
                console.error('Example:'); 
                console.error(' ' + _errorCode.example); 
            }
            
            console.error('Solution:', _errorCode.solutions);
            console.error(' ' + _errorCode.solutions);
            console.log(' ');

            // TODO: Error Code Notification

        }

    }

    ub.errorCodes = {

        items: [

            {
                errorCode: "maskLayerNotFound",
                message: "A Material Option is not found for a particular perspective",
                example: "Left Cowl Insert is not found on back perspective",
                solutions: "Upload the layer on the specified perspective, if its not visible, just a upload a blank layer.",
                captionForInput: "Material Option / Perspective",
            },
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

            return true;

        }
    }

    ub.errorLogs = {
        
        items: [], // Item = { msg: "Material Option do not match", input: 'right_armtrim' };

        push: function (item) {

            this.items.push(item);
            this.print(item)

        }, 

        print: function (item) {

            str = item.msg + ': ' + item.input;
            ub.utilities.info(str);

        }

    }

});