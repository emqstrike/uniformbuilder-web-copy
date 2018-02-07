@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                  <h3>
                    <i class="fa fa-link"></i>
                    User Pairings
                  </h3>
                </div>
                <div class="box-body">
                    <table class="data-table table table-bordered table-striped table-hover" id="user-parings-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th id="select-filter">User ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th id="select-filter">Tag</th>
                            <th id="select-filter">Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($user_pairings as $item)
                        <tr class='user-pairings-{{ $item->id }}'>
                            <td>
                                {{ $item->id }}
                            </td>
                            <td>
                                {{ $item->user_id }}
                            </td>
                            <td>
                                {{ $item->name }}
                            </td>
                            <td>
                                {{ $item->description }}
                            </td>
                            <td>
                                {{ $item->tag }}
                            </td>
                            <td>
                                {{ $item->type }}
                            </td>
                            <td>
                                <a href="/administration/user_pairings/items/{{$item->id}}" class="view-user-pairing-items btn btn-default btn-xs">
                                    <i class="fa fa-info-circle" aria-hidden="true"> View Pairing Items </i>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='7'>
                                No Record
                            </td>
                        </tr>
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
                        <td></td>
                      </tr>
                    </tfoot>
                    </table>
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
<script type="text/javascript">
$(document).ready(function(){

    try {
        $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        "pageLength": 15,
        initComplete: function () {
              this.api().columns('#select-filter').every( function () {
                  var column = this;
                  var select = $(`<select><option value=""></option></select>`)
                      .appendTo( $(column.footer()).empty() )
                      .on( 'change', function () {
                          var val = $.fn.dataTable.util.escapeRegex(
                              $(this).val()
                          );
                          column
                          .search( val ? '^'+val+'$' : '', true, false )
                              .draw();
                      } );
                  column.data().unique().sort().each( function ( d, j ) {
                      select.append( `<option value="`+d+`">`+d+`</option>` );
                  } );
              } );
          }
        });
      } catch(e) {
          console.log(e);
      }
});
</script>
@endsection
