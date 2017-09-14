@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}
.animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
}
.inputs {
    width: 45px;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h4>Edit Branding</h4></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/brandings/update" enctype="multipart/form-data" id='brandings_form'>
                        
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        
                        <input type="hidden" name="id" value="{{$brandings->id}}">                       
                          <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-4 material">
                                <input type="text" name="site_name" class="form-control" value="{{ $brandings->site_name }}">
                            </div>
                        </div>                      
                        <div class="form-group">
                            <label class="col-md-4 control-label">Logo</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control site_logo" name="site_logo" accept="image/*">
                                <input type="text" class="form-control site_logo_text" name="site_logo_text" value ="{{ $brandings->site_logo }}" readonly="true">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Primary Forecolor</label>
                            <div class="col-md-4 material">
                                <input id='colorpickerpf' />
                                <input type="text" name="primary_forecolor" id="primary-forecolor" class="form-control" value="#{{ $brandings->primary_forecolor }}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Secondary Forecolor</label>
                            <div class="col-md-4 material">
                                <input id='colorpickersf' />
                                <input type="text" name="secondary_forecolor" id="secondary-forecolor" class="form-control" value="#{{ $brandings->secondary_forecolor }}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Primary Background Color</label>
                            <div class="col-md-4 material">
                                <input id='colorpickerpbc' />
                                <input type="text" name="primary_background_color" id="primary-background-color" class="form-control" value="#{{ $brandings->primary_background_color }}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label">Secondary Background Color</label>
                            <div class="col-md-4 material">
                                <input id='colorpickersbc' />
                                <input type="text" name="secondary_background_color" id="secondary-background-color" class="form-control" value="#{{ $brandings->secondary_background_color }}">
                            </div>
                        </div>
                                          
                        <hr>
                                                       
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-brandings">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Information
                                </button>
                                <a href="/administration/brandings" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                        <br><br>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/libs/spectrum/spectrum.js"></script>
<script src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/js/administration/common.js"></script>
<script src="/jquery-ui/jquery-ui.min.js"></script>
<script src="/js/libs/select2/select2.min.js"></script>
<script src="/js/ddslick.min.js"></script>
<script src="/underscore/underscore.js"></script>
<script>
   
$(document).ready(function(){
    $('#colorpickerpf').spectrum({
        color: "#{{ $brandings->primary_forecolor }}",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#primary-forecolor').val(tinycolor);
        },
        hide: function(tinycolor) {
            $('#primary-forecolor').val(tinycolor);
        }
    });
    $('#colorpickersf').spectrum({
        color: "#{{ $brandings->secondary_forecolor }}",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#secondary-forecolor').val(tinycolor);
        },
        hide: function(tinycolor) {
            $('#secondary-forecolor').val(tinycolor);
        }
    });
    $('#colorpickerpbc').spectrum({
        color: "#{{ $brandings->primary_background_color }}",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#primary-background-color').val(tinycolor);
        },
        hide: function(tinycolor) {
            $('#primary-background-color').val(tinycolor);
        }
    });
    $('#colorpickersbc').spectrum({
        color: "#{{ $brandings->secondary_background_color }}",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#secondary-background-color').val(tinycolor);
        },
        hide: function(tinycolor) {
            $('#secondary-background-color').val(tinycolor);
        }
    });
});

</script>
@endsection
