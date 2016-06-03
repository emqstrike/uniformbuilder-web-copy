@extends('administration.lte-main')





@section('content')
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

<style id="fonts">

</style>
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
               <div class="panel-heading">Modify Accent</div>
                <div class="panel-body">
                    <div class="col-md-5 canvasContainer">
                        <canvas id="canvas" width="400" height="400" style="border:1px solid black"/>

                        </canvas>

                     <!--    <canvas id="canvas2" width="400" height="400" style="border:1px solid black"/>

                        </canvas> -->
                    </div>
                    <div class="col-md-7">
                            <form method="POST" action="/administration/accent/update" enctype="multipart/form-data">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="accent_id" value="{{ $accent->id }}">
                        
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Font : </label>
                                    <select class="selectFont" style="font-family: 'Bean Town';">
                                        <option value="Times New Roman" style="font-family:Times New Roman">Times New Roman</option>
                                        </select>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Name : </label>
                                     <input type="text"  value="{{ $accent->name }}" class="form-control inputText" id="fName" name="name" placeholder="">
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Code : </label>
                                     <input type="text" value="{{ $accent->code }}" name="code" class="form-control" id="fCode" placeholder="">
                                </fieldset>
                                 <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Thumbnail : </label>
                                      <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                </fieldset>

                               
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Size : </label>
                                     <input type="number" value="150"  class="form-control fontSize" id="fSize" placeholder="">
                                </fieldset>
                                <input type="hidden" class="accent_properties" name="accent_properties" >
                                <table class="layoutTable table table-bordered">
                                    <thead><th>Name</th><th>Color</th><th>Layer</th><th>Z - Index</th><th>x</th><th>y</th><th>Stroke</th><th>Remarks</th></thead>
                                    
                                        <tr class="selectAllLayer" id = "Base_Color">
                                            <td class="layerName">Base Color</td>
                                            <td class="layerColor">
                                                <select class="selectColor" data-name_color="base">
                                            

                                                </select>
                                            </td>
                                            <td class="layerNumber">
                                                <input type="number" value="1" disabled='disabled'>
                                            </td>
                                            <td class="layerZindex">
                                                <input type="number" disabled='disabled'>
                                            </td>
                                            <td class="layerX">
                                                <input type="text">
                                            </td>
                                            <td class="layerY">
                                               <input type="text">
                                            </td>
                                             <td class="layerStroke">
                                               <input type="number" max="0" disabled="diabled">
                                            </td>
                                            <td></td>
                                        </tr>
                                    <tbody class="sortable-rows" data-value="{{$accent->accent_properties}}">

                                    </tbody>
                                        <tr class="selectAllLayer" id="Mask">
                                            <td class="layerName">Mask</td>
                                            <td class="layerColor">
                                                <select class="selectColor" data-name_color="mask">
                                         
                                                </select>
                                            </td>
                                            <td class="layerNumber">
                                                <input type="number" value="1" disabled='disabled'>
                                            </td>
                                            <td class="layerZindex">
                                                <input type="number" disabled='disabled'>
                                            </td>
                                            <td class="layerX">
                                                <input type="text">
                                            </td>
                                            <td class="layerY">
                                               <input type="text">
                                            </td>
                                             <td class="layerStroke">
                                               <input type="number" max="0" disabled="diabled">
                                            </td>
                                            <td></td>
                                                                                                                  
                                         
                                </table>

                                   
                               
                                <button class="btn btn-primary submitAccent" style="display:none">Update Accent</button>
                            </form>

                            <button class="addLayer addShadow btn btn-primary" data-action="Shadow">Add Shadow</button>
                            <button class="addLayer addOutline btn btn-primary" data-action="Outline">Add Outline</button>
                            <button class="saveAccent btn btn-primary" >Save Accent</button>
                          

                              <!--   <table class="accentTable table table-bordered">
                                <thead><th>Font</th><th>Name</th><th>Code</th><th>Size</th><th>Remarks</th><th>Accent</th></thead>
                                </table>
 -->

                            
                        
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection


@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>


<script type="text/javascript" src="/js/administration/accents-edit.js"></script>

@endsection


