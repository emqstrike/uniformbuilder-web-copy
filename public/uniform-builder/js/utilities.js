
    $( document ).ready(function() {


        /// Utilities

            window.Utilities = {};

            window.Utilities.debug = true;
            window.Utilities.p = function(obj, label) {

                if (label === undefined) {
                    label = 'No Label';
                }

                if(window.Utilities.debug){
                    
                    console.log('--->');
                    console.log(label + ": ");
                    console.log(obj);
                    console.log('<---')

                }

            };

            window.Utilities.toTitleCase = function(str){
            
                return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

            };

            window.util = window.Utilities;

        /// End Utilities


    }); 