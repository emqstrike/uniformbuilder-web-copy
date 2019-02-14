@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

<style type="text/css">

    .switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 27.2px;
    }
    .switch input {display:none;}
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20.08px;
      width: 20.08px;
      left: 3.2px;
      bottom: 3.2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    input:checked + .slider {
      background-color: #39d2b4;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #77dd77;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(20.08px);
      -ms-transform: translateX(20.08px);
      transform: translateX(20.08px);
    }

</style>
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Sales Representatives</h3>
                    <a href="/administration/sales_reps/add" class='btn btn-md btn-default sales-reps-add'>
                        <span class="glyphicon glyphicon-plus"></span> Register New <span class="glyphicon glyphicon-user"></span>
                    </a>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Representative ID</th>
                            <th>User ID</th>
                            <th>ZIP Codes</th>
                            <th>Manager</th>
                            <th>Rep ID Manager</th>
                            <th>Dealer</th>
                            <th>Dealer ID</th>
                            <th>Corporate</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($sales_reps as $rep)
                        <tr class='reps-{{ $rep->id }}'>
                            <td>
                               {{$rep->id}}
                            </td>
                            <td>
                               {{$rep->last_name}},  {{$rep->first_name}}
                            </td>
                            <td>
                                {{$rep->rep_id}}
                            </td>
                            <td>
                                {{$rep->user_id}}
                            </td>
                            <td>
                                <input type="hidden" class="zip-codes" value="{{$rep->zip_codes}}">
                                <button class="view-zip-codes btn btn-default btn-sm">View</button>
                            </td>
                            <td>
                                @if($rep->is_manager == 1)
                                    {{'Yes'}}
                                @else
                                    {{'No'}}
                                @endif
                            </td>
                            <td>
                                {{$rep->rep_id_manager}}
                            </td>
                            <td>
                                {{$rep->dealer}}
                            </td>
                            <td>
                                {{$rep->dealer_id}}
                            </td>
                            <td>
                                @if($rep->is_corporate == 1)
                                    {{'Corporate'}}
                                @else
                                    {{'Not Corporate'}}
                                @endif
                            </td>
                            <td>
                                <div class="onoffswitch">
                                    <label class="switch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-rep" id="switch-{{ $rep->id }}" data-rep-id="{{ $rep->id }}" {{ ($rep->active) ? 'checked' : '' }}>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </td>
                            <td class="td-buttons">
                                <a href="/administration/sales_reps/edit/{{$rep->id}}" class="edit-part btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit">Edit</i>
                                </a>
                                <a href="#" class="delete-rep btn btn-xs btn-danger" data-rep-id="{{ $rep->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash">Remove</i>
                                </a>

                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='1'>
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

<!-- Modal -->
<div id="viewZIPCodes" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content modal-md">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3 class="modal-title" align="center">ZIP Codes</h3>
      </div>
      <div class="modal-body" align="center">
            <div class="codes">
                <textarea name="zips" class="zips" cols="70" rows="30" readonly="readonly">

                </textarea>
            </div>
      </div>
      <div class="modal-footer" >
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
<script type="text/javascript" src="/js/administration/sales-reps.js"></script>
<script type="text/javascript">
$(document).ready(function(){
     $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });

    $(document).on('click', '.toggle-rep', function(e) {
        e.preventDefault();
        var id = $(this).data('rep-id');
        var url = "//" + api_host + "/api/sales_rep/toggle/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    window.location.reload();
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

});
</script>
@endsection
