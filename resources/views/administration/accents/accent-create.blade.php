@extends('administration.lte-main')



@section('content')
<link rel="stylesheet" type="text/css" href="/css/selectize.default.css">


<style >
   
    table {
  table-layout: fixed;
    }
    .selectColor {
            width: 100%;
    }

    table tr td input {
        width: 100%;
    }



</style>

@foreach ($fonts as $font)
<script>
  WebFont.load({
    custom: {
      families: ['{{$font -> name}}']
    }
  });
</script>

<style type="text/css">
    @font-face {
    font-family: {{$font -> name}};
    src: url({{$font -> font_path}});
}
</style>
@endforeach


<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Accent</div>
                <div class="panel-body">
                    <div class="col-md-5 canvasContainer">
                        <canvas id="canvas" width="600" height="600" style="border:1px solid black"/>

                        </canvas>

                     <!--    <canvas id="canvas2" width="400" height="400" style="border:1px solid black"/>

                        </canvas> -->
                    </div>
                    <div class="col-md-7">
                         <form method="POST" action="/administration/accent/add" enctype="multipart/form-data">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Font : </label>
                                <select class="selectFont">
                               <!--      <option value="fantasy" style="font-family: fantasy">Default Font</option>
                                -->     
                                    @foreach ($fonts as $font)
                                        @if( ($font -> name) == "Full Block") 
                               
                                        <option selected="selected" value="{{$font -> name}}">{{$font -> name}}</option>
                                        @else if
                                        <option value="{{$font -> name}}">{{$font -> name}}</option>
                                       
                                        @endif
                                    @endforeach                        
                                </select>
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Name : </label>
                                 <input type="text"  value="Default Name" class="form-control inputText" id="fName" name="name" placeholder="">
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Alias : </label>
                                 <input type="text" class="form-control" id="fAlias" name="alias" placeholder="">
                            </fieldset>
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Code : </label>
                                 <input type="text" value="default_name" name="code" class="form-control" id="fCode" placeholder="">
                            </fieldset>
                             <fieldset class="form-group">
                                <label for="formGroupExampleInput">Thumbnail : </label>
                                  <input type="file" class="form-control thumbnail-file" name="thumbnail_path_uploader" accept="image/*">
                            </fieldset>       
                            <fieldset class="form-group">
                                <label for="formGroupExampleInput">Size : </label>
                                <input type="number" value="300"  class="form-control fontSize" id="fSize" placeholder="">
                            </fieldset>
                            <input type="hidden" class="accent_properties" name="accent_properties" >                
                            <button class="btn btn-primary submitAccent" style="display:none">Save Accent</button>
                        </form>                       
                    </div>
                    <select class="colorSelection" data-name_color="base" style="display:none">
                        @foreach ($colors as $color)
                            <option value="#{{$color -> hex_code}}" style="font-family:{{$color -> name}}}" data-color-id="{{$color -> id }}">{{$color -> name}}</option>
                        @endforeach      
                    </select>
                    <div class="col-md-12">
                        <table class="layoutTable table table-bordered">
                            <thead><th>Name</th><th>Color</th><th>Layer</th><th>Z - Index</th><th>x</th><th>y</th><th>Stroke</th><th>Remarks</th></thead>
                            <tr class="selectAllLayer" id = "Base_Color">
                                <td class="layerName">Base Color</td>
                                <td class="layerColor">
                                    <select class="selectColor form-control">
                                        @foreach ($colors as $color)
                                            <option value="#{{$color -> hex_code}}" style="font-family:{{$color -> name}}" data-color-id="{{$color -> id }}">{{$color -> name}}</option>
                                       
                                        @endforeach    
                                    </select>
                                </td>
                                <td class="layerNumber">
                                    <input type="number" value="1" disabled='disabled'>
                                </td>
                                <td class="layerZindex">
                                    <input type="number" disabled='disabled'>
                                </td>
                                <td class="layerX">
                                    <input type="number" disabled='disabled'>
                                </td>
                                <td class="layerY">
                                   <input type="number" disabled='disabled'>
                                </td>
                                 <td class="layerStroke">
                                   <input type="number" max="0" disabled="disabled">
                                </td>
                                <td></td>
                            </tr>
                            <tr class="selectAllLayer" id = "Pseudo_Shadow">
                                <td class="layerName">Pseudo Shadow</td>
                                <td class="layerColor">
                                    <select class="selectColor form-control">
                                        @foreach ($colors as $color)
                                            <option value="#{{$color -> hex_code}}" style="font-family:{{$color -> name}}" data-color-id="{{$color -> id }}">{{$color -> name}}</option>
                                       
                                        @endforeach    
                                    </select>
                                </td>
                                <td class="layerNumber">
                                    <input type="number" value="2" disabled='disabled'>
                                </td>
                                <td class="layerZindex">
                                    <input type="number" disabled='disabled'>
                                </td>
                                  <td class="layerX">
                                    <input type="number" value="121" disabled='disabled'>
                                </td>
                                <td class="layerY" >
                                   <input type="number" value="110" disabled='disabled'>
                                </td>
                                 <td class="layerStroke">
                                   <input type="number" max="0" disabled="disabled">
                                </td>
                                <td></td>
                            </tr>
                            <tbody class="sortable-rows">                                       
                            </tbody>
                            <tr class="selectAllLayer" id="Mask">
                                <td class="layerName">Mask</td>
                                <td class="layerColor">
                                    <select class="selectColor form-control" data-name_color="mask">
                                        @foreach ($colors as $color)
                                            <option value="#{{$color -> hex_code}}" style="font-family:{{$color -> name}}}" data-color-id="{{$color -> id }}">{{$color -> name}}</option>
                                        @endforeach    
                                    </select>
                                </td>
                                <td class="layerNumber">
                                    <input type="number" value="1" disabled='disabled'>
                                </td>
                                <td class="layerZindex">
                                    <input type="number" disabled='disabled'>
                                </td>
                                <td class="layerX">
                                    <input type="number" disabled='disabled'>
                                </td>
                                <td class="layerY">
                                   <input type="number" disabled='disabled'>
                                </td>
                                 <td class="layerStroke">
                                   <input type="number" max="0" disabled="disabled">
                                </td>
                                <td></td>
                                                                                                      
                             </tr>
                        </table>
                        <button class="addLayer addShadow btn btn-primary" data-action="Shadow">Add Shadow</button>
                        <button class="addLayer addOutline btn btn-primary" data-action="Outline">Add Outline</button>
                        <button class="saveAccent btn btn-primary" >Save Accent</button>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/accents.js"></script>
<script src="/js/administration/selectize.min.js"></script>
@endsection


