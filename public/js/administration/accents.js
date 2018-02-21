


$(document).ready(function(){



  $('.selectFont').selectize({});

  $(".selectFont div.selectize-input .item").css("font-family",$("select.selectFont").val());


  var accentIndex=0;
  var totalAccent=[];
  var shadowNum="1";
  var outlineNum="1";
  var numLayer=2;
  var outlineCtr=0;
  var canvas = new fabric.Canvas('canvas');  
  var canvas2 = new fabric.Canvas('canvas2');  
  var layer = new fabric.Text("85",{
         fontFamily: $(".selectFont").val(),
              name : "Base_Color",
              fill : '#1e1e1e',
              left : 120,
              top : 110,       

              fontSize: $(".fontSize").val()

              
              
      });


   canvas.add(layer);
   layer.set('selectable', false); 
        layer.set('evented', false); 

  canvas.sendToBack(layer);

    

  // $.getJSON("https://api.prolook.com/api/fonts", function(result){
  //     var data = {
  //       fonts: result.fonts
  //       , index: function() {
  //           return ++window['INDEX']||(window['INDEX']=0);
  //       }
  //     }

  //     $.each(data.fonts, function(i, item) {
  //     console.log(i);
  //       if(item.active == "1"){
  //         $("#fonts").append("@font-face {"+
  //             "font-family : '"+ item.name +"';"+
  //             "src : url("+ item.font_path +");"+
  //             "}");
  //             WebFont.load({
  //               custom: {
  //                 families: [item.name]
               
  //               }
  //         });
  //         $(".selectFont").append("<option value='"+ item.name +"' style='font-family:"+ item.name +"' > "+ item.name +"</option>")


  //       }
      
  //     })

  //     // tableTemplate = "{{#fonts}}<option value='{{name}}' style='font-family:{{name}}' >{{name}}</option>{{/fonts}}";
  //     // var html = Mustache.to_html(tableTemplate, data);
  //     // $(".selectFont").append(html);
  //     $(".selectFont").css("font-family",$('option:selected', $(".selectedFont").val()).val());
  
  // }).always(function() {
    
  // });
//   getColors("once");
  
//  function getColors(layerName){
//   console.log(layerName);
//   console.log("//");
//   $.getJSON("https://api.prolook.com/api/colors", function(result){
//       var data = {
//         colors: result.colors
//         , index: function() {
//             return ++window['INDEX']||(window['INDEX']=0);
//         }
//       }
//       tableTemplate = "{{#colors}}<option value='#{{hex_code}}'>{{name}}</option>{{/colors}}";
//       var html = Mustache.to_html(tableTemplate, data);
//       if(layerName=="once"){
//       $(".selectColor").append(html);
//       }else{
//       $("#"+layerName+" .selectColor").append(html);
//       }
      
//   }).always(function() {
  
// });
// }
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
    
    // if(lastLayer == "Outline" && secondLastLayer == "Outline"){
    //    $(".addOutline").attr("disabled","disabled");
    // }else{
    //    $(".addOutline").removeAttr("disabled");
    // }
  
  reCreateCanvas();
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


//reCreateCanvas();
function reCreateCanvas(){

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
       fontFamily: $(".selectFont").val(),
        
      });
      canvas.add(layer);
        layer.set('hasControls', false);
      
      if( lName == "Base_Color" || remInt =="Outline" || lName =="Pseudo_Shadow"){  


        layer.set('selectable', false); 
        layer.set('evented', false); 
  

      } 
      canvas.sendToBack(layer);
    }

    });
    canvas.renderAll();
  
  
  }

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
    setStroke();
  });
  $(document).on('change', '.layerY input', function(){
    setStroke();
  });
  $(document).on('click', '.layerRemove', function(){
    layerRemove(this);
  });
  $(document).on('click', '.accentRemove', function(){
    accentRemove(this);
  });

  $(document).on('keyup change click','#fName',function(){
    
    $("#fCode").val(($(this).val().toLowerCase()).replace(/ /g,"_"));
  });






  $(document).on('click', '.saveAccent', function(){
    var layers;
    var totalLayers=[];
    $( ".selectAllLayer" ).each(function() {  
      var lName=$(this).attr("id");    
      var LColor=$(this).find(".layerColor select").val();
      var LLayer=$(this).find(".layerNumber input").val();
      var LColorId=$(this).find(".layerColor select").find(":selected").data("color-id");
      var LZIndex=$(this).find(".layerZindex input").val();
      var LX = parseInt($(this).find(".layerX input").val());
      var LY = parseInt($(this).find(".layerY input").val());
      var LStroke = parseInt($(this).find(".layerStroke input").val());
      var remInt=$(this).attr("id").replace (/\d+/g,'').replace('_', '');
      
      if(!LStroke){LStroke=0;}
      if(!LX){LX=0;}
      if(!LY){LY=0;}
      layers = {
              "name" :  lName,
              "default_color": LColor,
              "default_color_id": LColorId,
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
             
               $(".accent_properties").val('"' + JSON.stringify(totalLayers) + '"');
               console.log(totalLayers);
               $(".submitAccent").trigger("click");
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
              "<select class='selectColor form-control' data-name='"+$(this).data("action") +" "+ numShaOut+"'>"+
              
              "</select>"+
          "</td>"+
          "<td class='layerNumber'>"+
              "<input type='number' value='"+ numLayer +"' disabled='disabled'>"+
          "</td>"+
          "<td class='layerZindex' >"+
              "<input type='number' disabled='disabled'>"+
          "</td>"+
          "<td class='layerX' >"+
              "<input type='number' value='' disabled='disabled'>"+
          "</td>"+
          "<td class='layerY' >"+
             "<input type='number' value='' disabled='disabled'>"+
          "</td>"+
           "<td class='layerStroke'>"+
             "<input type='number' disabled='disabled'>"+
          "</td>"+
           "<td class='layerStatus'>"+
             "<button type='button' class='btn btn-danger layerRemove'>Remove</button>"+
          "</td>"+
          "");

      if($(this).data("action") == "Shadow"){
        $("#"+ $(this).data("action") +"_"+ numShaOut +" td.layerX input").removeAttr("disabled");
        $("#"+ $(this).data("action") +"_"+ numShaOut +" td.layerY input").removeAttr("disabled");
     
      }


      // $("#"+$(this).data("action") +"_"+ numShaOut +" .layerColor select").html($(".colorSelection").html()).selectize({});
     $("#"+$(this).data("action") +"_"+ numShaOut +" .layerColor select").html($(".colorSelection").html());


      recountZindex();
      reArrangeName();
      setStroke();
      numLayer++;
  });

$( "tbody.sortable-rows" ).disableSelection();
    $( "tbody.sortable-rows" ).sortable({   
        connectWith: ".connectedSortable" ,
        start: function(evt, ui) {  
        },
        stop: function(evt, ui) {         
         reArrangeName();
         recountZindex();
         setStroke();         
         
        }
    });

  //   var ctr=0;

  //  var intervalId =window.setInterval(function() {
  //   reCreateCanvas();

  //     console.log(ctr);
  //     if(IsLoadedFonts('Angels')){window.clearInterval(intervalId);}
      
  //     ctr++;
  // }, 1);


});

