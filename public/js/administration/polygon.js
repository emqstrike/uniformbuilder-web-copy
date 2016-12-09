$(document).ready(function() {



	var IN = 20;
	var coords = [];

	/*
        Initialize CANVAS for Bounding Polygon
    */
    try {
        var canvas = this.__canvas = new fabric.Canvas('bounding-polygon-canvas');
        fabric.Object.prototype.transparentCorners = false;
        canvas.setWidth( 496 );
        canvas.setHeight( 550 );
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    }
    catch(err) {
        console.log(err.message);
    }

    $(".polygon-button").click(function(e){
	    e.preventDefault();
	    $('#material-piping-polygon-modal').modal('show');
	    var polyData = $("#polygon_prop").val();
	    polyData = JSON.parse(polyData);
	    loadPolygon(polyData);
        updateCoordinates();
        canvas.clear();
	});

	$('.add-point').on('click', function(){
	    var focusPoint = $("#selectpoint").val();
	    var focusPointIndex = $("#selectpoint option:selected").data("letter-index");

	    var a = Math.floor((Math.random() * 5) + 1);
	    a = a * IN;
	    var b = Math.floor((Math.random() * 5) + 1);
	    b = b * IN;
	    var addPoint;

	    var data = {
	        "x" : a,
	        "y" : b
	    };

	    console.log('DATA> '+JSON.stringify(data));

	    var myData = $("#polygon_prop").val();
	    console.log('myData 1> '+myData);
	    // myData = myData.slice(1, -1);
	    // console.log('myData 2> '+myData);
	    // var detect = myData.slice(1,2);
	    // if(detect == "{"){
	    
	    //     myData = "["+myData+"]";
	    // }
	    myData = JSON.parse(myData);
	    console.log(myData);

	    myData[focusPointIndex].push(data);

	    // console.log("mydata:-----"+ JSON.stringify(myData));
	 
	    $("#polygon_prop").val(JSON.stringify(myData));

	    loadPolygon(myData);
    // console.log(JSON.stringify(myData));

    });

	$('.add-polygon').on('click', function(){

	    var data = [{"x":100,"y":100},{"x":150,"y":100},{"x":150,"y":150},{"x":100,"y":150}];
	    var letter=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	    var mydata = $("#polygon_prop").val();
	    console.log('My Data> ' + mydata);
	    // mydata = mydata.slice(1, -1);
	    // var detect = mydata.slice(1,2);

	    // if(detect == "{"){

	    //     mydata = "["+mydata+"]";
	    // }

	    mydata = JSON.parse(mydata); 
	    mydata.push(data);
	    $("#polygon_prop").val(JSON.stringify(mydata));

	    $("#selectpoint").append("<option data-letter-index="+ ($("#selectpoint option").length) +">"+ (letter[$("#selectpoint option").length]) +"</option>");
	    loadPolygon(mydata);
	});

	// $('.material-option-boundary').on('click', function(){
 //        application_number = 0;
 //        material = {
 //            id: $(this).data('material-id'),
 //            name: $(this).data('material-name'),
 //            front_shape: ($(this).data('material-front-shape')),
 //            back_shape: ($(this).data('material-back-shape')),
 //            left_shape: ($(this).data('material-left-shape')),
 //            right_shape: ($(this).data('material-right-shape')),
 //            option: {
 //                material_id: $(this).data('material-id'),
 //                id: $(this).data('material-option-id'),
 //                name: $(this).data('material-option-name'),
 //                type: $(this).data('material-option-setting-type'),
 //                code: $(this).data('material-option-setting-code'),
 //                path: $(this).data('material-option-path'),
 //                perspective: $(this).data('material-option-perspective'),
 //                boundary_properties: ($(this).data('material-option-boundary-properties')),
 //                highlights: ($(this).data('material-highlights-path'))
 //            }
 //        };

 //        $('.b-prop').val(material.option.boundary_properties);
 //        $('.material-option-id').val(material.option.id);
 //        $('.material-id').val(material.id);

 //        console.log('MO ID: '+material.option.id);
 //        console.log('MAT ID: '+material.option.material_id);

 //        var perspective = material.option.perspective;
 //        var material_option_shape = material.option.path;

 //        $('#app-saved-perspective').val(material.option.perspective);
 //        $('#app-material-option-name').val(material.option.name);
 //        $("#material-option-bounding-box-top").css("background-image", "url("+material.option.path+")");
 //        $("#material-option-bounding-box").css("background-image", "url("+material.option.highlights+")");

 //        $( ".front-applications" ).html(''); // prevents continuous appending of applications points

 //        canvasFront.clear();

 //        $("#file-src").prop("src", material.option.path);
 //        $("#layer-level").prop("value", material.option.layer_level);

 //        if (material.option.blend) {
 //            $('#is-blend').attr('checked', 'checked');
 //        } else {
 //            $('#is-blend').attr('checked', 'unchecked');
 //        }

 //        console.log('B prop val >>'+$('.b-prop').val());


 //        if($('.b-prop').val != "" || $('.b-prop').val != "\"{}\""){
 //            canvas.clear();
 //            var jason = $('.b-prop').val();
 //            var output = jason.substring(1, jason.length-1);
 //            polyData = JSON.parse(output);

 //            loadPolygon(polyData);
 //            updateCoordinates();
 //            canvasFront.clear();

 //            var boundaryProperties = '"'+JSON.stringify(polyData)+'"';
 //            $('.b-prop').prop('value', boundaryProperties);
 //        }

 //        $('#saved-setting-type').attr('selected',true);
 //        $('#saved-perspective').attr('selected',true);
 //        $('#edit-material-option-boundary-modal .material-option-path').attr('src', material.option.path);
 //        $('#save-material-option-boundary-modal .material-id').val(material.id);
 //        $('#save-material-option-boundary-modal .modal-title span').html("Edit: " + material.option.name);
 //        $('#save-material-option-boundary-modal').modal('show');

 //        var circles = canvas.getObjects('circle');
 //        var ctrX=0;
 //        var aa = circles.length - 1;
 //        var lastLetter="";
 //        var i=0;
 //        $("#selectpoint").html("");
 //        circles.forEach(function(entry) {
 //            var myString = entry.name;
 //            myString = myString.replace(/[^A-Za-z]+/g, '');
 //            console.log("loaded:"+myString);

 //            if(lastLetter != "" && lastLetter != myString){
 //            $("#selectpoint").append("<option data-letter-index="+i+" >"+ lastLetter +"</option>");
 //                i++;
 //            }
 //            if(ctrX == aa){
 //                $("#selectpoint").append("<option data-letter-index="+i+">"+ lastLetter +"</option>");

 //            }
 //             lastLetter = myString;
 //             ctrX++;
 //        });
        
 //        bringingPointToFront();

 //    });



	function fixLoadPolygon(){
        var va_prop_val = $('.load-boundaries-template').val();

        var output = va_prop_val.substring(1, va_prop_val.length-1);
        polyData = JSON.parse(output);

        loadPolygon(polyData);
    }

    function distance(p1, p2) {
        //Accepts two objects p1 & p2. Returns the distance between p1 & p2
        return Math.sqrt(((p2.left - p1.left) * (p2.left - p1.left)) + ((p2.top - p1.top) * (p2.top - p1.top)));
    }

    function addCircle(name, x, y, style) {
        if (style === 'knot') {
            // cfill = 'FireBrick';
            // cstroke = 'FireBrick';
            cfill = 'red';
            cstroke = 'red';
            ctype = 'knot';
        } else {
            cfill = '';
            cstroke = 'gray';
            ctype = 'control';
        }
        var c = new fabric.Circle({
            name: name,
            left: x,
            top: y,
            strokeWidth: 2,
            radius: 5.8,
            fill: cfill,
            stroke: cstroke,
            hasBorders: false,
            hasControls: false,
            lockUniScaling: true,
            selectable: true,
            coords: x + ', ' + y,
            reference: true,
            ptype: ctype,
            opacity: 0.3
        });
        return c;
    } // addCircle()


    function addPoint(name, x, y, style) {

        var p = addCircle(name, x, y, style);
        p.point = new fabric.Point(x, y);
        // p.point.group = group;
        p.text = new fabric.Text(name, {
            left: x,
            top: y - 10,
            name: name + '_text',
            fill: '#808080',
            fontSize: 14,
            hasBorders: false,
            hasControls: false,
            lockUniScaling: true,
            selectable: false,
            reference: true
        });
        // canvas.add(p.text);
        canvas.add(p);
     
        return p;
    } // addPoint()

    function addLine(p0, p1, lineIdx) {
        var new_line = new fabric.Object();
        new_line = new fabric.Line([p0.left, p0.top, p1.left, p1.top], {
            id: lineIdx,
            fill: "white",
            stroke: "white",
            strokeLinejoin: "miter",
            strokeMiterlimit: 1,
            strokeWidth: 3,
            strokeDashArray: [5, 5],
            selectable: false,
            hasBorders: false,
            hasControls: false,
            reference: false,
            opacity: 0.8,
            name: "Line_" + p0.name + p1.name
        });
        new_line.setShadow("3px 3px 2px rgba(94, 128, 191, 0.5)");
        if (p0.hasOwnProperty('outPath') === false) {
            p0.outPath = [];
        }
        p0.outPath.push(new_line);
        if (p1.hasOwnProperty('inPath') === false) {
            p1.inPath = [];
        }
        p1.inPath.push(new_line);
        canvas.add(new_line);
     
        return new_line;
    } //addLine()

    try {
		canvas.observe('object:rotating', function (e) { 

		    canvas.renderAll();
		    var circles = canvas.getObjects('circle');
		    var groups = canvas.getObjects('group');
		    coords = new Array();
		    var x = 0;
		    circles.forEach(function(entry) {
		        var getCenterPoint = entry.getCenterPoint();
		        console.log("X: ["+getCenterPoint.x.toFixed(2)+"] Y: ["+getCenterPoint.y.toFixed(2)+"]");
		        coords[x] = {};
		        if( x == 0 ){
		            coords[x]['angle'] = parseFloat(groups[0].getAngle());
		        }
		        coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
		        coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
		        x++;
		    });
		    coords.forEach(function(entry) {
		        console.log('Entry: '+entry['x']+', '+entry['y']);
		    });
		    console.log(JSON.stringify(coords));
		    console.log("JSON"+canvas.toJSON());
		    updateCoordinates();
		    $('#pattern_angle').val(parseFloat(groups[0].getAngle().toFixed(2)));
		});

		canvas.observe('object:moving', function (e) {
		    var p = e.target;
		    console.log('Moving ' + p.name);
		    
		    if (p.hasOwnProperty("text") === true) {
		        //move text label to new circle location
		        p.text.set({
		            'left': p.left,
		            'top': p.top - 10
		        });
		    }
		    
		    if (p.hasOwnProperty("inPath") === true) {
		        //inpaths - paths end at circle
		        for (var i = 0; i < p.inPath.length; i++) {
		            ppath = p.inPath[i];
		            if (p.ptype === 'control') {
		                ppath.path[1][3] = p.left; // p is 2nd control circle in curve, update c1.x
		                ppath.path[1][4] = p.top; // p is 2nd control circle in curve, update c1.y
		            } else if (ppath.type === 'path') {
		                ppath.path[1][5] = p.left; // p is end circle in curve, update p1.x
		                ppath.path[1][6] = p.top; // p is end circle in curve update p1.y
		            } else if (ppath.type === 'line') {
		                ppath.set({
		                    'x2': p.left,
		                    'y2': p.top
		                }); //p is begin circle in line, update left & top
		            }
		        }
		    }
		    if (p.hasOwnProperty("outPath") === true) {
		        //outpaths - paths begin at circle
		        for (var i = 0; i < p.outPath.length; i++) {
		            ppath = p.outPath[i];
		            if (p.ptype === 'control') {
		                ppath.path[1][1] = p.left; //p is 1st control circle in curve, update c0.x
		                ppath.path[1][2] = p.top; //p is 1st control circle in curve, update c0.y
		            } else if (ppath.type === 'path') {
		                ppath.path[0][1] = p.left; // p is begin circle in curve, update p0.x
		                ppath.path[0][2] = p.top; // p is begin circle in curve, update p0.y
		            } else if (ppath.type === 'line') {
		                ppath.set({
		                    'x1': p.left,
		                    'y1': p.top
		                }); //p is end circle in line, update left & top
		            }
		        }
		    }
		    console.log(p.name + ' moved!');
		    canvas.renderAll();
		    var circles = canvas.getObjects('circle');
		    var groups = canvas.getObjects('group');
		    coords = new Array();
		    var x = 0;
		    circles.forEach(function(entry) {
		        var getCenterPoint = entry.getCenterPoint();
		        // console.log("X: ["+getCenterPoint.x.toFixed(2)+"] Y: ["+getCenterPoint.y.toFixed(2)+"]");
		        coords[x] = {};
		        if( x == 0 ){
		            coords[x]['angle'] = parseFloat(groups[0].getAngle());
		        }
		        coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
		        coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
		        x++;
		    });

		    updateCoordinates();
		}); //canvas.observe();
	}
		catch(err) { console.log(err.message); 
	}

	function loadPolygon(data){

	    var angle;
	    canvas.clear();
	    var z = 0;
	    window.px = 0;
	    window.py = 0;
	    // console.log('POLY TEST >> '+data[0].angle);

	    var ii = 0;

	    // console.log("datae to old:"+JSON.stringify(data));

	    // console.log("loopnumber:" + ii);
	    // Detect if array within array if so added bracket
	    // var detect = JSON.stringify(data).slice(1,2);
	    // if(detect == "{"){
	    //     var stringData = JSON.stringify(data);
	    //     stringData = "["+stringData+"]";
	       // data = JSON.parse(stringData);
	    // }
   console.log('LoadPolygon');
	    // console.log("datae to:"+JSON.stringify(data));
	    data.forEach(function(entry) {

	        var z = 0;
	        var letter=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	        $.each(entry, function(i, item) {
	            // console.log(letter[ii]);
	            // console.log("Item>_" + item);
	            var xcoord = item.x / 2;
	            var ycoord = item.y / 2;
	            // var xcoord = item.x;
	            // var ycoord = item.y;

	            if( z == 0 && item.angle != undefined ){
	                // console.log('ITEM ANGLE: '+item.angle);
	                angle = item.angle;
	                if(item.px){
	                    window.px = item.px / 2;
	                    window.py = item.py / 2;
	                    // window.px = item.px;
	                    // window.py = item.py;
	                }
	                // console.log('PX > '+ window.px + 'PY > ' + window.py);
	            }
	            window[letter[ii]+z] = addPoint(letter[ii]+z, xcoord, ycoord, 'knot');
	            z++;
	        });
	        ii++;

	    });
// return true;
	    lineIdx = 0;
	    var circles = canvas.getObjects('circle');

	    var x = 0;
	    var a = circles.length - 1; // circles.length = length of every circles, count all a, count all b, and so on
	    var lastLetter="";
	    var lastName="";
	    var letterNum=0;
	    var ind=0;

	    circles.forEach(function(entry) {
	        var myString = entry.name;
	        myString = myString.replace(/[^A-Za-z]+/g, '');

	        if(x != 0){
	            if(lastLetter == myString){
	        
	                addLine(window[lastName], window[entry.name], lineIdx);
	                lineIdx++;

	            }else{

	                addLine(window[lastName], window[lastLetter + "0" ], lineIdx);

	            }
	            if(x == a){
	                addLine(window[entry.name], window[lastLetter + "0" ], lineIdx);
	           
	            }
	        }

	        lastName = entry.name;
	        lastLetter = myString;

	        x++;
	        
	        letterNum++;

	    });
	    // lastCircleLength = circles;
	    // console.log('Line Index: ' + lineIdx);
	    loadCase = 1;

	    try {
	        $('#pattern_angle').val(parseFloat(angle.toFixed(2)));
	    }
	    catch(err) { console.log(err.message); }

	    if( window.px == 0 || window.px == null ){
	        console.log('IF');
	        window.px = 453;
	        window.py = 362;
	    }

	    var rect = new fabric.Rect({
	        left: window.px,
	        top: window.py,
	        fill: 'White',
	        stroke: 'red',
	        stroke_width: '2px',
	        hasBorders: false,
	        lockScalingX: true,
	        lockScalingY: true,
	        lockUniScaling: true,
	        width: 50,
	        height: 50
	    });

	    var text = new fabric.Text('Pattern Angle', { fill: 'black', fontSize: 15, left: window.px, top: window.py });

	    var triangle = new fabric.Triangle({  width: 35, height: 20, fill: 'red', left: window.px, top: window.py, angle: 180 });

	    if( angle == null || angle == "" ){
	        angle = 0;
	    }

	    var group = new fabric.Group([ rect, triangle, text ], { left: window.px, top: window.py, angle: angle });

	    canvas.add(group);
	    canvas.renderAll();
	    // fixLoadPolygon();

	     bringingPointToFront();

	}

	function bringingPointToFront(){

         canvas.forEachObject(function(key,obj){  

            var subjectName = ""+ canvas.item(obj).name +"";

           // subjectName = jQuery.parseJSON( subjectName);
           subjectName = subjectName.substring(0,4);

            if ( subjectName == "Line" ) {

            // canvas.sendToBack(canvas.item(obj));

             canvas.item(obj).evented = false;
             canvas.item(obj).selectable = false;
            } else if(subjectName != "unde") { 
        
               // canvas.sendToFront(canvas.item(obj));
               canvas.item(obj).evented = true;
             canvas.item(obj).selectable = true;
            }

           // canvas.item(obj).visible = false;

      });
            canvas.renderAll();
    }

    function updateCoordinates(cs) {

        applicationProperties = {}
        var circles = canvas.getObjects('circle');
        var x = 0;
        circles.forEach(function(entry) {
            var getCenterPoint = entry.getCenterPoint();
            console.log("X: ["+getCenterPoint.x.toFixed(2)+"] Y: ["+getCenterPoint.y.toFixed(2)+"]");
            coords[x] = {};
            var groups = canvas.getObjects('group');
            if( x == 0 ){
                coords[x]['angle'] = parseFloat(groups[0].getAngle());
                var pivot = groups[0].getCenterPoint();
                coords[x]['px'] = pivot.x * 2;
                coords[x]['py'] = pivot.y * 2;
            }

            coords[x]['x'] = parseFloat(getCenterPoint.x.toFixed(2)) * 2;
            coords[x]['y'] = parseFloat(getCenterPoint.y.toFixed(2)) * 2;
            x++;
        });

        canvas.renderAll();
        var boundaryProperties = JSON.stringify(coords);
        // boundaryProperties = '"'+boundaryProperties+'"';
        $('#polygon_prop').prop('value', boundaryProperties);
        console.log('BPROPxs: '+boundaryProperties);

        // APP ROTATION EACH HERE )))))))))))))))))))))))))))))))))))) --------- updateApplicationsJSON();
    }



});