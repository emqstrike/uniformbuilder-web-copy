@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

@endsection

@section('custom-styles')

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
                        Fabrics Master List
                    </h1>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts' id="fonts_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Factory</th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

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
