@extends('administration.lte-main')
<meta name="csrf-token" content="{{ csrf_token() }}" />
@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<style type="text/css">
    div#box_body {
    overflow-y: scroll;
    max-height: 500px;
}

</style>
<input type="hidden" name="_token" value="{{ csrf_token() }}" id="x-csrf-token">


<section class="content" id="mascots_container_box">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Mascots
                        <small>
                            <a href="/administration/mascot/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot
                            </a>
                        </small>
                        <small>
                            <a href="/administration/mascot/search" class='btn btn-xs btn-primary'>
                                <span class="glyphicon glyphicon-search"></span>
                                Search Mascots
                            </a>
                        </small>
                    </h1>
                    <div class="col-md-12">
                        <h3>Categories</h3>
                    </div>
                    <div id="filters" class="col-md-12 button-group" style="margin-top: 10px;">
                    <button class="button btn-primary" data-filter="*">All</button>
                         <button class="button" data-filter="On">On</button>
                             <button class="button" data-filter="Off">Off</button>
                         @foreach ($mascot_categories as $mascot_category)
                             <button class="button" data-filter="{{ $mascot_category->name }}">{{ $mascot_category->name }}</button>
                         @endforeach                                                               
                     </div>
 
                     <div class="col-md-12">
                     <h3>Sports</h3>
                     </div>
                     <div id="filterSports" class="col-md-12 button-group" style="margin-top: 10px;">
                         <button class="button btn-primary" data-filter="">All</button>
                         @foreach ($sports as $sport)
                             <button class="button" data-filter=".{{ $sport->name }}">{{ $sport->name }}</button>
                         @endforeach 
                    </div>
                    
                        
                    

                </div>
                
                <div class="box-body isotope" id="box_body">
                @forelse ($mascots as $mascot)
                        @if( $mascot->active == 1)
                        <div class="col-md-2 mascot-row On" data-category="{{ $mascot->category }}" @if (isset($mascot->sports)) data-sports="{{ $mascot->sports }}@endif">
                        @else
                        <div class="col-md-2 mascot-row Off " data-category="{{ $mascot->category }}" @if (isset($mascot->sports)) data-sports="{{ $mascot->sports }}@endif"> 
                       
                        
                        @endif
                            <div class="panel panel-default">
                                <div class="panel-heading" style="height: 70px;">
                                <div class="col-md-6">{{ ucfirst($mascot->name) }}</div>
                                <div class="col-md-6">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-mascot" id="switch-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->active) ? 'checked' : '' }}>
                                        <label class="onoffswitch-label" for="switch-{{ $mascot->id }}">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6">typographic</div>
                                <div class="col-md-6">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="onoffswitch2" class="onoffswitch-checkbox toggle-mascot-typographic" id="switch-typographic-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->typographic) ? 'checked' : '' }}>
                                        <label class="onoffswitch-label" for="switch-typographic-{{ $mascot->id }}">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>

                                </div>
                                <div class="panel-body">
                                     @if ($mascot->icon)
                                        <img src="{{ $mascot->icon }}" width="100px" height="100px">
                                    @else
                                        <img src="https://dummyimage.com/100" width="100px" height="100px">
                                    @endif
                                    
                                    <div>
                                        <a href="/administration/mascot/edit/{{ $mascot->id }}" class="btn btn-primary btn-xs edit-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                            <i class="glyphicon glyphicon-edit"></i>
                                            Edit
                                        </a>
                                        <a href="#" class="btn btn-default btn-xs show-mascot" role="button"
                                            data-mascot-name="{{ $mascot->name }}"
                                            data-mascot-id="{{ $mascot->id }}">
                                            <li class="glyphicon glyphicon-info-sign"></li>
                                        </a>
                                        <a href="#" class="btn btn-default pull-right btn-xs delete-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                            <i class="glyphicon glyphicon-trash"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                @empty

                    <p>No mascot found</p>

                @endforelse

                </div>
            </div>
        </div>
    </div>
</section>

<!-- Information Modal -->
<div class="modal fade" id="view-mascot-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-mascot-layers" data-toggle="tab">Layers</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layers" align='center'>
                            <span class="badge mascot-layers-path"></span>
                            <img src="" class="mascot-layers" width="300px" height="300px" style="background: black;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script>
    
  $("#filters button").each(function(i) {
        var filteredMascotClass=($(this).data("filter")).replace(/[\W_]/g,"");

        $(this).attr("data-filter","."+filteredMascotClass);

          if(i==0){
        $(this).attr("data-filter","*");
        }
        });
        $(".mascot-row").each(function(i) {
        var filteredClass=($(this).data("category")).replace(/[\W_]/g,"");

        $(this).attr("data-category",filteredClass);
        $(this).addClass(filteredClass);
          

        });

</script>
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
$(document).ready(function(){
   


    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection