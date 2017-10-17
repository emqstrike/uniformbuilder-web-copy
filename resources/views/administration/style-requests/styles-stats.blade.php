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
                    <h1>
                        <p style="position: absolute; display: inline;" class="style-name">STYLE</p>
                    </h1>
                </div>
                <div class="box-body">
                    <canvas id="myChart" width="400" height="400"></canvas>
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
    </div>
  </div>
</div>

</section>


@include('partials.confirmation-modal-success')

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js"></script>
<script type="text/javascript">
$(function(){

var ctx = $("#myChart");

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});

 });
</script>
@endsection
