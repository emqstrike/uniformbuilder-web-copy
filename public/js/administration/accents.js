    //put fonts

$(document).ready(function(){
  var accentIndex=0;
  var totalAccent=[];
  var shadowNum="1";
  var outlineNum="1";
  var numLayer=2;
  var outlineCtr=0;
  var canvas = new fabric.Canvas('canvas');  
  var canvas2 = new fabric.Canvas('canvas2');  
  var layer = new fabric.Text("85",{
               name : "Base_Color",
              fill : '#1e1e1e',
              left : 120,
              top : 110,                                  
              fontSize: $(".fontSize").val(),

              // strokeWidth : 12,
              // stroke :'black',
              // id : "layer"+numLayer,
              fontFamily : $(".selectFont").val(),
              
          });

  canvas.add(layer);
  layer.set('selectable', false); 
  canvas.sendToBack(layer);

  $.getJSON("http://api-dev.qstrike.com/api/fonts", function(result){
      var data = {
        fonts: result.fonts
        , index: function() {
            return ++window['INDEX']||(window['INDEX']=0);
        }
      }

      $.each(data.fonts, function(i, item) {   

          $("#fonts").append("@font-face {"+
              "font-family : '"+ item.name +"';"+
              "src : url("+ item.font_path +");"+
              "}");
              WebFont.load({
                custom: {
                  families: [item.name]
               
                }
          });
      })
      tableTemplate = "{{#fonts}}<option value='{{name}}' style='font-family:{{name}}' >{{name}}</option>{{/fonts}}";
   
      var html = Mustache.to_html(tableTemplate, data);
      $(".selectFont").append(html);
      $(".selectFont").css("font-family",$('option:selected', $(".selectedFont").val()).val());
  
  });
  // GetColors
  getColors();
   function getColors(){
    $.getJSON("http://api-dev.qstrike.com/api/colors", function(result){
        var data = {
          colors: result.colors
          , index: function() {
              return ++window['INDEX']||(window['INDEX']=0);
          }
        }
        tableTemplate = "{{#colors}}<option value='#{{hex_code}}'>{{name}}</option>{{/colors}}";
        var html = Mustache.to_html(tableTemplate, data);
        $(".selectColor").append(html);
        
    });

   }

  recountZindex();
  function recountZindex(){
    ctr = -1-$(".selectAllLayer").length+1;
    ctr2 = 1;
 
    $(".selectAllLayer").each(function(){   
      $(this).children('td.layerZindex').find("input").val(ctr);
      ctr++; 
      if($(this).children('td.layerNumber').find("input").val() != 1){
        $(this).children('td.layerNumber').find("input").val(ctr2);
        
      }
      ctr2++;
    });
  }


  function setStroke(){
    var strokeWidth="";
    $( "tr.selectAllLayer" ).each(function() {
      var currentIndex=$("tr.selectAllLayer").index(this);
      var previousNameOrg = $(".layerName:eq("+ ( currentIndex - 1 ) +")").text();
      var previousName = previousNameOrg;
      
      var remInt=$(this).attr("id").replace (/\d+/g,'').replace('_', '');

      if(remInt == "Outline" || remInt == "Shadow"){
        var previousLX = parseInt($(".layerX:eq("+ ( currentIndex-1 ) +")").find("input").val());
        var previousLY = parseInt($(".layerY:eq("+ ( currentIndex-1 ) +")").find("input").val());;
      
        if(remInt == "Outline"){


          strokeWidth++;
          $(this).find(".layerX input").val(previousLX - 8);
          $(this).find(".layerY input").val(previousLY - 8);
          
        }
        else{
          if( $(this).find(".layerX input").val() == ""){
          $(this).find(".layerX input").val(previousLX + 15);
          $(this).find(".layerY input").val(previousLY + 15);
          }
        }

        $(this).find(".layerStroke input").val(strokeWidth);
      }

    


    });

    var lastLayer = ($(".sortable-rows tr.selectAllLayer:last td.layerName").text()).replace(/\d+/g,'').replace('_', '').replace(' ', '');
    var secondLastLayer = ($(".sortable-rows tr.selectAllLayer:nth-last-child(2) td.layerName").text()).replace(/\d+/g,'').replace('_', '').replace(' ', '');
    
    if(lastLayer == "Outline" && secondLastLayer == "Outline"){
       $(".addOutline").attr("disabled","disabled");


    }else{
       $(".addOutline").removeAttr("disabled");
    }


     
  reCreateCanvas();
  }


  function reCreateCanvas(){
    console.log("createds");
    canvas.clear($(this).attr("id")); 
    $( ".selectAllLayer" ).each(function() {
      
      var lName=$(this).attr("id");    
      var LColor=$(this).find(".layerColor select").val();
      var LLayer;
      var LZIndex;
      var LX = parseInt($(this).find(".layerX input").val());
      var LY = parseInt($(this).find(".layerY input").val());
      var LStroke = parseInt($(this).find(".layerStroke input").val() * 16);
      var remInt=$(this).attr("id").replace (/\d+/g,'').replace('_', '');
    
    console.log($(this).attr("id"));
    console.log();

      if(!LColor){LColor = "#1e1e1e";}
    
       
  
       
       

          if(!LStroke || LStroke=="" ){LStroke=0};
    if(lName != "Mask"){
  


      layer = new fabric.Text("85",{
        name : lName,
        fill: LColor,
        left : LX,
        top : LY,                               
        fontSize: $(".fontSize").val(),
        strokeWidth : LStroke,
        stroke : LColor ,
        // id : "layer"+numLayer,
        fontFamily : $(".selectFont").val(),
        
      });
      canvas.add(layer);
        layer.set('hasControls', false);
      if( lName == "Base_Color" || remInt =="Outline"){ 

        layer.set('selectable', false); 
        layer.set('selectable', false); 

      } 
      canvas.sendToBack(layer);
    }

    });
    canvas.renderAll();
  
  
  }

  function setColor(t,layerName){
    canvas.forEachObject(function(key,obj){      
        if(layerName == canvas.item(obj).name){
          
            canvas.item(obj).fill= $(t).val();
            canvas.item(obj).stroke= $(t).val();
            
        }
  });


        
    canvas.renderAll();

  }
  
  function  reArrangeName(){
    var newSha=1;
    var newOut=1;
    $(".layerName").each(function(){   

      var remInt=($(this).text()).replace (/\d+/g,'');

      reInt = $.trim(remInt);
      if(reInt=="Shadow"){
        $(this).text(reInt+" "+newSha);
        $(this).attr("id",reInt+"_"+newSha);
        newSha++;

      }else if(reInt=="Outline"){
        $(this).text(reInt+" "+newOut);
        $(this).attr("id",reInt+"_"+newOut);
        newOut++;

      }

    });
  }
  setXandY();
  function setXandY(){

    canvas.forEachObject(function(key,obj){ 

      objectX = canvas.item(obj).left;

      objectY = canvas.item(obj).top;  

      $("#"+canvas.item(obj).name+" td.layerX input").val(objectX);
      $("#"+canvas.item(obj).name+" td.layerY input").val(objectY);
  
    });

    canvas.renderAll();
  };

function layerRemove(t){
   var parentStroke = $(t).closest("tr").attr("id");
   console.log(parentStroke);
   $("#"+parentStroke).remove();
   reCreateCanvas();

};

function accentRemove(t){
   var parentAccent = $(t).closest("tr").attr("id");
   console.log(parentAccent);
   $("#"+parentAccent).remove();

};

$(document.body).on('change', '.selectFont', function(){            
    canvas.forEachObject(function(key,obj){    
        canvas.item(obj).fontFamily=$(".selectFont").val();         
    });


     canvas.renderAll();

     $(this).css("font-family",$('option:selected', this).text());

});


$(document).on('mouseup', '.canvasContainer', function(){
       setXandY();
       setStroke();
    });

    $(document).on('change', '.selectColor', function(){
        setColor(this,$(this).closest("tr").attr("id"));
  
    });
$(document).on('change', '.layerX input', function(){
       reCreateCanvas();


  });
$(document).on('change', '.layerY input', function(){
       reCreateCanvas();


  });
$(document).on('click', '.layerRemove', function(){
      layerRemove(this);


  });
$(document).on('click', '.accentRemove', function(){
      accentRemove(this);


  });
// $(document).on('click', '.accentName', function(){

    //  var parentAccent = $(this).closest("tr").attr("id");
    //  var currentAccent = $("#"+parentAccent).find("td.accentAccent").text();
    //  var currentFont = $("#"+parentAccent).find("td.accentSize").text();
    //  currentFont = parseInt(currentFont);
    //  console.log(currentFont);
    //  var data=$(".accentName").index(this);
    // var layers = jQuery.parseJSON( currentAccent );


     

      // canvas2.clear();
    
      //   jQuery.each(layers, function(index, item) {    
             
      //       if(item.name != "Mask"){
      //           layer2 = new fabric.Text("85",{
              
           
      //               name : item.name,
      //               left:item.increment_x,
      //               top: item.increment_y,
      //               fontSize: currentFont,
      //               fill : item.dafault_color,  
      //               id : item.layer_no,
      //               stroke : item.dafault_color,
      //               strokeWidth : (item.outline * 16 ),
      //               fontFamily : $(".selectFont").val(),


      //           });
               
      //          canvas2.add(layer2);
      //           layer2.set('selectable', false); 
      //           canvas2.sendToBack(layer2);

      //              canvas2.renderAll();
     
      //          console.log(canvas2);

                    
      //          }
      //   });



  // });


$(document).on('click', '.saveAccent', function(){
  var layers;
  var totalLayers=[];
    $( ".selectAllLayer" ).each(function() {  
      var lName=$(this).attr("id");    
      var LColor=$(this).find(".layerColor select").val();
      var LLayer;
      var LZIndex;
      var LX = parseInt($(this).find(".layerX input").val());
      var LY = parseInt($(this).find(".layerY input").val());
      var LStroke = parseInt($(this).find(".layerStroke input").val());
      var remInt=$(this).attr("id").replace (/\d+/g,'').replace('_', '');
   
      layers = {
              "name" :  lName,
              "dafault_color": LColor,
              "layer_no" : LLayer,
              "increment_x" : LX,
              "increment_y" : LY,
              "outline": LStroke,
              "zIndex" : LZIndex,
              },
              totalLayers.push(layers);                     
    });
    accent = {
            id: accentIndex,
            name: $("#fName").val(),
            code: $("#fCode").val(),
            // thumbnail: 'double_drop_shadow.png',
            layers: totalLayers, 
            };
             totalAccent.push(accent);

             $(".accent_properties").val('"' + JSON.stringify(totalAccent) + '"');
             $(".submitAccent").trigger("click");
    // console.log(JSON.stringify(totalLayers));

    // $(".accentTable").append("<tr class='selectAllAccent' id='Accent_"+ accentIndex +"'>"+
    //   "<td class='accentFont'>" + $(".selectFont").val() + "</td>"+
    //   "<td class='accentName'>" + $("#fName").val() + "</td>"+
    //   "<td class='accentCode'>" + $("#fCode").val() + "</td>"+
    //   "<td class='accentSize'>" + $("#fSize").val() + "</td>"+
    //   "<td ><button type='button' class='btn btn-danger accentRemove'>Remove</button></td>"+
    //   "<td class='accentAccent'>" + JSON.stringify(totalLayers)+ "</td>"+
    //   "</tr>"
    //     );

accentIndex++;
  });



  $(".addLayer").click(function(){
    var numShaOut;
      
      if($(this).data("action")=="Shadow"){
        numShaOut = shadowNum;
        shadowNum++;

      }else{
        numShaOut = outlineNum;
        outlineNum++;
      
      }
      
      layer = new fabric.Text("85",{
              name : $(this).data("action") +"_"+ numShaOut,
              fill: '#1e1e1e',
              left : 30,
              top : 30,                                  
              fontSize: $(".fontSize").val(),
              // strokeWidth : 12,
              // stroke :'black',
              // id : "layer"+numLayer,
              fontFamily : $(".selectFont").val(),
              
          });
      


      canvas.add(layer);
      canvas.sendToBack(layer);
      canvas.forEachObject(function(key,obj){      
      });

      $(".sortable-rows").append(""+
          "<tr class='ui-state-default sortable selectAllLayer' id='"+ $(this).data("action") +"_"+ numShaOut +"'>"+
          "<td class='layerName'>"+$(this).data("action") +" "+ numShaOut+"</td>"+
          "<td class='layerColor'>"+
              "<select class='selectColor' data-name='"+$(this).data("action") +" "+ numShaOut+"'>"+
              "</select>"+
          "</td>"+
          "<td class='layerNumber'>"+
              "<input type='number' value='"+ numLayer +"' disabled='disabled'>"+
          "</td>"+
          "<td class='layerZindex' >"+
              "<input type='number' disabled='disabled'>"+
          "</td>"+
          "<td class='layerX'>"+
              "<input type='text' value=''>"+
          "</td>"+
          "<td class='layerY'>"+
             "<input type='text' value=''>"+
          "</td>"+
           "<td class='layerStroke'>"+
             "<input type='number' disabled='disabled'>"+
          "</td>"+
           "<td class='layerStatus'>"+
             "<button type='button' class='btn btn-danger layerRemove'>Remove</button>"+
          "</td>"+
          "");

      if($(this).data("action") == "Outline"){
        $("#"+ $(this).data("action") +"_"+ numShaOut +" td.layerStroke input").removeAttr("disabled");
      }
      getColors();
      recountZindex();
      reArrangeName();
    
      
      
      setStroke();
     
      
      numLayer++;


  });


$( "tbody.sortable-rows" ).disableSelection();
    $( "tbody.sortable-rows" ).sortable({   
        connectWith: ".connectedSortable" ,
        start: function(evt, ui) {
          
          
           console.log("start");
           

        },
        stop: function(evt, ui) {


            
           reArrangeName();
           recountZindex();

           setStroke();
         
           
         
        }
    });
});