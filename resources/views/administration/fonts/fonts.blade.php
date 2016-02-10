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
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered fonts'>
                    <thead>
                        <tr>
                            <th>Font Name</th>
                            <th>Sample</th>
                            <th>Active Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($fonts as $font)

                        <tr class='font-{{ $font->id }} {{ (!$font->active) ? ' inactive' : '' }}'>
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
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection