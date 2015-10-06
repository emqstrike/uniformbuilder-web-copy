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
    <h1>
        <span class="glyphicon glyphicon-hdd"></span>
        Data Backup/Restore
        <small class='btn btn-xs btn-success' data-toggle="modal" data-target=".backup-data">
                <span class="glyphicon glyphicon-export"></span>
                Backup Database 
        </small>
    </h1>
</div>

<div class="col-md-12">
    
<table class="table table-hover">      

    <tr>
      <td class="active">
      <h4>DATE:</h4> 
      </td>
      <td class="active">
       <h4>LOCATION</h4>  
      </td>
      <td class="active">
        <h4>RESTORE</h4>        
      </td>
    </tr>

    <tr>
      <td class="active">
        08/26/1992 12:00pm
      </td>
      <td class="active">
        Alpha Server
      </td>
      <td class="active">
        <button type="button" class="btn btn-default btn-lg" data-toggle="modal" data-target=".restore-data">
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

<!-- Restore modal -->
<div class="modal fade restore-data" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Restore Database</h4>
      </div>
      <div class="modal-body">
        <p>Are you sure?&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Proceed</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

<!-- Backup modal -->
<div class="modal fade backup-data" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Backup Database</h4>
      </div>
      <div class="modal-body">
        <p>Are you sure?&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <a href="/administration/color/backup">
        <button type="button" class="btn btn-primary">Proceed</button>
        </a>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

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
