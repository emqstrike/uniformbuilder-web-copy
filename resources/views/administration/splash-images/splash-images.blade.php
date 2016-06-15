@extends('administration.lte-main')



@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Splash Image
                <!--         <small>
                            <a href="/administration/accent/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Accent
                            </a>
                        </small> -->
                    </h1>
                </div>
                <div class="box-body">
                	@forelse ($splash_images as  $splash_image)
                	<td>{{ $splash_image->thumbnail_path }}</td>


                    @empty

                        <tr>
                            <td colspan='4'>
                                No Splash Image
                            </td>
                        </tr>
                	@endforelse
	                <form method="POST" action="/administration/splash_image/add" enctype="multipart/form-data">
                	   <input type="hidden" name="_token" value="{{ csrf_token() }}">
                	   <fieldset class="form-group">
                            <label for="formGroupExampleInput">Spash Image : </label>
                              <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                        </fieldset> 
                        <fieldset class="form-group">
                        <button class="btn btn-dafault">Add Flash Image</button>
                        </fieldset> 


	                </form>
                </div>
            </div>
        </div>
    </div>
</section>
	
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript">
  
</script>
<!-- <script type="text/javascript" src="/js/administration/accents.js"></script> -->

@endsection
