@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<style type="text/css">
.onoffswitch {
    position: relative; width: 61px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 9px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 5px;
    background-color: #02C723; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 5px;
    background-color: #BF5050; color: #FFFFFF;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 1px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 37px;
    border: 2px solid #999999; border-radius: 9px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}
</style>
@endsection

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
                        <i class="fa fa-info"></i>
                        Helpers
                        <br />
                        <small>
                            <a href="/administration/helper/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add a helper
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Idx</th>
                                <th>Feature</th>
                                <th>Group</th>
                                <th>Category</th>
                                <th>Sports</th>
                                <th>Video</th>
                                <th>GIF</th>
                                <th>PDF</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                 @forelse ($helpers as $helper)
                    <tr class='feature-flag-{{ $helper->id }}'>
                        <td>
                            {{ $helper->id }}
                        </td>
                        <td>
                            {{ $helper->index }}
                        </td>
                        <td>
                            {{ $helper->feature }}
                        </td>
                        <td>
                            {{ $helper->group }}
                        </td>
                        <td>
                            {{ $helper->category }}
                        </td>
                        <td class='sports-list'>
                            {{ $helper->sports }}
                        </td>
                        <td>
                            {{ $helper->video_url }}
                        </td>
                        <td>
                            {{ $helper->gif_url }}
                        </td>
                        <td>
                            {{ $helper->pdf_url }}
                        </td>
                        <td>
                            {{ $helper->active }}
                        </td>
                        <td>
                            <a href="/administration/helper/edit/{{ $helper->id }}" class="btn btn-primary btn-xs edit-helper" data-helper-id="{{ $helper->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Helpers Found
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
    // $('.data-table').DataTable({
    //     "paging": true,
    //     "lengthChange": false,
    //     "searching": false,
    //     "ordering": true,
    //     "info": true,
    //     "autoWidth": false
    // });
var sports_icons = {
    "Baseball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/baseball.png",
    "Fastpitch" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/baseball.png",
    "Basketball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/basketball.png",
    "Apparel" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/apparel.png",
    "Football" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/football.png",
    "Golf" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/golf.png",
    "Hockey" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/hockey.png",
    "Lacrosse" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/lacrosse.jpg",
    "Soccer" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/soccer.png",
    "Tennis" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/tennis.gif",
    "Volleyball" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/volleyball.png",
    "Wrestling" : "https://s3-us-west-2.amazonaws.com/uniformbuilder/sports_icons/wrestling.png"
};

$(".sports-list").each(function(i) {
    var x = null;
    try {
        x = JSON.parse($(this).html());
        // console.log(x[0]);
        $(this).html('');
         for(item in x) {
          // console.log(item);
          s = x[item];
          // console.log(s);
          $(this).append('<img src="' + sports_icons[s] + '" style="height: 30px; width: 30px; margin-right: 5px;" alt="' + s + '">');
        }
    }
    catch(err) {
        console.log(err.message);
    }
});
});
</script>
@endsection