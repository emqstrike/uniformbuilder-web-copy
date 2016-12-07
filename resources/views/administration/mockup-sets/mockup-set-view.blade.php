@extends('administration.lte-main')



@section('content')


<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Mockup Sets
              
                    </h1>
                </div>
                <form class="form-horizontal" role="form" method="POST" enctype="multipart/form-data" id=''>  
                   <div class="form-group">
                        <label class="col-md-4 control-label">Mockup Set Name</label>
                        <div class="col-md-6">
                            <input type="name" class="form-control " name="name" value="{{ $mockup_set->name }}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Sales Agent</label>
                        <div class="col-md-6">
                            <input type="name" class="form-control " name="name" value="{{ $mockup_set->sales_agent->first_name }}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Coach</label>
                        <div class="col-md-6">
                            <input type="name" class="form-control " name="name" value="{{ $mockup_set->coach->first_name }}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-4 control-label">Notes</label>
                        <div class="col-md-6">
                            <input type="name" class="form-control " name="name" value="{{ $mockup_set->notes }}">
                        </div>
                    </div>
                </form>
            
             
                           
                            
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered accents'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>mockup_set_id</th>
                            <th>material_id</th>
                            <th>saved_design_id</th>
                            <th>notes</th>
                        </tr>
                    </thead>
                    <tbody>

                    
                        @forelse ($mockup_set->mockup_set_items as $key => $mockup_set_item)
                            <tr>
                                <td>{{ $mockup_set_item->id }}</td>  
                                <td>{{ $mockup_set_item->mockup_set_id }}</td>  
                                <td>{{ $mockup_set_item->material_id }}</td> 
                                 <td>{{ $mockup_set_item->saved_design_id }}</td>                                
                                <td>{{ $mockup_set_item->notes }}</td>                                

                            </tr>
                   
                        @empty

                        <tr>
                            <td colspan='4'>
                                No Mockup Set Items
                            </td>
                        </tr>

                    @endforelse

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
	
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

<!-- <script type="text/javascript" src="/js/administration/accents.js"></script> -->

@endsection
