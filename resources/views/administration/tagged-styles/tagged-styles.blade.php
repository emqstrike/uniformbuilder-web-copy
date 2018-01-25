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
                    <i class="fa fa-tags"></i>
                    Tagged Styles
                  </h3>
                </div>
                <div class="box-body">
                    <table class="data-table table table-bordered table-striped table-hover" id="tagged-styles-table">
                    <thead>
                        <tr>
                            <th id="select-filter">User ID</th>
                            <th>User Email</th>
                            <th id="select-filter">Material ID</th>
                            <th>Material Name</th>
                            <th colspan="2">Thumbnails</th>
                            <th id="select-filter">Tag</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($tagged_styles as $item)
                        <tr class='tagged-styles-{{ $item->id }}'>
                            <td>
                                {{ $item->user_id }}
                            </td>
                            <td>
                                {{ $item->user_email }}
                            </td>
                            <td>
                                {{ $item->uniform_id }}
                            </td>
                            <td>
                                {{ $item->material_name }}
                            </td>
                            <td>

                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $item->front_thumbnail }}">Front</a>
                              </td>
                              <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $item->left_thumbnail }}">Left</a>
                              </td>

                            <td>
                                {{ $item->tags }}
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
    $('.file-link').on('click', function(e){
      console.log('file link');
      var url = $(this).data('link');
      OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }

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
