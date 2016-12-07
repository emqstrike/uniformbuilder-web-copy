@extends('administration.lte-main')



@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Mockup Sets
                        <small>
                            <a href="/administration/accent/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                              <!--   Add New Accent -->
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered accents'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sales Agent</th>
                            <th>Coach</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($mockup_sets as $key => $mockup_set)
                        <tr>
                                <td><a href=" /administration/mockup_set/{{ $mockup_set->id }} ">{{ $mockup_set->name }}</a></td>  
                                <td>{{ $mockup_set->sales_agent->first_name }}</td>  
                                <td>{{ $mockup_set->coach->first_name }}</td>  
                                <td>{{ $mockup_set->notes }}</td>  
                              
                               
                  

                        </tr>
                   
                    @empty

                        <tr>
                            <td colspan='4'>
                                No Mockup Sets
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
