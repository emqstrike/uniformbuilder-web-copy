@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<link rel="stylesheet" type="text/css" href="/dropzone/dropzone.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<style>
    #my-awesome-dropzone {
        border: dashed 1px black;
    }
    .dz-image {
        background-color: gray;
    }
    table.borderless td,table.borderless th{
        border: none !important;
    }
    .has-loading {
      background: transparent url('http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif') center no-repeat;
    }
</style>
@endsection

@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="box">
                <center>
                    <h1>
                        <p class="styles-count"></p>
                    </h1>
                </center>
                <center>
                    <div class="box-body" style="width: 800px; height: 800px; margin-top: 50px;">
                        <canvas id="myChart" width="800" height="800"></canvas>
                    </div>
                </center>
            </div>
        </div>
    </div>

<div class="modal fade" id="style_info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="progress-modal-message"></h1>
      </div>
      <div class="content chart-content">
          <canvas id="myChart2" width="500" height="500"></canvas>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="progress-modal-message"></h1>
      </div>
      <div class="content">
      </div>
    </div>
  </div>
</div>

</section>


@include('partials.confirmation-modal-success')

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/patternomaly@1.3.0/dist/patternomaly.min.js"></script>
<script type="text/javascript">
$(function(){

var ctx = document.getElementById("myChart");
window.colors = [{
    'name' : 'mirage',
    'hex' : '#1c2732'
},{
    'name' : 'raven',
    'hex' : '#6E7A89'
},{
    'name' : 'ghost',
    'hex' : '#C2CAD4'
},{
    'name' : 'bronco',
    'hex' : '#b3a79e'
},{
    'name' : 'ferra',
    'hex' : '#6f534f'
},{
    'name' : 'kashmir blue',
    'hex' : '#496595'
},{
    'name' : 'nepal',
    'hex' : '#90a7c4'
},{
    'name' : 'blue haze',
    'hex' : '#c6d0de'
},{
    'name' : 'porcelain',
    'hex' : '#ebedef'
},{
    'name' : 'chino',
    'hex' : '#d4d0af'
},{
    'name' : 'limed spruce',
    'hex' : '#344B52'
},{
    'name' : 'cutty sark',
    'hex' : '#587983'
},{
    'name' : 'hit gray',
    'hex' : '#9db3b4'
},{
    'name' : 'celeste',
    'hex' : '#cfd3ca'
},{
    'name' : 'champagne',
    'hex' : '#fae8da'
},{
    'name' : 'tobacco brown',
    'hex' : '#6c5840'
},{
    'name' : 'teak',
    'hex' : '#ba9a72'
},{
    'name' : 'santa fe',
    'hex' : '#b26b4d'
},{
    'name' : 'espresso',
    'hex' : '#662d1c'
},{
    'name' : 'graphite',
    'hex' : '#2a110a'
}];

window.labels = [];
window.data = [];
window.data_colors = [];

var style_info = $('#style_info'); 
    
showStyleInfo = function() {
    style_info.modal('show');
};

hideStyleInfo = function () {
    style_info.modal('hide');
};

getStyles(function(styles){ window.styles = styles; });
function getStyles(callback){
    var styles;
    var url = "//" + api_host + "/api/materials/styleSheets";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            styles = data['materials'];
            if(typeof callback === "function") callback(styles);
        }
    });
}

getAllStyles(function(all_styles){ window.all_styles = all_styles; });
function getAllStyles(callback){
    var all_styles;
    var url = "//" + api_host + "/api/materials";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            all_styles = data['materials'];
            if(typeof callback === "function") callback(all_styles);
        }
    });
}

$('.styles-count').html('('+window.styles.length+') Styles LIVE in CUSTOMIZER');

window.grouped_data = _.groupBy(window.styles, style => style.uniform_category);

createLabelsAndData();
function createLabelsAndData(){

    Object.keys(window.grouped_data).forEach(function(key,i) {
        window.labels.push(key);
        window.data.push(_.size(window.grouped_data[key]));

        if(i < window.colors.length){
            window.data_colors.push(window.colors[i].hex);
        } else {
            var j = i-window.colors.length;
            window.data_colors.push(window.colors[j].hex);
        }
    });
}

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: window.labels,
        datasets: [{
            data: window.data,
            backgroundColor: window.data_colors,
            borderColor: [
                'rgba(255,255,255,1)',
                'rgba(255,255,255,1)',
                'rgba(255,255,255,1)',
            ],
            borderWidth: 1
        }]
    }
});

$("#myChart").click( 
    function(evt){

        var activePoints = myChart.getElementsAtEvent(evt);          

        window.active_sport = window.labels[activePoints[0]["_index"]];

        getStylesBySport(function(style_category){ window.style_category = style_category; });
        function getStylesBySport(callback){
            var style_category;
            var url = "//" + api_host + "/api/materials/category/"+window.active_sport;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    style_category = data['materials'];
                    if(typeof callback === "function") callback(style_category);
                }
            });
        }

        showStyleInfo();
        $('.progress-modal-message').html(window.active_sport+' styles information');
        $('#myChart2').remove();
        $('.chart-content').append('<canvas id="myChart2" width="500" height="500"></canvas>');

        var all_styles_grouped = _.groupBy(window.all_styles, style => style.uniform_category);
        var total_styles = _.size(all_styles_grouped[window.active_sport]);
        var total_sublimated_raw = _.groupBy(all_styles_grouped[window.active_sport], style => style.uniform_application_type == 'sublimated');
        var total_sublimated = _.size(total_sublimated_raw['true']);
        var total_twill_raw = _.groupBy(all_styles_grouped[window.active_sport], style => style.uniform_application_type == 'tackle_twill');
        var total_twill = _.size(total_twill_raw['true']);

        var all_live_styles = _.size(window.grouped_data[window.active_sport]);
        var live_sublimated_raw = _.groupBy(window.grouped_data[window.active_sport], style => style.uniform_application_type == 'sublimated');
        var live_sublimated = _.size(live_sublimated_raw['true']);
        var live_twill_raw = _.groupBy(window.grouped_data[window.active_sport], style => style.uniform_application_type == 'tackle_twill');
        var live_twill = _.size(live_twill_raw['true']);

        var ctx2 = document.getElementById("myChart2");
        var stackedBar = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ["Styles", "Sublimated", "Twill", "Live Styles", "Live Sublimated", "Live Twill"],
                datasets: [{
                    data: [total_styles, total_sublimated, total_twill, all_live_styles, live_sublimated, live_twill],
                    backgroundColor: [
                        '#1c2732',
                        '#6E7A89',
                        '#C2CAD4',
                        '#1c2732',
                        '#6E7A89',
                        '#C2CAD4'
                    ],
                    borderColor: [
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                        'rgba(255,255,255,1)',
                    ],
                    borderWidth: 1
                }]},
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
);

});
</script>
@endsection
