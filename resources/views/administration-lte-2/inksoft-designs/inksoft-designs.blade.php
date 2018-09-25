@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/jjsonviewer/css/jjsonviewer.css">
    <style>

    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Inksoft Designs')
                    <h1>
                        Inksoft Designs
                        <a href="/administration/v1-0/inksoft_designs/search" class='btn btn-sm btn-default'>
                            Search
                        </a>
                    </h1>
                </div>

                <div class="box-body">
                    <div id="filter" class="row">
                        <div class="col-md-12 text-right">
                            <div class="form-inline">
                                <label>User :</label>
                                <select id="active_user" class="form-control">
                                    <option value="all">All</option>
                                    @foreach ($users as $user)
                                    @if (! is_null($user->id) && (! $user->id == ""))
                                        @if ($active_user == $user->id)
                                            <option value="{{ $user->id }}" selected="selected">{{ $user->last_name }}, {{ $user->first_name }}</option>
                                        @else
                                            <option value="{{ $user->id }}">{{ $user->last_name }}, {{ $user->first_name }}</option>
                                        @endif
                                    @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>

                    <table class="data-table table table-bordered table-striped display">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Design ID</th>
                            <th>Design Name</th>
                            <th>User</th>
                            <th>Created By</th>
                            <th>PNG</th>
                            <th>SVG</th>
                            <th>Design Summary</th>
                            <th>Design Details</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Is Public</th>
                            <th>Archived</th>
                            <th>Comments</th>
                            <th>Status</th>
                            <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($inksoft_designs->data as $item)
                               <tr class='inksoft-design-{{ $item->id }}'>
                                    <td>
                                       {{$item->id}}
                                    </td>
                                     <td>
                                        <a href="#" class="btn btn-default btn-xs btn-flat file-link" data-link="{{$item->thumbnail}}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                    </td>
                                    <td>
                                        {{$item->design_id}}
                                    </td>
                                    <td>
                                        {{$item->design_name}}
                                    </td>
                                    <td>
                                        {{$item->first_name}} {{$item->last_name}}
                                    </td>
                                    <td>
                                        {{$item->cfirst_name}} {{$item->clast_name}}
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-default btn-xs btn-flat file-link" data-link="{{$item->png_filename}}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-default btn-xs btn-flat file-link" data-link="{{$item->svg_filename}} "><i class="fa fa-picture-o" aria-hidden="true"></i></a>

                                    </td>
                                    <td>
                                        <input type="hidden" class="design-summary" value="{{ $item->design_summary }}">
                                        <button class="view-design-summary btn btn-flat btn-default btn-sm">View</button>
                                    </td>
                                    <td>
                                        <input type="hidden" class="design-details" value="{{$item->design_details}}">
                                        <button class="view-design-details btn btn-flat btn-default btn-sm">View</button>
                                    </td>
                                    <td>
                                        {{$item->category}}
                                    </td>
                                    <td>
                                        @if($item->type == "user_design")
                                            {{'User Design'}}
                                        @elseif($item->type == "tailsweeps")
                                            {{'Tailsweeps'}}
                                        @elseif($item->type == "kollege_town")
                                            {{'Kollege Town'}}
                                        @else
                                            {{'None'}}
                                        @endif
                                    </td>
                                    <td>
                                        @if($item->is_public == 1)
                                            {{'Yes'}}
                                        @else
                                            {{'No'}}
                                        @endif
                                    </td>
                                    <td>
                                        @if($item->archived == 1)
                                            {{'Yes'}}
                                        @else
                                            {{'No'}}
                                        @endif
                                    </td>
                                    <td>
                                      <input type="hidden" class="comments" value="{{$item->comments}}">
                                      <button class="view-comments btn btn-default btn-flat btn-sm">View</button>
                                    </td>
                                    <td>
                                        @if($item->status == "in_development")
                                            {{'In Development'}}
                                        @elseif($item->status == "new")
                                            {{'New'}}
                                        @elseif($item->status == "initial_approval_ok")
                                            {{'Initial Approval Ok'}}
                                        @elseif($item->status == "secondary_approval_ok")
                                            {{'Second Approval Ok'}}
                                        @elseif($item->status == "final_approval_ok")
                                            {{'Final Approval Ok'}}
                                        @else
                                            {{''}}
                                        @endif
                                    </td>

                                    <td class="td-buttons">
                               <!--          <a href="/administration/inksoft_design/edit/{{$item->id}}" class="edit-inksoft-design btn btn-info btn-flat btn-xs">
                                            <i class="glyphicon glyphicon-edit"></i>
                                        </a> -->
                                        <a href="#" class="delete-inksoft-design btn btn-xs btn-flat btn-danger pull-right" data-inksoft-design-id="{{ $item->id }}" role="button">
                                            <i class="glyphicon glyphicon-trash"></i>
                                        </a>

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

                    @include('administration-lte-2.inksoft-designs.partials.pagination')

                </div>
            </div>
        </div>
        <!-- Modal -->
        <div id="viewModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
            <div class="modal-content modal-lg">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h3 class="modal-title" align="center">Design</h3>
                </div>
                <div class="modal-body" align="left">
                      <div class="codes">
                          <pre id="design" ></pre>
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
<script type='text/javascript' src='/jjsonviewer/js/jjsonviewer.js'></script>
<script type="text/javascript">

    $(document).on('change', '#active_user', function(e){
        e.preventDefault();
        $user = $(this).val();
        if($user != 'all') {
            var url = "{{ route('inksoft_designs') }}?user=" + $user;
        } else {
            var url = "{{ route('inksoft_designs') }}";
        }
        window.location.href = url;
    });

    $('.file-link').on('click', function(){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }

    $(document).on('click', '.view-comments', function(e){
        e.preventDefault();
        //Open loading modal
        getComments($(this));
        $('#viewModal').modal('show');

    });

    function getComments(thisObj) {
      var comment = thisObj.parent().parent().find('.comments').val();
      $('#design').text(comment);
    }

    $(document).on('click', '.view-design-summary', function(e){
        e.preventDefault();
        //Open loading modal
        getSummary($(this));
        $('#viewModal').modal('show');

    });

    function getSummary(thisObj) {
      var jsonVal = thisObj.parent().parent().find('.design-summary').val();
      var pJson = JSON.parse(jsonVal);
      var sJson = JSON.stringify(pJson, undefined, 2);
      $('#design').jJsonViewer(sJson, {expanded: true});
    }

    $(document).on('click', '.view-design-details', function(e){
        e.preventDefault();
        //Open loading modal
        getDetails($(this));
        $('#viewModal').modal('show');
    });

    function getDetails(thisObj) {
      var jsonVal = thisObj.parent().parent().find('.design-details').val();
      var pJson = JSON.parse(jsonVal);
      var sJson = JSON.stringify(pJson, undefined, 2);
      $('#design').jJsonViewer(sJson, {expanded: true});
    }


    $(document).on('click', '.delete-inksoft-design', function(e){
      e.preventDefault();
       var id = [];
       id.push( $(this).data('inksoft-design-id'));
       modalConfirm('Remove Design', 'Are you sure you want to delete the Inksoft Design?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/inksoft_design/delete";

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
                   new PNotify({
                       title: 'Success',
                       text: response.message,
                       type: 'success',
                       hide: true
                   });
                  $('#confirmation-modal').modal('hide');
                  $.each(id, function (index, value) {
                     console.log(value);
                     $('.inksoft-design-' + value).fadeOut();

                   });

               }
           }
       });
    });

</script>
@endsection
