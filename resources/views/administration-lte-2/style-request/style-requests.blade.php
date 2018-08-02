@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style type="text/css">
.div-bordered {
    border: 1px solid #C8C8C8 !important;
    /*border-radius: 5px !important;*/
}
.glyphicon.spinning {
    animation: spin 1s infinite linear;
    -webkit-animation: spin2 1s infinite linear;
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
</style>
@endsection

@section('custom-styles')

@endsection

@section('content')

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Style Requests
                    </h1>
                </div>

                <div class="box-body">
                    <div class="col-md-1 col-md-offset-3 alert alert-danger div-bordered">
                        <center>
                            <h4>High Priority</h4>
                            <h1>{{ $high_priority_count }}</h1>
                        </center>
                    </div>
                    <div class="col-md-1 alert div-bordered" style="background-color: #fcfc4b;">
                        <center>
                            <h4 style="color: #fff; text-shadow: 1px 1px #525252;">Pending</h4>
                            <h1 style="color: #fff; text-shadow: 1px 1px #525252;">{{ $pending_count }}</h1>
                        </center>
                    </div>
                    <div class="col-md-1 alert alert-info div-bordered">
                        <center>
                            <h4>In Progress</h4>
                            <h1>0</h1>
                        </center>
                    </div>
                    <div class="col-md-1 alert alert-success div-bordered">
                        <center>
                            <h4>For Approval</h4>
                            <h1>0</h1>
                        </center>
                    </div>
                    <div class="col-md-1 alert alert-warning div-bordered">
                        <center>
                            <h4>Rejected</h4>
                            <h1>{{ $rejected_count }}</h1>
                        </center>
                    </div>
                    <div class="col-md-1 alert div-bordered" style="background-color: #5d3c9c;">
                        <center>
                            <h4 style="color: #fff;">Fixed / For Approval</h4>
                            <h1 style="margin-top: -9px; color: #fff;">0</h1>
                        </center>
                    </div>
                    <div class="col-md-12 div-bordered">
                        <table class="table table-striped table-bordered data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Style Name</th>
                                    <th>Sport</th>
                                    <th>Brand</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Deadline</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($style_requests as $style_request)
                                <tr>
                                    <td>{{ $style_request->id }}</td>
                                    <td>{{ $style_request->name }}</td>
                                    <td>{{ $style_request->sport }}</td>
                                    <td>{{ $style_request->brand }}</td>
                                    <td>{{ $style_request->status }}</td>
                                    <td>{{ $style_request->priority }}</td>
                                    <td>@if($style_request->deadline != "0000-00-00"){{ $style_request->deadline }} @else @endif <a href="#" class="pull-right" data-toggle="tooltip" data-message="Requested by: {{ $style_request->requested_by }}. Record was created in: {{ $style_request->created_at }}" data-original-title="" title=""><span class="glyphicon glyphicon-info-sign"></span></a></td>
                                    <td>
                                        <center>
                                            <a href="#" class="btn btn-xs btn-flat btn-info"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
                                            <a href="#" class="btn btn-xs btn-flat btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                                        </center>
                                    </td>
                                </tr>
                                @empty
                                    <p>No Style Requests Found</p>
                                @break
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="modal fade" tabindex="-1" role="dialog" id="loadingModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"><span class="glyphicon glyphicon-refresh spinning"></span> Loading</h4>
      </div>
      <div class="modal-body">
        <p class="modal-text-body"></p>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/js/admin-v1-utils.js"></script>
<script type="text/javascript">
$(document).ready(function(){

$('.data-table').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": true,
        "drawCallback" : function() {
             $('[data-toggle="tooltip"]').popover({
                html: true,
                trigger: 'hover',
                placement: 'top',
                content: function(){
                    return $(this).data('message');
                }
            });
       }
});

});
</script>
@endsection
