$( document ).ready(function() {

    window.util = {

        log: function (type, message, object) {
            
            ub.errors.push({
                type: type,
                message: message,
                data: object,
            });

            console.error('Type: ' + type);
            console.error('Error: ' + message);
            console.error('Object: ');
            console.error(object);

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
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

    String.prototype.prepareModifierLabel = function () {

        var fullStringValue = this.toString();
        var _result = '';

        _result = fullStringValue.replace(' ', '');
        _result = fullStringValue.replace('left_','').replace('right_','');
        _result = _result.toTitleCase();

        return _result;

    };

}); 