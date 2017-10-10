@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<div class="row">
        <div class="col-xs-12">
            <div class="box">
 	<div class="box-header">
                    <h3>Materials Single Page</h3>
                                      
    </div>
	<div class="box-body">
			<table class="material-table table table-bordered table-hover table-stripped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Block Pattern</th>
					<th>Neck Option</th>
					<th>Sport</th>
					<th>Design Type</th>
					<th>Uniform Application Type</th>
					<th>Price Item Template ID</th>
					<th>Asset Target</th>
					<th>SKU</th>
					<th>Part Alias ID</th>
					<th>Qx Item ID</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody class="materials" id="materials">
			
			</tbody>
			</table>
			</div>
	    </div>
    </div>
</div>
@endsection
	
@section('scripts')


<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript"  src="/underscore/underscore.js" ></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/js/administration/materials-single-page.js"></script>
@endsection

