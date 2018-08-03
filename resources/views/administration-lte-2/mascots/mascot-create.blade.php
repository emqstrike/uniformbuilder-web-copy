@extends('administration-lte-2.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-9 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading"><b>Add New mascot</b></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/mascot/add" enctype="multipart/form-data" id='create-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <div class="form-group">
                            <label class="col-md-3 control-label">Mascot Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-name" name="name" value="{{ old('name') }}" required="true">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-code" name="code" value="{{ old('code') }}" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Category</label>
                            <div class="col-md-6">
                                <select name='category' class="form-control mascot-category" required="true">
                                @foreach ($mascots_categories as $mascot_category)
                                    <option value='{{ $mascot_category }}'>{{ $mascot_category }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="">
                                <select name="sports[]" class="form-control sports" multiple="multiple" required="true">
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
                            <label class="col-md-3 control-label">Icon</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control icon" name="icon" accept="image/*" required="true">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control ai-file" name="ai_file" accept=".ai,.pdf" required="true">
                            </div>
                        </div>
                        <div class="form-group">
                                <label class="col-md-3 control-label">Brand</label>
                                <div class="col-md-6">
                                <select class="form-control brand" name="brand">
                                        <option value="prolook">Prolook</option>
                                        <option value="richardson">Richardson</option>
                                </select>
                              </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs btn-flat">Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
                                            <th>Team Color ID</th>
                                            <th>File</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="ma-team-color-id layer1" name="ma_team_color_id[]">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="file" class="ma-options-src layer1" name="ma_image[]" required="true">
                                            </td>
                                            <td>
                                                <select class="form-control ma-default-color layer1" name="default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                                @foreach ($colors as $color)
                                                    @if ($color->active)
                                                    <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                                        {{ $color->name }}
                                                    </option>
                                                    @endif
                                                @endforeach
                                                <option data-color="" value="" id="saved-default-color"></option>
                                                </select>
                                            </td>
                                            <td>
                                                <a class="btn btn-danger btn-xs btn-remove-layer btn-flat">Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary btn-flat create-mascot">
                                    Add Record
                                </button>
                                <a href="/administration/v1-0/mascots" class="btn btn-flat btn-danger">
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

@section('custom-scripts')
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
    });

    $('.sports').select2('val', sports);
});
</script>
@endsection