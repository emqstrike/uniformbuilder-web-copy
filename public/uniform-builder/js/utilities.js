$( document ).ready(function() {

    window.util = {

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

}); 