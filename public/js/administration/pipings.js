$(document).ready(function() {

	getPipings(function(pipings){ window.pipings = pipings; });

	function getPipings(callback){ // get Pipings
        var pipings;
        var id = 92;
        var url = "//api-dev.qstrike.com/api/material/"+id+"/pipings";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                pipings = data['pipings'];
                if(typeof callback === "function") callback(pipings);
            }
        });
    }

    function bindImages(data){

    }

});