@extends('administration.lte-main')



@section('content')


<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Accents
                        <small>
                            <a href="/administration/accent/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Accent
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered accents'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Thumbnail</th>
                            <!-- <th>Accent Properties</th> -->
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($accents as $accent)
                      
                      <tr class='accent-{{ $accent->id }} '>
	                      <td>{{ $accent->name }}</td>
	                      <td>{{ $accent->code }}</td>
	                      <td>{{ $accent->thumbnail_path }}</td>
<!-- 	                      <td>{{ $accent->accent_properties }}</td> -->
	                       <td>
							<a href="/administration/accent/edit/{{ $accent->id }}" class="btn btn-primary btn-xs edit-accent" data-accent-id="{{ $accent->id }}" role="button">
							    <i class="glyphicon glyphicon-edit"></i>
							    Edit
							</a>
							<a href="#" class="btn btn-danger pull-right btn-xs delete-accent" data-accent-id="{{ $accent->id }}" role="button">
							    <i class="glyphicon glyphicon-trash"></i>
							    Remove
							</a>
                               
                            

                      </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Accents
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
<script type="text/javascript" src="/js/administration/accents.js"></script>

@endsection
