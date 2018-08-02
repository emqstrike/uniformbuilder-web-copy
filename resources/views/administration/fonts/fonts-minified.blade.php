@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

@endsection

@section('custom-styles')

@foreach ($fonts as $font)
@font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
@endforeach

@endsection

@section('content')
<style type="text/css">
    .bootstrap-table{
    overflow-y: scroll;
    max-height: 636px;
}
</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Fonts
                        <small>
                            <a href="/administration/font/add" class='btn btn-md btn-success'>
                                Add
                            </a>
                        </small>
                    </h1>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts' id="fonts_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Font Name</th>
                            <th>Sports</th>
                            <th>Brand</th>
                            <th>Active</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($fonts as $font)

                        <tr class='font-{{ $font->id }} {{ (!$font->active) ? ' inactive' : '' }} {{ $font->brand }} all-brand'>
                            <td>
                                {{ $font->id }}
                            </td>
                            <td>
                                {{ $font->name }}<br />
                                @if ($font->type == 'default')
                                <span class="label label-info">
                                @else
                                <span class="label label-success">
                                @endif
                                    {{ $font->type }}
                                </span>
                            </td>
                            <td  id ="sports-column">
                                {{ $font->sports }}
                            </td>
                            <td id ="brand-column">
                                {{ $font->brand }}
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs disable-font" data-font-id="{{ $font->id }}" role="button" {{ ($font->active) ? : 'disabled="disabled"' }}>
                                    <i class="glyphicon glyphicon-eye-close"></i>
                                    Disable
                                </a>
                                <a href="#" class="btn btn-info btn-xs enable-font" data-font-id="{{ $font->id }}" role="button" {{ ($font->active) ? 'disabled="disabled"' : '' }}>
                                    <i class="glyphicon glyphicon-eye-open"></i>
                                    Enable
                                </a>
                            </td>
                            <td>
                                {{ $font->updated_at }}
                            </td>
                            <td>
                                <a href="/administration/font/edit/{{ $font->id }}" class="btn btn-primary btn-xs edit-font" data-font-id="{{ $font->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-font" data-font-id="{{ $font->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Fonts
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

<!-- Confirmation Modal -->
<div class="modal confirmation-modal" id="clone-confirmation-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">Message</div>
            <div class="modal-footer">
                <button class="btn btn-danger @if (isset($yes_class_name)) {{ $yes_class_name }} @else confirm-yes @endif" data-value=''
                @if (isset($attributes))
                    @if (count($attributes) > 0)
                        @foreach ($attributes as $attribute)
                            data-{{ $attribute }}=""
                        @endforeach
                    @endif
                @endif
                >
                    <li class="glyphicon glyphicon-ok"></li>
                    Yes
                </button>
                <button class="btn btn-default confirm-no" data-dismiss="modal">
                    <li class="glyphicon glyphicon-remove"></li>
                    No
                </button>
            </div>
        </div>
    </div>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/fonts.js"></script>
<script type="text/javascript">
$(document).ready(function(){
$("tr").each(function(i) {
    if( $(this).hasClass( "inactive" ) ){
        $(this).css('background-color', '#e8e8e8');
        // $(this).css('text-shadow', '1px 1px #000');
    }
});
    // $('.data-table').DataTable({
    //     "paging": true,
    //     "lengthChange": false,
    //     "searching": false,
    //     "ordering": true,
    //     "info": true,
    //     "autoWidth": false
    // });
});
</script>
@endsection
