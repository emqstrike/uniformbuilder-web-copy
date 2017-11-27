$(document).ready(function() {

    var nlp = exports;
    sportlist = ub.data.urlAlias.getArray();

    ub.nlp.queryDistance = function(query, callback_http){

        var ambiguousResult = [];
        var exactResult = [];
        var phrases = [];

        var numpalabras = query.trim().split(" ");
        var tokens = tokenizer.tokenize(query);

        var phrasesComplete = [];

        for(var j = 0; j < phrases.length; j++) {

            for (var i = 0; i < sportlist.length; i++) {

                phrasesComplete.push(phrases[j]+sportlist[i]);

            }

        }

        // Start Function

        //Jaro–Winkler string distance
        nlp.jarowinklerDistanceWord(query, sportlist, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{
                if(error == 2){

                    exactResult.push(result);

                }
            }

        });

        //Levenshtein distance
        nlp.levenshteinDistanceWord(query, sportlist, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{
                if(error == 2){

                    exactResult.push(result);

                }
            }

        });

        //Dice's co-efficient:
        nlp.dicesDistanceWord(query, sportlist, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{
                if(error == 2){

                    exactResult.push(result);

                }
            }

        });

        //Jaro–Winkler string distance
        nlp.jarowinklerDistanceSentence(query, phrasesComplete, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{
                if(error == 2){
                    exactResult.push(result);
                }
            }

        });

        //Levenshtein distance
        nlp.levenshteinDistanceSentence(query, phrasesComplete, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{

                if(error == 2) {

                    exactResult.push(result);

                }

            }
        });

        //Dice's co-efficient:
        nlp.dicesDistanceSentence(query, phrasesComplete, function(error, result){

            if(error == 0){

                ambiguousResult.push(result);

            }
            else{

                if(error == 2){

                    exactResult.push(result);

                }
            }

        }); 

        // End Functions
        
        if(exactResult.length > 0){ 

            callback_http(false, []);

        }
        else{

            if(ambiguousResult.length > 0){ 

                if(ambiguousResult.length == 1) {

                    callback_http(false, ambiguousResult);

                }
                else {

                    callback_http(false, ambiguousResult);

                }

            }
            else { 

                callback_http(false, []);

            }
        }
        
    };

    ub.nlp.query = function(text, callback){

        if (text != ''){

            var queryWithOutAccents = nlp.removeAccents(text);
            queryWithOutAccents = queryWithOutAccents.toLowerCase();

            ub.nlp.queryDistance(queryWithOutAccents, function(error, info) {

                callback( { result: info } );

            });

        } else {
            
            callback( { result: 'no input' } );

        }

    };

});