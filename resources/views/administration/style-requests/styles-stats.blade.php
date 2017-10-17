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
                <div class="box-header">
                    <!-- <h1>
                        <p style="position: absolute; display: inline;" class="style-name">STYLE</p>
                    </h1> -->
                </div>
                <center>
                    <div class="box-body" style="width: 800px; height: 800px;">
                        <canvas id="myChart" width="800" height="800"></canvas>
                    </div>
                </center>
            </div>
        </div>
    </div>

<div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="progress-modal-message"></h1>
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

getStyles(function(styles){ window.styles = styles; });
function getStyles(callback){
    var styles;
    var url = "//api-dev.qstrike.com/api/materials/styleSheets";
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

window.grouped_data = _.groupBy(window.styles, style => style.uniform_category);

createLabelsAndData();
function createLabelsAndData(){

    Object.keys(window.grouped_data).forEach(function(key,i) {
        window.labels.push(key);
        window.data.push(_.size(window.grouped_data[key]));

        if(i < window.colors.length){
            window.data_colors.push(window.colors[i].hex);
            console.log('if');
        } else {
            var j = i-window.colors.length;
            window.data_colors.push(window.colors[j].hex);
            console.log('else');
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

});
</script>
@endsection
