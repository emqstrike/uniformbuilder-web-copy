@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Mascots Categories
                        <br />
                        <small>
                            <a href="/administration/mascots_categories/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot Category
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                {{-- @forelse ($mascots as $mascot) --}}

                   

                {{-- @empty --}}

                    <!-- <tr>
                        <td colspan='3'>
                            No Mascots
                        </td>
                    </tr> -->

                {{-- @endforelse --}}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Information Modal -->
<div class="modal fade" id="view-mascot-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-mascot-layers" data-toggle="tab">Layers</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layers" align='center'>
                            <span class="badge mascot-layers-path"></span>
                            <img src="" class="mascot-layers" width="300px" height="300px" style="background: black;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
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