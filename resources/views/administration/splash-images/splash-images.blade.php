@extends('administration.lte-main')



@section('content')
<style type="text/css">
    table.table.table-bordered.splash_images td:nth-child(-n+5) {
        width: 10%;
    }
      table.table.table-bordered.splash_images td:nth-child(1) {
        width: 15%;
    }
</style>>
<script src="">
    

</script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>                       
                        Splash Image
                    </h1>
                      <form method="POST" action="/administration/splash_image/add" enctype="multipart/form-data">
                               <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Name : </label>
                                      <input type="text" class="form-control" name="name" >
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Category : </label>
                                      <input type="text" class="form-control" name="category" >
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Show Time : </label>
                                      <input type="date" class="form-control" name="show_time" >
                                </fieldset>
                               <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Front Image : </label>
                                      <input type="file" class="form-control" name="front_image" accept="image/*">
                                </fieldset> 
                                <fieldset class="form-group">
                                    <label for="formGroupExampleInput">Back Image : </label>
                                      <input type="file" class="form-control" name="back_image" accept="image/*">
                                </fieldset> 
                                <fieldset class="form-group">
                                <button class="btn btn-dafault">Add Flash Image</button>
                                </fieldset> 
                            </form>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered splash_images'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Show Date</th>
                                <th>Front Image</th>
                                <th>Back Image</th>                                
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($splash_images as $key => $splash_image)
                                <tr>
                                    <td>{{ $splash_image -> name  }}</td>
                                    <td>{{ $splash_image -> category  }}</td>
                                    <td>{{ $splash_image -> show_time  }}</td>
                                    <td><img src="{{ $splash_image -> front_image  }}" height="200" width="200"></td>
                                    <td><img src="{{ $splash_image -> back_image  }}" height="200" width="200"></td>
                                    <td></td>
                                </tr>
                            
                            @empty

                                <tr>
                                    <td colspan='4'>
                                        No Splash
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
<script type="text/javascript">
  
</script>
<!-- <script type="text/javascript" src="/js/administration/accents.js"></script> -->

@endsection
