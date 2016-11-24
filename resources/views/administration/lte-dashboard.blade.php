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
    <table data-toggle='table' class='data-table table table-bordered patterns'>
      <thead>
          <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
      
          </tr>
      </thead>
      <tbody>
        @foreach ($users as $user)
          <tr>
            <td>{{ $user->id }}</td>
            <td>{{ $user->first_name }}</td>
            <td>{{ $user->last_name }}</td>  
          </tr>
        @endforeach

      </tbody>
    </table>
  </div>


  <!-- <div class="col-lg-3 col-xs-6">
    <div class="small-box bg-yellow">
      <div class="inner">
        <h3 class='user-registration-count'>0</h3>
        <p>User Registrations</p>
      </div>
      <div class="icon">
        <i class="ion ion-person-add"></i>
      </div>
      <a href="/administration/users" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
    </div>
  </div> -->

<!--   <div class="col-lg-3 col-xs-6">
    <div class="small-box bg-green">
      <div class="inner">
        <h3>N</h3>
        <p>Unique Visitors</p>
      </div>
      <div class="icon">
        <i class="ion ion-pie-graph"></i>
      </div>
      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
    </div>
  </div> -->

</div>

<div class="row">
</div>
@endsection