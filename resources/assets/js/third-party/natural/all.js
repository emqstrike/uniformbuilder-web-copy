
var sportlist = [];

var hasOwnProperty = Object.prototype.hasOwnProperty;

var exports = {};

exports.isEmpty = function(obj){

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {

        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;

}


exports.getSortedKeys = function(obj){

    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});

}

exports.getSortedKeysInverse = function(obj){

    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});

}


exports.removeAccents = function(text){
   
    var accents = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç?¿";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";

    for (var j=0; j<text.length; j++) {
        for (var i=0; i<accents.length; i++) {
            text = text.replace(accents.charAt(i), original.charAt(i));
        }
    }
    
    return text;

}


exports.jarowinklerDistanceWord = function(query, controllist, callback){
	
	var exactHash= {};
	var similarHash= {};
	
	//Jaro–Winkler string distance
	for(var i = 0; i < controllist.length; i++){
		var distance = natural.JaroWinklerDistance(controllist[i], query);
		if(distance < 1 && distance > 0.88){
			similarHash[controllist[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[controllist[i]]=distance;
			}
		}
	}

	if(exports.isEmpty(exactHash)){
		if(!exports.isEmpty(similarHash)){
			var newSimilarHash = exports.getSortedKeysInverse(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);
		}
		else{
			callback(1, null);
		}
	}
	else {
		var result = [query, exactHash[query]];
		callback(2, result);
	}

}

exports.levenshteinDistanceWord = function(query, controllist, callback){
	
	var exactHash= {};
	var similarHash= {};
	//Levenshtein distance
	for(var i = 0; i < controllist.length; i++){
		var distance = natural.LevenshteinDistance(controllist[i], query);
		if(distance > 0 && distance < 3){
			similarHash[controllist[i]]=distance;
		}
		else {
			if(distance==0){
				exactHash[controllist[i]]=distance;
			}
		}
	}


	if(exports.isEmpty(exactHash)){
		if(!exports.isEmpty(similarHash)){
			var newSimilarHash = exports.getSortedKeysInverse(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);
		}
		else{
			callback(1, null);
		}
	}
	else {
		var result = [query, exactHash[query]];
		callback(2, result);
	}

}

exports.dicesDistanceWord = function(query, controllist, callback){
	
	var exactHash= {};
	var similarHash= {};
	//Dice's coefficient distance
	for(var i = 0; i < controllist.length; i++){
		var distance = natural.DiceCoefficient(controllist[i], query);
		if(distance < 1 && distance > 0.70){
			similarHash[controllist[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[controllist[i]]=distance;
			}
		}
	}


	if(exports.isEmpty(exactHash)){
		if(!exports.isEmpty(similarHash)){
			var newSimilarHash = exports.getSortedKeys(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);
		}
		else{
			callback(1, null);
		}
	}
	else {
		var result = [query, exactHash[query]];
		callback(2, result);
	}

}

exports.jarowinklerDistanceSentence = function(query, controllist, callback){
	
	//Jaro–Winkler string distance
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < controllist.length; i++){
		var distance = natural.JaroWinklerDistance(controllist[i], query);
		if(distance < 1 && distance > 0.88){
			similarHash[controllist[i]]=distance;
		}
		else {
			if(distance==1){
				exactHash[controllist[i]]=distance;
			}
		}
	}

	if(exports.isEmpty(exactHash)){
		if(!exports.isEmpty(similarHash)){
			var newSimilarHash = exports.getSortedKeys(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);
		}
		else{
			callback(1, null);
		}
	}
	else {
		var result = [query, exactHash[query]];
		callback(2, result);
	}

}

exports.levenshteinDistanceSentence = function(query, controllist, callback){
	
	//Levenshtein distance
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < controllist.length; i++){
		var distance = natural.LevenshteinDistance(controllist[i], query);
		if(distance > 0 && distance < 5){
			similarHash[controllist[i]]=distance;
		}
		else {
			if(distance==0){
				exactHash[controllist[i]]=distance;
			}
		}
	}

	if(exports.isEmpty(exactHash)){
		if(!exports.isEmpty(similarHash)){
			var newSimilarHash = exports.getSortedKeysInverse(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);
		}
		else{
			callback(1, null);
		}
	}
	else {
		var result = [query, exactHash[query]];
		callback(2, result);
	}

}

exports.dicesDistanceSentence = function(query, controllist, callback){
	
	//Dice's co-efficient:
	var exactHash= {};
	var similarHash= {};

	for(var i = 0; i < controllist.length; i++){
		var distance = natural.DiceCoefficient(controllist[i], query);
		if(distance < 1 && distance > 0.70){
			similarHash[controllist[i]]=distance;
		}
		else {

			if(distance==1) { exactHash[controllist[i]]=distance; }

		}
	}

	if(exports.isEmpty(exactHash)){

		if(!exports.isEmpty(similarHash)){

			var newSimilarHash = exports.getSortedKeys(similarHash);
			var result = [newSimilarHash[0], similarHash[newSimilarHash[0]]];
			callback(0, result);

		}
		else{

			callback(1, null);

		}
	}
	else {

		var result = [query, exactHash[query]];
		callback(2, result);

	}

}
