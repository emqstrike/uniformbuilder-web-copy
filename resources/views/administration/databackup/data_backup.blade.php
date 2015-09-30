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
    
    <button type="button" class="btn btn-default btn-lg">
        <span class="glyphicon glyphicon-export" aria-hidden="true"></span> Backup Database
    </button>

<table class="table table-hover">      
<div class="panel-heading">
    <tr>
      <td class="active">
       DATE:
      </td>
      <td class="active">
        LOCATION
      </td>
      <td class="active">
        RESTORE
      </td>
    </tr>
</div>
    
    <tr>
      <td class="active">
        08/26/1992 12:00pm
      </td>
      <td class="active">
        Alpha Server
      </td>
      <td class="active">
        <button type="button" class="btn btn-default btn-lg">
          <span class="glyphicon glyphicon-import" aria-hidden="true"></span> Restore Database
        </button>
      </td>
    </tr>

    <tr>
      <td class="active">
        08/25/1992 12:00pm
      </td>
      <td class="active">
        Alpha Server
      </td>
      <td class="active">
        <button type="button" class="btn btn-default btn-lg">
          <span class="glyphicon glyphicon-import" aria-hidden="true"></span> Restore Database
        </button>
      </td>
    </tr>
</table>


 

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
