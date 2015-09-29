@extends('administration.main')
 
@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12">


TEST
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/users.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection
