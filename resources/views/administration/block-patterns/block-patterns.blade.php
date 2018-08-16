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
                        <span class="glyphicon glyphicon-star"></span>
                        Block Patterns
                        <br />
                        <small>
                            <a href="/administration/block_pattern/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add a block pattern
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Options</th>
                                <th>Thumbnail</th>
                                <th>Sport</th>
                                <th>Placeholder Overrides</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($block_patterns as $block_pattern)
                    <tr class='block-pattern-{{ $block_pattern->id }} {{ (!$block_pattern->active) ? ' inactive' : '' }}'>
                        <td>
                            {{ $block_pattern->name }}
                        </td>
                        <td class="neck-options-cell">
                            <input type="hidden" value="{{ $block_pattern->neck_options }}" class="neck-options-container">
                        </td>
                        <td>
                            <img class="img-thumbnail" src="{{ $block_pattern->thumbnail_path }}" style="height: 210px; width: 140px;">
                        <td>
                            {{ $block_pattern->uniform_category }}
                        </td>
                        <td>
                            @if( !isset($block_pattern->placeholder_overrides) || $block_pattern->placeholder_overrides == "" )
                            <div class="alert alert-danger">No</div>
                            @else
                            <div class="alert alert-success">Yes</div>
                            @endif
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-block-pattern" id="switch-{{ $block_pattern->id }}" data-block-pattern-id="{{ $block_pattern->id }}" {{ ($block_pattern->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $block_pattern->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <a href="/administration/block_pattern/edit/{{ $block_pattern->id }}" class="btn btn-primary btn-xs edit-block-pattern" data-block-pattern-id="{{ $block_pattern->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-block-pattern" data-block-pattern-id="{{ $block_pattern->id }}" data-block-pattern-name="{{ $block_pattern->name }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Block Patterns Found
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

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/block-patterns.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });

    @if (Session::has('message'))
    new PNotify({
        title: 'Success',
        text: "{{ Session::get('message') }}",
        type: 'success',
        hide: true
    });
@endif
});
</script>
@endsection
