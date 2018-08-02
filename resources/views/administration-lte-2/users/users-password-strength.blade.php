@extends('administration-lte-2.lte-main')

@section('styles')
@endsection

@section('content')
<section class="content">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="box">
                @section('page-title', 'Password Strength Graph')
                <center>
                    <h2>
                        <p>Password Strength Graph</p>
                    </h2>
                    <h3>
                        <p class="password-strength"></p>
                    </h3>
                </center>
                <center>
                    <div class="box-body" style="width: 800px; height: 800px; margin-top: 50px;">
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </div>
                </center>
            </div>
        </div>
    </div>

    <div class="modal fade" id="user_info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title"></h1>
          </div>
          <div class="content modal-content">
            <div class="box-body">
                <table class="table table-bordered table-striped display">
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>User Name</td>
                            <td>EMAIL</td>
                        </tr>
                    </thead>
                    <tbody class="body-content" >

                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>

</section>

@endsection

@section('custom-scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js"></script>
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

    var user_info = $('#user_info');

    showUserInfo = function() {
        user_info.modal('show');
    };

    hideUserInfo = function () {
        user_info.modal('hide');
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

    $('.password-strength').html('('+window.users.length+') Active Users in CUSTOMIZER');

    window.grouped_data = _.groupBy(window.users, 'pw_strength_score');

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
            window.selected_users = window.labels[activePoints[0]["_index"]];
            showUserInfo();

            $('.modal-title').html('<center><h3> Users with '+window.selected_users+' Password Strength.</h3></center>');
            $('.body-content').html('');
            var elem = '';

            var active_user = _.filter(window.users, function(user) {
                return user.pw_strength_score == activePoints[0]["_index"];
            });

            _.each(active_user, function(active) {
                 elem +=    `<tr>
                                <td>`+active.id+`</td>
                                <td>`+active.first_name+` `+active.last_name+`</td>
                                <td>`+active.email+`</td>
                            </tr>`;
            });
            $('.body-content').append(elem);
        }
    );

});
</script>
@endsection
