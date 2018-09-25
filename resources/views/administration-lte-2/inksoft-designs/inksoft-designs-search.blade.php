@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <center>
                        <h4>Search Inksoft Design</h4>
                    </center>
                </div>
                <div class="box-body">
                    <center>
                        <table>
                            <tr>
                                <td>
                                    <input type="text" class="form-control design-name-input" placeholder="Enter design name here">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <center>
                                        <br>
                                        <button type="submit" class="btn btn-success btn-flat search-inksoft-design">Search</button>
                                        <a href="/administration/v1-0/inksoft_designs" class='btn btn-flat btn-danger'>
                                            Back
                                        </a>
                                    </center>
                                </td>
                            </tr>
                        </table>
                    </center>
                    <br>
                    <center>

                    </center>
                    <br>
                    <table class="table table-bordered table-striped">
                        <thead class="results-headers">
                        </thead>
                        <tbody class="results-data">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@section('scripts')
<script
  src="https://code.jquery.com/jquery-1.2.6.min.js"
  integrity="sha256-1UhTB3WmKG9JumbgcVh2tOxZhZZrApHCFWj+z8QXjo0="
  crossorigin="anonymous"></script>
<script type="text/javascript">
$(document).ready(function(){

    window.inksoft_designs = null;

    $(document).on('click', '.search-inksoft-design', function(e) {
        e.preventDefault();

        var design_name = $('.design-name-input').val();
        $.ajax({
            url: '//' + api_host + '/api/'+endpoint_version+'/inksoft_design/search_by_name/'+design_name,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                window.inksoft_designs = data['inksoft_designs'];
                console.log(window.inksoft_designs);
                generateResults();
            }
        });

    });

    function generateResults(){
        var table_header = `<tr>
                            <th>ID</th>
                            <th>Design ID</th>
                            <th>PNG</th>
                            <th>SVG</th>
                            <th>User ID</th>
                            <th>Created by User ID</th>
                        </tr>`;
        var data = window.inksoft_designs;
        var table_data = '';
        data.forEach(function(i) {
            table_data += `<tr>
                        <td>`+i.id+`</td>
                        <td>`+i.design_id+`</td>
                        <td><img src="`+i.png_filename+`" height="75" width="96"></td>
                        <td><img src="`+i.svg_filename+`" height="75" width="96"></td>
                        <td>`+i.user_id+`</td>
                        <td>`+i.created_by_user_id+`</td>
                        </tr>`;
        });
        $('.results-headers').html('');
        $('.results-headers').append(table_header);
        $('.results-data').html('');
        $('.results-data').append(table_data);

    }

});
</script>
