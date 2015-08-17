
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

            window.utils = window.Utilities;

        /// End Utilities


    }); 