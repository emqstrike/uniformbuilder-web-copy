@extends('administration.lte-main')

@section('content-header')
<h1>
  Dashboard
  <small>Control panel</small>
</h1>
<ol class="breadcrumb">
  <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
  <li class="active">Dashboard</li>
</ol>
@endsection

@section('content')



<div class="row">

  <div class="col-lg-3 col-xs-6">
    <div class="small-box bg-aqua">
      <div class="inner">
        <h3 class='new-orders-count'></h3>
        <p>New Orders</p>
      </div>
      <div class="icon">
        <i class="ion ion-bag"></i>
      </div>
      <a href="/administration/orders?status=new" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
    </div>
  </div>

  <div class="col-lg-3 col-xs-6">
    <div class="small-box bg-yellow">
      <div class="inner">
        <h3 class='pending-orders-count'></h3>
        <p>Pending Orders</p>
      </div>
      <div class="icon">
        <i class="ion ion-bag"></i>
      </div>
      <a href="/administration/orders?status=pending" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
    </div>
  </div>
  <div class="col-lg-12">
  <div class="box-body">

    <!-- Orders Chart -->
    <div class="container">
      <div class="chart-header">
        <h3>
          Orders
          <select id="orders-select-year">
          @for ($year = date('Y'); $year >= 2015; $year--)
            <option>{{ $year }}</option>
          @endfor
          </select>
        </h3>
      </div>
      <div class="chart-body">
        <canvas id="orders-chart" width="700" height="120"></canvas>
      </div>
    </div>
    <!-- End Orders Chart -->

    <!-- Saved Designs Chart -->
    <div class="container">
      <div class="chart-header">
        <h3>
          Saved Designs
          <select id="saved-designs-select-year">
          @for ($year = date('Y'); $year >= 2015; $year--)
            <option>{{ $year }}</option>
          @endfor
          </select>
        </h3>
      </div>
      <div class="chart-body">
        <canvas id="saved-designs-chart" width="700" height="120"></canvas>
      </div>
    </div>
    <!-- End Saved Designs Chart -->

    <!-- Users Chart -->
    <div class="container">
      <div class="chart-header">
        <h3>
          Users
          <select id="users-select-year">
          @for ($year = date('Y'); $year >= 2015; $year--)
            <option>{{ $year }}</option>
          @endfor
          </select>
        </h3>
      </div>
      <div class="chart-body">
        <canvas id="users-chart" width="700" height="120"></canvas>
      </div>
    </div>
    <!-- End Users Chart -->

</div>

<div class="row">
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="/bower_components/chart.js/dist/Chart.min.js"></script>
<script type="text/javascript" src="/js/administration/dashboard-charts.js"></script>
<script type="text/javascript">

(function(){

  var apiHost = "{{ config('customizer.api_host') }}";

  // Build the Orders Chart
  var ordersChart = buildChart(
    'orders-chart',
    'orders',
    [{{ implode(',', $orders_stats) }}],
    '# of Orders',
    'blue'
  );

  $('#orders-select-year').on('change', function(){
    var year = $(this).val();
    ordersChart.destroy();
    $.ajax({
      url: 'https://' + apiHost + '/api' + endpoints.orders + year,
      method: 'GET',
      dataType: 'JSON',
      success: function(response) {
        if (response.success) {
          var newData = response.orders;
          var newChartData = [0,0,0,0,0,0,0,0,0,0,0,0];
          for (i = 0; i < newData.length; i++) {
            newChartData[ newData[i].month_number - 1 ] = newData[i].orders_count;
          }
          ordersChart = buildChart(
            'orders-chart',
            'orders',
            newChartData,
            '# of Orders',
            'blue'
          );
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // Build the Saved Designs Chart
  var savedDesignsChart = buildChart(
    'saved-designs-chart',
    'saved_designs',
    [{{ implode(',', $saved_designs_stats) }}],
    '# of Saved Designs',
    'orange'
  );

  $('#saved-designs-select-year').on('change', function(){
    var year = $(this).val();
    savedDesignsChart.destroy();
    $.ajax({
      url: 'https://' + apiHost + '/api' + endpoints.saved_designs + year,
      method: 'GET',
      dataType: 'JSON',
      success: function(response) {
        if (response.success) {
          var newData = response.saved_designs;
          var newChartData = [0,0,0,0,0,0,0,0,0,0,0,0];
          for (i = 0; i < newData.length; i++) {
            newChartData[ newData[i].month_number - 1 ] = newData[i].saved_designs_count;
          }
          savedDesignsChart = buildChart(
            'saved-designs-chart',
            'saved_designs',
            newChartData,
            '# of Saved Designs',
            'orange'
          );
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // Build the Users Chart
  var usersChart = buildChart(
    'users-chart',
    'users',
    [{{ implode(',', $users_stats) }}],
    '# of Users',
    'violet'
  );

  $('#users-select-year').on('change', function(){
    var year = $(this).val();
    usersChart.destroy();
    $.ajax({
      url: 'https://' + apiHost + '/api' + endpoints.users + year,
      method: 'GET',
      dataType: 'JSON',
      success: function(response) {
        if (response.success) {
          var newData = response.users;
          var newChartData = [0,0,0,0,0,0,0,0,0,0,0,0];
          for (i = 0; i < newData.length; i++) {
            newChartData[ newData[i].month_number - 1 ] = newData[i].users_count;
          }
          usersChart = buildChart(
            'users-chart',
            'users',
            newChartData,
            '# of Users',
            'violet'
          );
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

})();

</script>

@endsection