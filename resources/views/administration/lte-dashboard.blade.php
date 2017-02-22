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

OrdersChartData.datasets[0].data = [{{ implode(',', $orders_stats) }}];

var orders_ctx = document.getElementById('orders-chart');
var orders_chart = new Chart(orders_ctx, {
  type: 'bar',
  data: OrdersChartData,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

UsersChartData.datasets[0].data = [{{ implode(',', $users_stats) }}];

var users_ctx = document.getElementById('users-chart');
var users_chart = new Chart(users_ctx, {
  type: 'bar',
  data: UsersChartData,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
</script>
@endsection