@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>{{ $user_pairings->name }} Items</h3>
                    <a href="/administration/user_pairings" class='btn btn-sm btn-default back'>
                        Back
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8' id='user_pairings_table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Pairing ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Saved Design ID</th>
                            <th>Front Thumbnail</th>
                            <th>Back Thumbnail</th>
                            <th>Left Thumbnail</th>
                            <th>Right Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($user_pairing_items as $item)
                        <tr class='user-pairing-item-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                              {{$item->user_pairing_id}}
                            </td>
                            <td>
                                {{$item->name}}
                            </td>
                             <td>
                                {{$item->type}}
                            </td>
                            <td>
                                {{$item->saved_design_id}}
                            </td>
                            <td>
                              <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->front_thumbnail_path }}">View</a>
                            </td>
                            <td>
                              <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->back_thumbnail_path }}">View</a>
                            </td>
                            <td>
                              <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->left_thumbnail_path }}">View</a>
                            </td>
                            <td>
                              <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->right_thumbnail_path }}">View</a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='9'>
                                No Record
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
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $('.file-link').on('click', function(){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }

});
</script>
@endsection
