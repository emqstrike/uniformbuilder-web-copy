$( document ).ready(function() {

    window.util = {

        jsonParseWithSlice: function (jsonString) {

            return JSON.parse(jsonString.slice(1,-1));

        },

        isNullOrUndefined: function (val) {

            return typeof(val) === "undefined" || val === null 

        },

        getExtension: function (filename) {
            
            var _extension = filename.split('.').pop();
            return _extension.toLowerCase();

        },

        isImage: function (filename) {

            if (filename === null) { return false; }

            var _ext = this.getExtension(filename);
            var _validExtensions = ['gif', 'jpg', 'png', 'jpeg', 'bmp'];
            var _result = false;

            if (_.contains(_validExtensions, _ext)) { _result = true; }

            return _result;

        },

        decimalToHex: function(d, padding) {
            var hex = Number(d).toString(16);
            padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

            while (hex.length < padding) {
                hex = "0" + hex;
            }

            return hex;
        },

        padHex: function(hex, padding) {
            padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

            while (hex.length < padding) {
                hex = "0" + hex;
            }

            return hex;
        },

        log: function (type, message, object) {
            
            ub.errors.push({
                
                type: type,
                message: message,
                data: object,

            });
        },

        error: function (error){

            console.error(error);

        },

        collectionToArray: function(collection){

            var tempArray = [];

            _.each(collection, function(element){
                tempArray.push(element)
            });

            return tempArray;

        },
        
        toTitleCase: function(str){
            
            var s = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

            s = ub.data.specialCodes.getCode(s);

            return s;

        },
        truncate: function (str) {

            return str.replace(/^(.{9}).+/, "$1…");

        },
        dateFormat: function(created_at){
            var text = created_at;
            var serverDate = moment.utc(text).local().format('LLL'); 
            return serverDate;
        },

        dataSelector: function(preamble, obj){

            /// helper to compose selector when using multiple data-attributes, will print an error log
            /// if an invalid selector is detected

            var selector = preamble;

            _.each(obj, function(value, key){
                var el = "[data-" + key + "='" + value + "']";
                selector += el;
           })

            if($(selector).length > 0) {
                return $(selector);
            }
            else {
                console.error('Invalid Selector: ' + selector);
            }

        }

    };
    
    /// Call:   "arm trim".toTitleCase();
    /// Output: "Arm Trim"

    String.prototype.toTitleCase = function () {
 
        var fullStringValue = this.toString();
        var returnValue     = window.util.toTitleCase(fullStringValue.split('_').join(' '));
        
        return returnValue;

    };

    /// Call:   "Arm Trim".toCodeCase();
    /// Output: "arm_trim"

    String.prototype.toCodeCase = function () {

        var fullStringValue = this.toString();
        var returnValue     = fullStringValue.split(' ').join('_').toLowerCase();

        return returnValue;

    };

    String.prototype.toHyphenCase = function () {

        var fullStringValue = this.toString();
        var returnValue     = fullStringValue.replace(/[\*\^\'\!\(\)]/g, '').split(' ').join('-').toLowerCase();

        return returnValue;

    };

    String.prototype.prepareModifierLabel = function () {

        var fullStringValue = this.toString();
        var _result = '';

        _result = fullStringValue.replace(' ', '');
        _result = fullStringValue.replace('left_','').replace('right_','');
        _result = _result.toTitleCase();

        return _result;

    };

    String.prototype.lpad = function(padString, length) {
        var str = this;
        while (str.length < length)
            str = padString + str;
        return str;
    }

    String.prototype.rpad = function(padString, length) {
        var str = this;
        while (str.length < length)
            str = str + padString;
        return str;
    }

}); 