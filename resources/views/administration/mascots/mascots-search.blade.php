@extends('administration.lte-main')
<meta name="csrf-token" content="{{ csrf_token() }}" />
@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>

@endsection

@section('content')
<input type="hidden" name="_token" value="{{ csrf_token() }}" id="x-csrf-token">
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-search"></span>
                        Search Mascots
                        <small>
                            <a href="/administration/mascot/add" class='btn btn-xs btn-warning'>
                                Back
                            </a>
                        </small>
                    </h1>

                </div>
                <div class="box-body">
                    <table id="mascots_search_table" class='data-table table table-bordered table-hover mascots-table display'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Icon</th>
                                <th>Catergory</th>
                                <th>Sports</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($mascots as $mascot)
                            <tr>
                                <td>{{ $mascot->id }}</td>
                                <td>{{ $mascot->name }}</td>
                                <td><img src="{{ $mascot->icon }}" style="height:30px; width: 30px;"></td>
                                <td>{{ $mascot->category }}</td>
                                <td>{{ $mascot->sports }}</td>
                                <td><a href="#" class="btn btn-xs btn-primary file-link" data-link="{{ $mascot->ai_file }}">Link</a></td>
                            </tr>
                            @empty
                                <p>No Mascots Found</p>
                            @break
                            @endforelse
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

// $('.file-link').on('click', function(e){
// $(document).on('click', '.file-link', function() {
$('#mascots_search_table .file-link').on('click', function(){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
});

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

$('.data-table').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": true,
});


});
</script>
@endsection