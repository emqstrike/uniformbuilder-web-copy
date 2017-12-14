@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">    
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Item Sizes</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/item_size/update" enctype="multipart/form-data" id='item-size-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="id" value="{{ $item_sizes->id }}">
                        <input type="hidden" name="old_item_size_props" id="old_size_property" value="{{ $item_sizes->properties }}">
                        <input type="hidden" name="item_size_props" id="size_property">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                       <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control sport" name="sport">
                                    <option value="">None</option>
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->name }}' @if($sport->name == $item_sizes->sport) selected="selected"@endif>{{ $sport->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea name="description" class="form-control autosized"> {{$item_sizes->description}} </textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Properties</label>
                            <div class="col-md-6">
                                <a href="#" class="btn btn-success btn-xs add-edit-property">Add Property</a>
                            </div>
                            <div class="col-md-6">
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <thead>
                                            <th>Size</th>
                                            <th>Qx Item ID</th>
                                            <th>Action</th>
                                        </thead>
                                    </tr>
                                    <tbody class="property-body">
                                      
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-item-size">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Item Size
                                </button>
                                <a href="/administration/item_sizes" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
@endsection

@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){
 
    var sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL','3-5','5-7','8-12','13-14','Y Goalie','M Goalie','L Goalie','YXS','YS','YS/YM','YM','YL','YL/YXL','YXL','Y2XL','Y3XL','1 Size','22-30','32-44','46-54','24-34','36-48','50-54','30-36','38-42','22','23','24','24 (YXS)','25','26','26 (YS)','27','28','28 (YM)','29','30','31','32','32 (YL)','33','34','34 (YXL)','35','36','36 (S)','37','38','38 (M)','39','40','41','42','42 (L)','43','44','45','46','46 (XL)','47','48','49','50','50 (2XL)','51','52','53','54','54 (3XL)','26/YXS','28/YS','30/YM','32/YL','32/XS','34/YXL','34/S','36/M','40/L','44/XL','46/2XL'];
    var size_properties = {};
    var defaultElem  = $( ".prop-row:first" ).clone();
    $('.autosized').autosize({append: "\n"});  

    if ( $('#old_size_property').val() ){
            var data = JSON.parse($('#old_size_property').val());
            loadProperties(data);
    }

    $('.add-edit-property').on('click', function(e){
        e.preventDefault();
        var x  = $( ".prop-row:first" ).clone();          
        if(x.length > 0){
            $('.property-body').append(x);
        }      
        else {           
            loadDefault();
        }      
        deleteButton();  
        updateProperties();
    });
   
    function deleteButton(){
        $('.remove-prop').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateProperties();
        });
    }   

    function loadProperties(data)
    {
        data.forEach(function(entry, i) {
           var size = entry.size;
           var item_id = entry.qx_item_id;
           var x = `<tr class="prop-row">
                        <td>
                            <select class="form-control size-`+i+`" id="size">
                            </select>
                        </td>
                        <td>  
                            <input class="form-control qx-item-id" type="text" name="qx_item_id" id="qx-item-id" value="`+item_id+`">
                        </td>';
                        <td>
                            <a href='#' class='btn btn-xs btn-danger remove-prop'>
                                <span class='glyphicon glyphicon-remove'></span>
                            </a>
                        </td>
                    </tr>`;

           $('.property-body').append(x);

           var a = '.size-'+i;         

           selectedValues(a, size) ;
        });

    }

    function selectedValues(a, size){
        _.each(sizes, function(i){
            var elem = '<option value="' + i + '">' + i + '</option>';
            if(size === i){
                elem = '<option value="' + i + '" selected>' + i + '</option>';
            }
            $(a).append(elem);
        });
        deleteButton();       
        updateProperties();
    }     

    function updateProperties() {
      var data = [];
      $(".prop-row").each(function(i) {
            var temp = {
                "size" : $(this).find('#size').val(),
                "qx_item_id" : $(this).find('#qx-item-id').val()
            };
            data.push(temp);
            
        });
        console.log(JSON.stringify(data));
        $('#size_property').val(JSON.stringify(data));        
    }

    $("#item-size-form").on("change", "#size", function(e){
         updateProperties();
    });

    $("#item-size-form").on("keyup", "#qx-item-id", function(e){
         updateProperties();
    });

    $("#item-size-form").on("click", ".remove-prop", function(e){
         updateProperties();
    });

    function loadDefault() {
         var y = `<tr class="prop-row">
                        <td>
                            <select class="form-control size" id="size">
                            </select>
                        </td>
                        <td>  
                            <input class="form-control qx-item-id" type="text" name="qx_item_id" id="qx-item-id">
                        </td>';
                        <td>
                            <a href='#' class='btn btn-xs btn-danger remove-prop'>
                                <span class='glyphicon glyphicon-remove'></span>
                            </a>
                        </td>
                    </tr>`;

           $('.property-body').append(y);  
           initSizes();
    }

    function initSizes(){
        _.each(sizes, function(i){
            var elem = '<option value="' + i + '">' + i + '</option>';
            $('#size').append(elem);
        });
    }  
});

</script>
@endsection