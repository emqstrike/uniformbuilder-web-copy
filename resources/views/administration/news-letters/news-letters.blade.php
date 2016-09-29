@extends('administration.lte-main')



@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        News Letters
                   
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered news-letters'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Zip</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($news_letters as $key => $news_letter)
                    
                      <tr class=''>
	                      <td>{{ $news_letter->name }}</td>
	                      <td>{{ $news_letter->email }}</td>
                           <td>{{ $news_letter->contact }}</td>
                          <td>{{ $news_letter->zip }}</td>
	                
	            
                            

                      </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No News Letters
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

<!-- <script type="text/javascript" src="/js/administration/news-letters.js"></script> -->

@endsection
