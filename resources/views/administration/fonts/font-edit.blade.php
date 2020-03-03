@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
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

@section('custom-styles')

@foreach ($fonts as $fontItem)
@font-face { font-family: "{{ $fontItem->name }}"; src: url("{{ $fontItem->font_path }}"); }
@endforeach

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Font</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/font/update" enctype="multipart/form-data" id='edit-font-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">
                        <input type="hidden" name="font_id" value="{{ $font->id }}">
                        <input type="hidden" id="font_family" value="{{ $font->name }}">
                        <input type="hidden" id="old_font_size_tables" value="{{ $font->font_size_tables }}">
                        <input type="hidden" id="old_sublimated_font_size_tables" value="{{ $font->sublimated_font_size_tables }}">
                        <input type="hidden" id="font_size_tables" name="font_size_tables">
                        <input type="hidden" id="sublimated_font_size_tables" name="sublimated_font_size_tables">
                        <input type="hidden" id="existing-fonts-properties" value="{{ $font->font_properties }}">
                        <input type="hidden" name="font_properties" id="font_properties" value="">
                        <input type="hidden" name="old_font_path" id="old_font_path" value="{{ $font->font_path }}">
                        <input type="hidden" name="old_font_size_table" id="old_font_size_table" value="{{ $font->font_size_table }}">

                        <div class="form-group">
                            <div class="colr-md-6" align="center">
                                @if ($font->font_path)
                                <span style="font-family: '{{ $font->name }}'; font-size: 30px;">
                                    {{ $font->name }}<br>
                                    {{-- ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 --}}
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Name</label>
                            <div class="col-md-4">
                                <input type="name" class="form-control base-font-name" name="name" value="{{ $font->name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Alias</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control font-alias" name="alias" value="{{ $font->alias }}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-5 control-label">Tail Sweep</label>
                            <div class="col-md-4">

                                <input type="checkbox"  name="tail_sweep" @if($font->tail_sweep == 1)value="1" checked @endif>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Script</label>
                            <div class="col-md-4">

                                <input type="checkbox"  name="script" @if($font->script == 1)value="1" checked @endif>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Block Font</label>
                            <div class="col-md-4">

                                <input type="checkbox"  name="block_font" @if($font->block_font == 1)value="1" checked @endif>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">
                                Font File
                            </label>

                            <div class="col-md-4">
                                <input type="file" class="form-control font-file" name="font_path" accept="font/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Type</label>
                            <div class="col-md-4">
                                <select class="form-control" name='type'>
                                    <option value='default' @if ($font->type == 'default') selected @endif>Default</option>
                                    <option value='base' @if ($font->type == 'base') selected @endif>Base (IN) --- a child of a "default"-type font</option>
                                    <option value='outline' @if ($font->type == 'outline') selected @endif>Outline (OUT) --- a child of a "default"-type font</option>
                                    <option value='accent' @if ($font->type == 'accent') selected @endif>Accent (3D) --- a child of a "default"-type font</option>
                                    <option value='tail sweeps' @if ($font->type == 'tail sweeps') selected @endif>Tail Sweep --- a child of a "default"-type font</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Parent Font</label>
                            <div class="col-md-4">
                                <select class="form-control" name='parent_id'>
                                    <option value='0'>---</option>
                                @foreach ($fonts as $fontItem)
                                    <option value='{{ $fontItem->id }}' style="font-family: '{{ $fontItem->name }}'; font-size: 30px;" @if ($font->parent_id == $fontItem->id) selected @endif>{{ $fontItem->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Sports</label>
                            <div class="col-md-4">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="{{ $font->sports }}">
                                <select name="sports[]" class="form-control sports" multiple="multiple">
                                    @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label" >Brand</label>
                           <div class="col-md-4">
                                <select name="brand" class="form-control">
                                        <option value="none" @if($font->brand == "none") selected="selected"@endif>None</option>
                                        <option value="prolook" @if($font->brand == "prolook") selected="selected"@endif>Prolook</option>
                                        <option value="richardson" @if($font->brand == "richardson") selected="selected"@endif>Richardson</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Block Pattern</label>
                            <div class="col-md-4">
                                <input type="hidden" class="block-patterns-val" id="block_patterns_value" name="block_patterns_value" value="{{ $font->block_patterns }}">
                                <select name="block_patterns[]" class="form-control block-patterns" multiple="multiple">
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Target Block Pattern Option</label>
                            <div class="col-md-4">
                                <input type="hidden" class="block-pattern-options-val" id="block_pattern_options_value" name="block_pattern_options_value" value="{{ $font->block_pattern_options }}">
                                <select name="block_pattern_options[]" class="form-control block-pattern-options" multiple="multiple">
                                    {{-- @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach --}}
                                    <!-- <option value="All">All</option> -->
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Tail Sweep Properties</label>
                            <div class="col-md-4">
                                <textarea class="form-control tail-sweep-properties animated" name="tail_sweep_properties"><?php echo substr(stripslashes($font->tail_sweep_properties), 1, -1); ?></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Customizer Available</label>
                            <div class="col-md-4">
                                <input type="checkbox"  name="customizer_available" @if($font->customizer_available == 1)value="1" checked @endif>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Ipad Available</label>
                            <div class="col-md-4">
                                <input type="checkbox"  name="ipad_available" @if($font->ipad_available == 1)value="1" checked @endif>
                            </div>
                        </div>

                        <div class="form-group" style="border: 1px solid black; padding: 10px;">
                            <center>
                            <div style="max-width: 800px; max-height: 800px;">
                                <p id="p-text" style="font-family: {{ $font->name }}">Test</p>
                                Text: <input type="text" id="text-source">
                                Size: <input type="number" id="size-source" size="4">
                                <a href="#" class="btn btn-success preview-button">Preview</a>
                            </div>
                            </center>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12">
                                <table class="table table-bordered">
                                    <tr colspan="12"><center><h3>Font Size Table</h3></center></tr>
                                    <tr class="input-size-header">
                                    </tr>
                                    <tr class="output-size-row">
                                    </tr>
                                </table>
                                <input type="hidden" name="font_size_table" id="font_size_table">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <table class="table table-bordered" id="fst-updater">
                                <a href="#" data-toggle="tooltip" data-message="Bulk update for font size tables values."><span class="glyphicon glyphicon-info-sign"></span></a>
                                    <thead>
                                        <tr>
                                            <td>Application #</td>
                                            <td>Perspective</td>
                                            <td>Action</td>
                                            <td>Affected Columns</td>
                                            <td>Value</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="number" id="fst-update-app-num">
                                            </td>
                                            <td>
                                                <select id="fst-update-perspective">
                                                    <option value="all">All</option>
                                                    <option value="front">Front</option>
                                                    <option value="back">Back</option>
                                                    <option value="left">Left</option>
                                                    <option value="right">Right</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select id="fst-update-action">
                                                    <option value="add">Add</option>
                                                    <option value="subtract">Subtract</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="checkbox" class="cbx" data-field=".input-size"> Input Size </br>
                                                <input type="checkbox" class="cbx" data-field=".output-size"> Output Size </br>
                                                <input type="checkbox" class="cbx" data-field=".x-offset"> X Offset </br>
                                                <input type="checkbox" class="cbx" data-field=".y-offset"> Y Offset </br>
                                                <input type="checkbox" class="cbx" data-field=".x-scale"> X Scale </br>
                                                <input type="checkbox" class="cbx" data-field=".y-scale"> Y Scale </br>
                                            </td>
                                            <td>
                                                <input type="number" step="any" id="fst-update-value">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">
                                                    <a href="#" class="btn btn-primary btn-xs pull-right update-fst">Update</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-2 col-md-offset-5">
                            <table class="table table-bordered">
                                <tr>
                                    <td>Show Twill</td>
                                    <td>
                                        <input type="checkbox" class="show-twill">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Show Sublimated</td>
                                    <td>
                                        <input type="checkbox" class="show-sublimated">
                                    </td>
                                </tr>
                            </table>
                            </div>
                        </div>

                    <div class="form-group twill-fst"> <!-- START -->
                        
                        <h2 style="margin-top: 0;" class="text-center"><a href="#font-twill"class="collapse-fonts label label-primary" data-toggle="collapse">Twill Font Size Tables </a></h2>
                        <hr>
                        
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <table class="table">
                                    <tr>
                                        <td>
                                            <a data-toggle="modal" href="#myModal" class="btn btn-xs btn-primary">Copy data</a>
                                        </td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs reset-fst pull-right">Reset Font Size Tables data</a>
                                        </td>
                                        <td>
                                            <textarea id="fst-fix"></textarea></br><a href="#" class="fix-fst-button btn btn-xs btn-primary">Apply New Data</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div id="font-twill" class="collapse">
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Front</h3><a href="#" class="btn btn-xs btn-primary add-font-size" data-perspective="front"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application # <a href="#" data-toggle="tooltip" data-message="Optional. Used to match input size to an application point."><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Input Size <a href="#" data-toggle="tooltip" data-message="Actual size (inches)"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Output Size <a href="#" data-toggle="tooltip" data-message="Override - Size that will appear in customizer (used to correct display ratio)"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>X Offset <a href="#" data-toggle="tooltip" data-message="Horizontal Offset"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Y Offset <a href="#" data-toggle="tooltip" data-message="Vertical Offset"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>X Scale <a href="#" data-toggle="tooltip" data-message="Horizontal Scale"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Y Scale <a href="#" data-toggle="tooltip" data-message="Vertical Scale"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                            </tr>
                                        </thead>
                                        <tbody class="front-fst-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Back</h3><a href="#" class="btn btn-xs btn-primary add-font-size" data-perspective="back"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="back-fst-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Left</h3><a href="#" class="btn btn-xs btn-primary add-font-size" data-perspective="left"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="left-fst-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Right</h3><a href="#" class="btn btn-xs btn-primary add-font-size" data-perspective="right"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="right-fst-body">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> <!-- END -->
                    <div class="form-group sublimated-fst"> <!-- START -->
                        <h2 style="margin-top: 0;" class="text-center"><a href="#font-subli" class="collapse-fonts  label label-info" data-toggle="collapse">Sublimated Font Size Tables </a> </h2>
                        <hr>
                        <!-- <div class="form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <center><a data-toggle="modal" href="#myModalB" class="btn btn-xs btn-primary">Copy data</a></center>
                                <a href="#" class="btn btn-warning btn-xs reset-sublimated-fst pull-right">Reset Sublimated Font Size Tables data</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea id="fst-fix-sublimated"></textarea></br><a href="#" class="fix-fst-sublimated-button btn btn-xs btn-primary">Apply New Data</a>
                        </div> -->
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-3">
                                <table class="table">
                                    <tr>
                                        <td>
                                            <a data-toggle="modal" href="#myModalB" class="btn btn-xs btn-primary">Copy data</a>
                                        </td>
                                        <td>
                                            <a href="#" class="btn btn-warning btn-xs reset-sublimated-fst pull-right">Reset Font Size Tables data</a>
                                        </td>
                                        <td>
                                            <textarea id="fst-fix-sublimated"></textarea></br><a href="#" class="fix-fst-sublimated-button btn btn-xs btn-primary">Apply New Data</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <div id="font-subli" class="collapse">
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Front</h3><a href="#" class="btn btn-xs btn-primary add-font-size-sublimated" data-perspective="front"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application # <a href="#" data-toggle="tooltip" data-message="Optional. Used to match input size to an application point."><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Input Size <a href="#" data-toggle="tooltip" data-message="Actual size (inches)"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Output Size <a href="#" data-toggle="tooltip" data-message="Override - Size that will appear in customizer (used to correct display ratio)"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>X Offset <a href="#" data-toggle="tooltip" data-message="Horizontal Offset"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Y Offset <a href="#" data-toggle="tooltip" data-message="Vertical Offset"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>X Scale <a href="#" data-toggle="tooltip" data-message="Horizontal Scale"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                                <th>Y Scale <a href="#" data-toggle="tooltip" data-message="Vertical Scale"><span class="glyphicon glyphicon-info-sign"></span></a></th>
                                            </tr>
                                        </thead>
                                        <tbody class="front-fst-body-sublimated">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Back</h3><a href="#" class="btn btn-xs btn-primary add-font-size-sublimated" data-perspective="back"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="back-fst-body-sublimated">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Left</h3><a href="#" class="btn btn-xs btn-primary add-font-size-sublimated" data-perspective="left"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="left-fst-body-sublimated">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-3">
                                <h3>Right</h3><a href="#" class="btn btn-xs btn-primary add-font-size-sublimated" data-perspective="right"><span class="glyphicon glyphicon-plus"></span></a>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Application Number</th>
                                                <th>Input Size</th>
                                                <th>Output Size</th>
                                                <th>X Offset</th>
                                                <th>Y Offset</th>
                                                <th>X Scale</th>
                                                <th>Y Scale</th>
                                            </tr>
                                        </thead>
                                        <tbody class="right-fst-body-sublimated">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> <!-- END -->
                        <hr>
                        <div class="form-group">
                            <label class="col-md-2 control-label">Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-10">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Font Name</th>
                                            <th>Upload New Font File</th>
                                            <th>Font Type</th>
                                            <th>Parent Font</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="sortable-rows">
                                        <!-- </tr> -->
                                        <tr id="static_row">
                                            <td>
                                                <select class="fo-layer layer1"  name="fo_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="name" class="form-control fo-name layer1" name="fo_name[]" value="">
                                            </td>
                                            <td>
                                                <input type="file" class="fo-file layer1" name="fo_file[]">
                                            </td>
                                            <td>
                                                <select class="form-control fo-type layer1" name='fo_type[]'>
                                                    <option value='default'>Default</option>
                                                    <option value='base'>Base (IN) --- a child of a "default"-type font</option>
                                                    <option value='outline'>Outline (OUT) --- a child of a "default"-type font</option>
                                                    <option value='accent'>Accent (3D) --- a child of a "default"-type font</option>
                                                    <option value='tail sweeps'>Tail Sweep --- a child of a "default"-type font</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control fo-parent layer1" name='fo_parent[]'>
                                                    <option value='0'>---</option>
                                                @foreach ($fonts as $font)
                                                    <option value='{{ $font->id }}' style="font-family: '{{ $font->name }}'; font-size: 30px;">{{ $font->name }}</option>
                                                @endforeach
                                                </select>
                                            </td>
                                            <td>
                                                <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Uniform font
                                </button>
                                <a href="/administration/fonts" class="btn btn-danger">
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
    <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4> Twill Font size tables data</h4>
        </div>
        <div class="modal-body">
          <form role="form">
            <div>
              <textarea class="fst-data-field form-control animated"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="myModalB" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4> SUBLIMATED Font size tables data</h4>
        </div>
        <div class="modal-body">
          <form role="form">
            <div>
              <textarea class="fst-sublimated-data-field form-control animated"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/fonts.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    var fields = []; // to be used in fst updater
    window.backup = null;
    window.sublimated_backup = null;
    window.block_patterns = null;

    getBlockPatterms(function(block_patterns){ window.block_patterns = block_patterns; });

    function getBlockPatterms(callback){
        var block_patterns;
        var url = "//" +api_host+ "/api/block_patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }
    var cond = false;
    console.log(window.block_patterns);
    bindBPOS(cond);
    function bindBPOS(cond){
        if( cond ){
            var sports = $('.sports-val').val().split('"').join('');
        } else {
            var sports = $('.sports-val').val().slice(1, -1).split('"').join('');
        }
        var sports_arr = null;
        var block_pattern_options = [];
        console.log('[[SPORTS]]');
        console.log(sports);
        if(sports != null){
            sports_arr = sports.split(",");
            console.log(sports_arr);
            sports_arr.forEach(function(entry) {
                console.log('ENTRY: ' + entry);
                var x = _.filter(window.block_patterns, function(e){ return e.uniform_category == entry; });
                console.log(x);
                x.forEach(function(entry) {
                    var y = JSON.parse(entry.neck_options);

                    var list = [];
                    _.each(y, function(item){
                        list.push(_.omit(item, 'children'));
                        list.push(_.flatten(_.pick(item, 'children')));
                    });
                    var result = _.flatten(list);
                    result.forEach(function(i) {
                        block_pattern_options.push(i.name);
                    });
                });

            });
            var z = _.sortBy(_.uniq(block_pattern_options));
            $('.block-pattern-options').html('');
            z.forEach(function(i) {
                $('.block-pattern-options').append('<option value="'+i+'">'+i+'</option>');
            });
        }

    }

    bindBPs(cond);
    function bindBPs(cond){
        console.log('>>>>>>>>>>>>>>>>>>>> Bind Block Patterns');
        if( cond ){
            var sports = $('.sports-val').val().split('"').join('');
        }else {
            var sports = $('.sports-val').val().slice(1, -1).split('"').join('');
        }
        var sports_arr = null;
        var block_patterns = [];

        console.log(sports);
        if(sports != null){
            sports_arr = sports.split(",");

            sports_arr.forEach(function(entry) {

                var x = _.filter(window.block_patterns, function(e){ return e.uniform_category == entry; });

                x.forEach(function(entry) {
                    block_patterns.push(entry.name);
                });
            });
            var z = _.sortBy(_.uniq(block_patterns));
            $('.block-patterns').html('');
            z.forEach(function(i) {
                $('.block-patterns').append('<option value="'+i+'">'+i+'</option>');
            });
        }

    }

    if($('#block_patterns_value').val()){

        var x = $('#block_patterns_value').val().split(",");
        console.log('[[BLOCK PATTERNS]]');
        console.log(x);
        var bps = x;
    }


    $('.block-patterns').select2({
        placeholder: "Select block patterns",
        multiple: true,
        allowClear: true
    });

    $(".block-patterns").change(function() {
        $('#block_patterns_value').val($(this).val());
    });

    $('.block-patterns').select2('val', bps);

    if($('#block_pattern_options_value').val()){

        var xx = $('#block_pattern_options_value').val().split(",");
        console.log('[[BLOCK PATTERN OPTIONS]]');
        console.log(xx);
        var bpos = xx;
    }

    $('.block-pattern-options').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $(".block-pattern-options").change(function() {
        $('#block_pattern_options_value').val($(this).val());
    });

    $('.block-pattern-options').select2('val', bpos);

    $( "#static_row" ).hide();

    $('.animated').autosize({append: "\n"});

    if($('#sports_value').val()){
        var sports = JSON.parse($('#sports_value').val());
    }
    var fstbls = $('#old_font_size_tables').val();
    if(fstbls != ""){
        var old_font_size_tables = JSON.parse(fstbls);
        window.backup = old_font_size_tables;

        old_font_size_tables.forEach(function(entry) {

            var tbl_class = '.'+entry.perspective+'-fst-body';
            entry.sizes.forEach(function(item) {

                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
            refreshMultipleFST();

        });
    }

    var sblmtdfstbls = $('#old_sublimated_font_size_tables').val();
    if(sblmtdfstbls != ""){
        var old_font_size_tables = JSON.parse(sblmtdfstbls);
        window.sublimated_backup = old_font_size_tables;

        old_font_size_tables.forEach(function(entry) {

            var tbl_class = '.'+entry.perspective+'-fst-body-sublimated';
            entry.sizes.forEach(function(item) {

                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
            refreshMultipleSublimatedFST();

        });
    }

    $("#edit-font-form").on("keyup", ".inputs", function(e){
        refreshMultipleFST();
        refreshMultipleSublimatedFST();
    });

    $("#edit-font-form").on("change", ".inputs", function(e){
        refreshMultipleFST();
        refreshMultipleSublimatedFST();
    });

    function refreshMultipleFST(){
        var data = [];
        var perspectives = ["front", "back", "left", "right"];
        perspectives.forEach(function(entry) {
            var perspectiveData = {
                "perspective" : entry
            };
            var temp = [];
            var elem_class = '.'+entry+'-fst-body tr';

            $(elem_class).each(function(i) {

                var x = {
                    "inputSize" : $(this).find('.input-size').val(),
                    "outputSize" : $(this).find('.output-size').val(),
                    "x_offset" : $(this).find('.x-offset').val(),
                    "y_offset" : $(this).find('.y-offset').val(),
                    "x_scale" : $(this).find('.x-scale').val(),
                    "y_scale" : $(this).find('.y-scale').val(),
                    "application_number" : $(this).find('.application-number').val()
                };

                temp.push(x);
            });
            perspectiveData.sizes = temp;
            data.push(perspectiveData);

        });
        $('#font_size_tables').val(JSON.stringify(data));
        $('.fst-data-field').text(JSON.stringify(data));
        $('.animated').autosize({append: "\n"});
    }

    function refreshMultipleSublimatedFST(){
        var data = [];
        var perspectives = ["front", "back", "left", "right"];
        perspectives.forEach(function(entry) {
            var perspectiveData = {
                "perspective" : entry
            };
            var temp = [];
            var elem_class = '.'+entry+'-fst-body-sublimated tr';

            $(elem_class).each(function(i) {

                var x = {
                    "inputSize" : $(this).find('.input-size').val(),
                    "outputSize" : $(this).find('.output-size').val(),
                    "x_offset" : $(this).find('.x-offset').val(),
                    "y_offset" : $(this).find('.y-offset').val(),
                    "x_scale" : $(this).find('.x-scale').val(),
                    "y_scale" : $(this).find('.y-scale').val(),
                    "application_number" : $(this).find('.application-number').val()
                };

                temp.push(x);
            });
            perspectiveData.sizes = temp;
            data.push(perspectiveData);

        });
        $('#sublimated_font_size_tables').val(JSON.stringify(data));
        $('.fst-sublimated-data-field').text(JSON.stringify(data));
        $('.animated').autosize({append: "\n"});
    }

    $("#edit-font-form").on("click", ".fix-fst-sublimated-button", function(e){
        e.preventDefault();
        console.log('before clear');
        $('.front-fst-body-sublimated').html('');
        $('.back-fst-body-sublimated').html('');
        $('.left-fst-body-sublimated').html('');
        $('.right-fst-body-sublimated').html('');
        console.log('after clear');
        var old_font_size_tables = JSON.parse($('#fst-fix-sublimated').val());
        console.log($('#fst-fix-sublimated').val());
        window.sublimated_backup = old_font_size_tables;
        console.log(old_font_size_tables);
        old_font_size_tables.forEach(function(entry) {
            var tbl_class = '.'+entry.perspective+'-fst-body-sublimated';
            entry.sizes.forEach(function(item) {
                console.log(item.inputSize);
                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
        });
        refreshMultipleSublimatedFST();
    });

    $("#edit-font-form").on("click", ".fix-fst-button", function(e){
        e.preventDefault();
        $('.front-fst-body').html('');
        $('.back-fst-body').html('');
        $('.left-fst-body').html('');
        $('.right-fst-body').html('');
        var old_font_size_tables = JSON.parse($('#fst-fix').val());
        console.log($('#fst-fix').val());
        window.backup = old_font_size_tables;
        console.log(old_font_size_tables);
        old_font_size_tables.forEach(function(entry) {
            var tbl_class = '.'+entry.perspective+'-fst-body';
            entry.sizes.forEach(function(item) {
                console.log(item.inputSize);
                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
        });
        refreshMultipleFST();
    });

    $("#edit-font-form").on("click", ".reset-fst", function(e){
        e.preventDefault();
        $('.front-fst-body').html('');
        $('.back-fst-body').html('');
        $('.left-fst-body').html('');
        $('.right-fst-body').html('');
        window.backup.forEach(function(entry) {
            var tbl_class = '.'+entry.perspective+'-fst-body';
            entry.sizes.forEach(function(item) {
                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
        });
        refreshMultipleFST();
    });

    $("#edit-font-form").on("click", ".reset-sublimated-fst", function(e){
        e.preventDefault();
        $('.front-fst-body-sublimated').html('');
        $('.back-fst-body-sublimated').html('');
        $('.left-fst-body-sublimated').html('');
        $('.right-fst-body-sublimated').html('');
        window.sublimated_backup.forEach(function(entry) {
            var tbl_class = '.'+entry.perspective+'-fst-body-sublimated';
            entry.sizes.forEach(function(item) {
                var elem = '<tr data-app-num="'+item.application_number+'" data-perspective="'+entry.perspective+'"><td><input type="number" step="any" class="inputs application-number" value="'+item.application_number+'"></td><td><input type="number" step="any" class="inputs input-size" value="'+item.inputSize+'"></td><td><input type="number" step="any" class="inputs output-size" value="'+item.outputSize+'"></td><td><input type="number" step="any" class="inputs x-offset" value="'+item.x_offset+'"></td><td><input type="number" step="any" class="inputs y-offset" value="'+item.y_offset+'"></td><td><input type="number" step="any" class="inputs x-scale" value="'+item.x_scale+'"></td><td><input type="number" step="any" class="inputs y-scale" value="'+item.y_scale+'"></td><td><a href="#" class="btn btn-xs btn-danger remove-layer">Remove</a></td></tr>';
                $(tbl_class).append(elem);
            });
        });
        refreshMultipleSublimatedFST();
    });

    $("#fst-updater").on("click", ".update-fst", function(e){
        e.preventDefault();

        var app_num = $("#fst-update-app-num").val();
        var action = $("#fst-update-action").val();
        var value = parseFloat($("#fst-update-value").val());
        var perspective = $("#fst-update-perspective").val();
        $("tr").each(function(i) {
            var elem = $(this);
            if(perspective == "all"){
                if($(this).data("app-num") == app_num){

                    fields.forEach(function(entry) {
                        var new_val = null;
                        var p_val = parseFloat(elem.find(entry).val());
                        console.log('P_VAL>'+p_val);
                        if(action == "add"){
                            new_val = p_val + value;
                            elem.find(entry).val(new_val);
                        } else {
                            new_val = p_val - value;
                            elem.find(entry).val(new_val);
                        }
                    });
                }
            } else {
                if($(this).data("app-num") == app_num && $(this).data("perspective") == perspective){

                    fields.forEach(function(entry) {
                        var new_val = null;
                        var p_val = parseFloat(elem.find(entry).val());
                        console.log('P_VAL>'+p_val);
                        if(action == "add"){
                            new_val = p_val + value;
                            elem.find(entry).val(new_val);
                        } else {
                            new_val = p_val - value;
                            elem.find(entry).val(new_val);
                        }
                    });
                }
            }
        });
        refreshMultipleFST();
    });

    $("#fst-updater").on("change", ".cbx", function(e){
        fields = [];
        $(".cbx").each(function(i) {
            if($(this).is(":checked")){
                fields.push($(this).data('field'));
            }
        });
        console.log(fields);
    });

    $("#edit-font-form").on("click", ".remove-layer", function(e){
        e.preventDefault();
        $(this).parent().parent().remove();
        refreshMultipleFST();
        refreshMultipleSublimatedFST();
    });

    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
        cond = true;
        bindBPs(cond);
        bindBPOS(cond);
    });

    $('.sports').select2('val', sports);

    $(document).on('change', 'input, select', function() {
        var newLength = $('.layers-row').length;
        renumberRows(newLength);
    });''

    $( "tbody" ).disableSelection();
    $( "tbody.sortable-rows" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length = length-1;
            });
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        }
    });

    $(document).on('click', '.clone-row', function() {
        console.log('clone');
        if( $( ".layers-row" ).length ){
            console.log('IF');
            try{
            $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
            } catch(err){
                console.log(err.message);
            }
        } else {
            console.log('ELSE');
            try{
                $( "#static_row" ).show();
                var elemX = $( "#static_row" ).clone()
                elemX.addClass('layers-row').removeAttr('id').clone().appendTo( "#layers-row-container" );
                $( "#static_row" ).remove();
            } catch(err){
                console.log(err.message);
            }
        }


        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length--;
        });

        $(document).on('change', 'input, select', function() {
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        });

        var newLength = $('.layers-row').length;
    });

    buildLayers();
    function buildLayers(){
        existing_fonts_properties = $('#existing-fonts-properties').val();
        var myJson = JSON.parse(existing_fonts_properties);
        var length = Object.keys(myJson).length;

        var length = Object.keys(myJson).length - 1;

        window.fonts = null;
        getFonts(function(fonts){
            window.fonts = fonts;
        });

        function getFonts(callback){
            var mascots;
            var url = "//" +api_host+ "/api/fonts";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    fonts = data['fonts'];
                    if(typeof callback === "function") callback(fonts);
                }
            });
        }

        while(length > 0) {
            $(document).on('change', function() {
                var length = $('.layers-row').length;
                renumberRows(length);
            });
            var open = "<tr class=\"layers-row\">";
            var layer = "<td><select class=\"fo-layer layer"+length+"\"  name=\"fo_layer[]\" disabled><option value = '"+length+"' class=\"layer-number\">"+length+"</option></select></td>";

            var type_options = '';
            var fonts_options = '';

            var typeValues = ["default", "base", "outline", "accent", "tail"];
            var typeTexts = [
                    "Default",
                    "Base (IN) --- a child of a 'default'-type font",
                    "Outline (OUT) --- a child of a 'default'-type font",
                    "Accent (3D) --- a child of a 'default'-type font",
                    "Tail Sweep --- a child of a 'default'-type font"
                ];

            $.each(typeValues, function(entryIndex, entry) {
                if(entry == myJson[length].type){
                    type_options += '<option value="' + typeValues[entryIndex] + '" selected>' + typeTexts[entryIndex] + '</option>'
                } else {
                    type_options += '<option value="' + typeValues[entryIndex] + '">' + typeTexts[entryIndex] + '</option>'
                }
            });

            $.each(window.fonts, function(i, item) {
                if(item.id == myJson[length].parent_id){
                    fonts_options += '<option value="' + item.id + '" style="font-family: ' + item.name + '; font-size: 30px;" selected>' + item.name + '</option>'
                } else {
                    fonts_options += '<option value="' + item.id + '" style="font-family: ' + item.name + '; font-size: 30px;">' + item.name + '</option>'
                }
            });

            var name = '<td><input type="text" class="fo-name layer' + length + '" name="fo_name[]" value="' + myJson[length].name + '"></td>';
            var file = '<td><input type="file" class="fo-file layer"' + length + '" name="fo_file[]"></td>';
            var file_ref = '<input type="hidden" class="fo-file-ref layer' + length + '" value="' + myJson[length].font_path + '">';
            var type = '<td><select name="fo_type[]" class="fo-type layer"' + length + '">"' + type_options + '"</select></td>';
            var parent_font = '<td><select name="fo_parent[]" class="fo-parent layer"' + length + '">"' + fonts_options + '"</select></td>';

            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+name+file+file_ref+type+parent_font+remove+close);
            length--;
        }
    }

    function renumberRows(length){
        layers_properties = {};
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".fo-layer.layer" + length;

            layers_properties[length] = {};
            layers_properties[length]['name'] = {};
            layers_properties[length]['font_path'] = {};
            layers_properties[length]['type'] = {};
            layers_properties[length]['parent_id'] = {};

            $(this).find('.fo-layer').removeClass().addClass("fo-layer");
            $(this).find('.fo-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('fo-layer');

            $(this).find('.fo-name').removeClass().addClass("fo-name");
            $(this).find('.fo-name').addClass(thisLayer);
            var name_class = ".fo-name.layer" + length;
            $(this).find(name_class).addClass('fo-name');

            $(this).find('.fo-file-ref').removeClass().addClass("fo-file-ref");
            $(this).find('.fo-file-ref').addClass(thisLayer);
            var file_class = ".fo-file-ref.layer" + length;
            $(this).find(file_class).addClass('fo-file-ref');

            $(this).find('.fo-type').removeClass().addClass("fo-type");
            $(this).find('.fo-type').addClass(thisLayer);
            var type_class = ".fo-type.layer" + length;
            $(this).find(type_class).addClass('fo-type');

            $(this).find('.fo-parent').removeClass().addClass("fo-parent");
            $(this).find('.fo-parent').addClass(thisLayer);
            var parent_class = ".fo-parent.layer" + length;
            $(this).find(parent_class).addClass('fo-parent');

            layers_properties[length]['name'] = $(this).find(name_class).val();
            layers_properties[length]['font_path'] = $(this).find(file_class).val();
            layers_properties[length]['type'] = $(this).find(type_class).val();
            layers_properties[length]['parent_id'] = $(this).find(parent_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        console.log('Font PROP >> '+layersProperties);
        window.lp = layersProperties;
        $('#font_properties').val(layersProperties);
    }

    $(document).on('click', '.btn-remove-layer', function() {
        var rowCount = $('.layers-row').length;
        console.log('rowCount ', rowCount);
        
        if (rowCount > 1) {
            $(this).closest('tr').remove();
            var newRowCount = $('.layers-row').length;

            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(newRowCount);
                $(this).find(".layer-number").val(newRowCount);
                newRowCount--;
            });
        }
    });
});
</script>
@endsection
