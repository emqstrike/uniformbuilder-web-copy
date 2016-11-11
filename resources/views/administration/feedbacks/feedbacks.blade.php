@extends('administration.lte-main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-{{ Session::get('alert-class') }} alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <i class="fa fa-bookmark"></i>
                        Feedbacks
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Subject</th>
                                <th>Content</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>User ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($feedbacks as $feedback)
                    <tr class='feature-flag-{{ $feedback->id }} '>
                        <td>
                            {{ $feedback->id }}
                        </td>
                        <td>
                            {{ $feedback->subject }}
                        </td>
                        <td>
                            {{ $feedback->content }}
                        </td>
                        <td>
                            {{ $feedback->type }}
                        </td>
                        <td>
                            {{ $feedback->email }}
                        </td>
                        <td>
                            {{ $feedback->user_id }}
                        </td>
                        <td>
                            <a href="feedback/reply/{{ $feedback->id }}" class="btn btn-primary btn-xs">Reply</a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Feature Flags Found
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

{{-- @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal']) --}}

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="/js/administration/feature-flags.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){
// var sports_icons = {
//     "Baseball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/baseball.png",
//     "Fastpitch" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/baseball.png",
//     "Basketball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/basketball.png",
//     "Apparel" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/apparel.png",
//     "Football" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/football.png",
//     "Golf" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/golf.png",
//     "Hockey" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/hockey.png",
//     "Lacrosse" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/lacrosse.jpg",
//     "Soccer" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/soccer.png",
//     "Tennis" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/tennis.gif",
//     "Volleyball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/volleyball.png",
//     "Wrestling" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/wrestling.png"
// };

// $(".sports-list").each(function(i) {
//     var x = null;
//     try {
//         x = JSON.parse($(this).html());
//         // console.log(x[0]);
//         $(this).html('');
//          for(item in x) {
//           // console.log(item);
//           s = x[item];
//           // console.log(s);
//           $(this).append('<img src="' + sports_icons[s] + '" style="height: 30px; width: 30px; margin-right: 5px;" alt="' + s + '">');
//         }
//     }
//     catch(err) {
//         console.log(err.message);
//     }
// });
// // console.log(sports_icons['baseball']);
//     // $('.data-table').DataTable({
//     //     "paging": true,
//     //     "lengthChange": false,
//     //     "searching": false,
//     //     "ordering": true,
//     //     "info": true,
//     //     "autoWidth": false
//     // });

//       $('.toggle-feature-flag').on('click', function(){
//             var id = $(this).data('feature-flag-id');
//             var url = "//" + api_host + "/api/feature/toggle/";
//            // var url = "//localhost:8888/api/feature/toggle/";
     
//             $.ajax({
//                 url: url,
//                 type: "POST",
//                 data: JSON.stringify({id: id}),
//                 dataType: "json",
//                 crossDomain: true,
//                 contentType: 'application/json',
//                 headers: {"accessToken": atob(headerValue)},
//                 success: function(response){
//                     if (response.success) {
                      
//                         new PNotify({
//                             title: 'Success',
//                             text: response.message,
//                             type: 'success',
//                             hide: true
//                         });
//                         console.log(response.message);
//                     }
//                 }
//             });
//         }); 



//       $('.delete-feature-flag').on('click', function(){
//             var id = $(this).data('feature-flag-id');
//          var url = "//" + api_host + "/api/feature/delete/";
//          //   var url = "//localhost:8888/api/feature/delete";

        
//             $.ajax({
//                 url: url,
//                 type: "POST",
//                 data: JSON.stringify({id: id}),
//                 dataType: "json",
//                 crossDomain: true,
//                 contentType: 'application/json',
//                 headers: {"accessToken": atob(headerValue)},
//                 success: function(response){
//                     if (response.success) {
                      
//                         new PNotify({
//                             title: 'Success',
//                             text: response.message,
//                             type: 'success',
//                             hide: true
//                         });

//                         $( ".data-table" ).load( location+" .data-table" );
                     
//                     }
//                 }
//             });
//         }); 
});



</script>
@endsection