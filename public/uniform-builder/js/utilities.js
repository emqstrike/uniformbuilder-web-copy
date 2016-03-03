$( document ).ready(function() {

    window.util = {

        error: function (error){
            
            /// TODO: Add Error Logging here instead of just a plain console error log ...

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

    String.prototype.toTitleCase = function(){
        
        return window.util.toTitleCase(this.replace("_", " "));

    };

    /// Call:   "Arm Trim".toCodeCase();
    /// Output: "arm_trim"

    String.prototype.toCodeCase = function(){

        return this.toLowerCase().replace(" ", "_");

    };


}); 