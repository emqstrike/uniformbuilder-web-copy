@extends('administration-lte-2.lte-main')

@section('styles')
@endsection

@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="box">
                <center>
                    <h1>
                        <p class="password-strength"></p>
                    </h1>
                </center>
                <center>
                    <div class="box-body" style="width: 800px; height: 800px; margin-top: 50px;">
                        <canvas id="myChart" width="400" height="400"></canvas>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/patternomaly@1.3.0/dist/patternomaly.min.js"></script> -->
<script type="text/javascript">
$(function(){

var ctx = document.getElementById("myChart");
window.color_code = [{
    'name' : 'pastel red',
    'hex' : '#ff6961'
},{
    'name' : 'pastel yellow',
    'hex' : '#fdfd96'
},{
    'name' : 'pastel orange',
    'hex' : '#ffb347'
},{
    'name' : 'light green',
    'hex' : '#90ee90'
},{
    'name' : 'pastel green',
    'hex' : '#77dd77'
}];

window.labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong", "Invalid"];
window.data = [];
window.data_colors = [];

var style_info = $('#style_info');

showStyleInfo = function() {
    style_info.modal('show');
};

hideStyleInfo = function () {
    style_info.modal('hide');
};

getUsersPasswordStrength(function(users){ window.users = users; });
function getUsersPasswordStrength(callback){
    var users;
    var url = "//" +api_host+ "/api/users/getPasswordStrength";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        headers: {"accessToken": atob(headerValue)},
        success: function(data){
            users = data['users'];
            if(typeof callback === "function") callback(users);
        }
    });
}
 console.log(window.users);
// $('.styles-count').html('('+window.users.length+') Users in CUSTOMIZER');

window.grouped_data = _.groupBy(window.users, 'pw_strength_score');
 console.log(window.grouped_data);

createLabelsAndData();
function createLabelsAndData(){

    Object.keys(window.grouped_data).forEach(function(key,i) {
        if(key != null) {
            window.data.push(_.size(window.grouped_data[key]));
        }
        if(i < window.color_code.length){
            window.data_colors.push(window.color_code[i].hex);
        }
        else {
            var j = i-window.color_code.length;
            window.data_colors.push(window.color_code[j].hex);
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
            var url = "//" +api_host+ "/api/materials/category/"+window.active_sport;
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
