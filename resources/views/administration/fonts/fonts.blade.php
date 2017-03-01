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
                        <span class="fa fa-font"></span>
                        Fonts
                        <small>
                            <a href="/administration/font/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Font
                            </a>
                        </small>
                    </h1>

                    <h3>Sports</h3>
                    <div id="filterSports" class="col-md-12 button-group" style="margin-top: 10px;">
                         <button class="button btn-primary" data-filter="">All</button>
                         @foreach ($sports as $sport)
                             <button class="button" data-filter="{{ $sport->name }}">{{ $sport->name }}</button>
                         @endforeach 
                    </div>   
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>
                                <a href="#" class="btn btn-danger btn-xs multiple-delete-font" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove Checked
                                </a>
                            </th>
                            <th>Font Name</th>
                            <th>Tail Sweep</th>
                            <th>Script</th>
                            <th>Block Font</th>
                            <th>Sports</th>  
                            <th>Sample</th>
                            <th>Active Status</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($fonts as $font)

                        <tr class='font-{{ $font->id }} {{ (!$font->active) ? ' inactive' : '' }}'>
                            <td>
                                {{ $font->id }}
                            </td>

                             <td>
                                <div class="checkbox">
                                  <input type="checkbox" id="multipleDelete" name="remove[]" data-font-id="{{ $font->id }}" value="">
                                </div>
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
                             <td>
                                @if ($font->tail_sweep)
                                    Yes
                                @else
                                    No
                                @endif
                            </td>
                            <td>
                                @if ($font->script)
                                    Yes
                                @else
                                    No
                                @endif
                            </td>
                            <td>
                                @if ($font->block_font)
                                    Yes
                                @else
                                    No
                                @endif
                            </td>

                            <td  id ="sports-column">
                                {{ $font->sports }}
                            </td>
                            <td>
                                <span style="font-family: '{{ $font->name }}'; font-size: 30px;">
                                    {{ env('WEBSITE_NAME') }}
                                </span>
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