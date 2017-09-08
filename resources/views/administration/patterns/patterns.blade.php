@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<style type="text/css">
.onoffswitch {
    position: relative; width: 61px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 9px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 5px;
    background-color: #02C723; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 5px;
    background-color: #BF5050; color: #FFFFFF;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 1px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 37px;
    border: 2px solid #999999; border-radius: 9px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}
</style>
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Patterns
                        <small>
                            <a href="/administration/pattern/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Pattern
                            </a>
                        </small>
                    </h1>
                    <button class="button btn-primary filter" value=".all">All</button>
                    <button class="button filter" value=".web">Web</button>
                    <button class="button filter" value=".ipad">Ipad</button>
                    <button class="button filter" value=".team_stores">Team Stores</button>



       
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>
                                    <a href="#" class="btn btn-danger btn-xs multiple-delete-pattern" role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Remove Checked
                                    </a>
                                </th>
                                <th>Thumbnail</th>
                                <th>Pattern</th>
                                <th>Block Pattern Option</th>
                                 <th>Sports</th>
                                <th>Asset Target</th>
                                <th>Active</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="isotope">

                @forelse ($patterns as $pattern)

                    <tr class='pattern-{{ $pattern->id }} {{ (!$pattern->active) ? ' inactive' : '' }}{{ $pattern->asset_target }} all' >
                        <td>
                            {{ $pattern->id }}
                        </td>
                        <td>
                            <div class="checkbox">
                              <input type="checkbox" id="multipleDelete" name="remove[]" data-pattern-id="{{ $pattern->id }}" value="">
                            </div>
                        </td>

                        <td>
                            @if ($pattern->thumbnail_path)
                            <img src="{{ $pattern->thumbnail_path }}" width="100px" height="100px">
                            @else
                            <img src="http://dummyimage.com/100" width="100px" height="100px">
                            @endif
                        </td>
                        <td>
                            {{ $pattern->name }}
                        </td>
                        <td>
                            {{ $pattern->block_pattern_options }}
                        </td>
                        <td>

                           {{ $pattern->sports }}

                        </td>
                        
                        <td>
                            {{ $pattern->asset_target }}
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-pattern" id="switch-{{ $pattern->id }}" data-pattern-id="{{ $pattern->id }}" {{ ($pattern->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $pattern->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                            <!-- <a href="#" class="btn btn-default btn-xs disable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? : 'disabled="disabled"' }}>
                                <i class="glyphicon glyphicon-eye-close"></i>
                                Disable
                            </a>
                            <a href="#" class="btn btn-info btn-xs enable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-open"></i>
                                Enable
                            </a> -->
                        </td>
                        <td>
                            <a href="/administration/pattern/edit/{{ $pattern->id }}" class="btn btn-primary btn-xs edit-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-default btn-xs clone-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-copy"></i>
                                Clone
                            </a>
                            <a href="#" class="btn btn-danger btn-xs delete-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                        
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Patterns
                        </td>
                    </tr>

                @endforelse

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Information Modal -->

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $(document).on('click', '.filter', function() {
        $(".filter").removeClass('btn-primary');
        $(this).addClass('btn-primary').show;
        $(".all").fadeOut( "slow" );
        $($(this).val()).fadeIn( "slow" );
    });

});
</script>
@endsection