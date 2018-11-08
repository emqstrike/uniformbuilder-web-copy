@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Select existing mascot/artwork')

                    <div class="col-md-12">
                        <h1>Select existing mascot/artwork</h1>
                    </div>
                </div>

                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('v1_store_existing_logo') }}" enctype="multipart/form-data" id='create-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <input type="hidden" name="logo_request_id" value="{{ $logo_request_id }}">
                        <input type="hidden" name="logo_index" value="{{ $logo_index }}">
                        <input type="hidden" name="logo_request_user_id" value="{{ $logo_request_user_id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Filter</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-filter" name="mascot_filter" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot</label>
                            <div class="col-md-6">
                                <select id="mascots" class="app-default-mascot"></select>
                                <input type="hidden" name="mascot_id" id="mascot_id">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary submit-record">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Mascot
                                </button>
                                <a href="{{ route('v1_logo_requests') }}" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('custom-scripts')
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            window.mascots = null;
            getMascots(function(mascots){ window.mascots = mascots; });

            function getMascots(callback) {
                var mascots;
                var url = "//" +api_host+ "/api/mascots";
                $.ajax({
                    url: url,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    success: function(data){
                        mascots = data['mascots'];
                        if(typeof callback === "function") callback(mascots);
                    }
                });
            }

            $(document).on('click', '.submit-record', function(e) {
                var val = $('.dd-selected-value').val();
                console.log(val);
                $('#mascot_id').val(val);
            });

            $.each(window.mascots, function(i, item) {
                item['text'] = item.name;
                item['value'] = item.id;
                item['selected'] = false;
                var c = 0;
                var xdata = JSON.parse(item.layers_properties);

                $.each(xdata, function(i, item) {
                    c++;
                });

                item['description'] = item.category + ' [ ' + c + ' ]';
                item['imageSrc'] = item.icon;
                item['layers'] = c ;

            });

            mascotsData = window.mascots;

            $(document).on('change', '#mascots', function() {
                var val = $('.dd-selected-value').val();
                $('#mascot_id').val(val);
            });

            $('#mascots').ddslick({
                data: mascotsData,
                width: 250,
                height: 300,
                imagePosition: "left",
                selectText: "Select Mascot",
                onSelected: function (data) {
                    var rowIndex = data.original[0].outerHTML;
                    rowIndex = $.parseHTML(rowIndex);
                    rowIndex = $(rowIndex).data("id");

                    if ($('.app-def-item').eq(rowIndex).val()=="mascot") {
                        accentMascotSelect(data,"mascot",rowIndex);
                    }
                }
            });

            $(document).on('change', '.mascot-filter', function() {
                var filteredMascots=[];
                var mascotValue = $(this).val();

                jQuery.each(mascots, function(index, item) {
                    if (((item.name).toLowerCase()).indexOf(mascotValue.toLowerCase()) > -1) {
                        filteredMascots.push( index );
                    }
                });

                var mascotFilterIndex=$(".mascot-filter").index(this);
                if ($(this).val()) {
                    $('.msc:eq('+ mascotFilterIndex +') .dd-container li').hide();
                    jQuery.each(filteredMascots, function(index, item) {
                        $('.msc:eq('+ mascotFilterIndex +') .dd-container li:eq('+item+')').show();
                    });
                } else {
                    $('.msc:eq('+ mascotFilterIndex +') .dd-container li').show();
                }

                console.log(filteredMascots);
            });
        });
    </script>
@endsection