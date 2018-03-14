@extends('administration.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New preference</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/preference/add" enctype="multipart/form-data" id='create-preference-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="colors_properties" id="colors_properties">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Logo</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control logo-file" name="logo" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-name" name="name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">School</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-school-name" name="school_name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Team</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-team-name" name="team_name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot</label>
                            <div class="col-md-6">
                                <select class="form-control preference-mascot" id="preference_mascot">
                                </select>
                                <input type="hidden" id="mascot" name="mascot">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Font</label>
                            <div class="col-md-6">
                                <select name='font' class="form-control preference-font">
                                @foreach ($fonts as $font)
                                    <option value='{{ $font->name }}'>{{ $font->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name='uniform_category' class="form-control preference-uniform-category">
                                @foreach ($uniform_categories as $uniform_category)
                                <option value='{{ $uniform_category->id }}'>{{ $uniform_category->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Colors
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Color</a>
                            </div>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="sortable-colors">
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
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
                                                <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '2' class="layer-number">2</option>
                                                </select>
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
                                                <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '3' class="layer-number">3</option>
                                                </select>
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
                                                <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-preference">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Preference
                                </button>
                                <a href="/administration/preferences" class="btn btn-danger">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/ddslick.min.js"></script>
<script type="text/javascript" src="/js/administration/preferences.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    window.items = null;
    getMascots(function(items){
        console.log(items);
        window.items = items;
    });

    function getMascots(callback){
        var items;
        var url = "//" + api_host + "/api/mascots";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                items = data['mascots'];
                console.log("Mascots: "+items);
                if(typeof callback === "function") callback(items);
            }
        });
    }

    $.each(window.items, function(i, item) {
        item['text'] = item.name;
        item['value'] = item.id;
        item['selected'] = false;
        item['description'] = 'Mascot';
        item['imageSrc'] = item.icon;
    });

    var ddData = window.items;

    $('#preference_mascot').ddslick({
        data: ddData,
        width: 300,
        height: 300,
        imagePosition: "left",
        selectText: "Select Mascot",
        onSelected: function (data) {
            $('#mascot').val(data['selectedData']['value']);
        },
    });

    var length = $('.layers-row').length;
    renumberRows(length);
});
</script>
@endsection