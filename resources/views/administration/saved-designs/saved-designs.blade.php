@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <i class="glyphicon glyphicon-blackboard"></i>
                        Saved Designs
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Block Pattern</th>
                            <th>Option</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Left</th>
                            <th>Right</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Date Saved</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($saved_designs as $design)
                        <tr class='design-{{ $design->id }}'>
                            <td>
                                {{ $design->id }}
                            </td>
                            <td>
                                {{ $design->name }}
                            </td>
                            <td>
                                {{ $design->sport }}
                            </td>
                            <td>
                                {{ $design->block_pattern }}
                            </td>
                            <td>
                                {{ $design->option }}
                            </td>
                            <td>
                               <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->front_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->front_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->back_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->back_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->left_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->left_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->right_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->right_thumbnail }}" height="100px" width="80px"> --}}
                            </td>
                            <td>
                                {{ $design->first_name }} {{ $design->last_name }}
                            </td>
                            <td>
                                {{ $design->email }}
                            </td>
                            <td>
                                {{ $design->created_at }}
                            </td>
                            <td>
                                <a href="http://customizer.prolook.com/my-saved-design/{{ $design->id }}" class="btn btn-primary btn-xs">View in Customizer</a>
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='6'>
                                No Designs
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
<script type="text/javascript" src="/js/administration/colors.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $('.file-link').on('click', function(e){
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
