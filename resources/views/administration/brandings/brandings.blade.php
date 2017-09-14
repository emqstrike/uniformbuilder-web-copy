@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Brandings</h3>                                       
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Logo</th>
                            <th>Primary Forecolor</th>
                            <th>Secondary Forecolor</th>
                            <th>Primary Background Color</th>
                            <th>Secondary Background Color</th>                       
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($brandings as $item)
                        <tr class='branding-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->site_name}}    
                            </td>
                            <td>
                            <a href=" {{$item->site_logo}} ">View</a>
                            </td>
                             <td style='background-color: #{{$item->primary_forecolor}}; width: 200px; height: 30px; border: 1px solid #ddd;'>
                                
                            </td>
                            <td style='background-color: #{{$item->secondary_forecolor}}; width: 200px; height: 30px; border: 1px solid #ddd;'>
                                
                            </td>
                             <td style='background-color: #{{$item->primary_background_color}}; width: 200px; height: 30px; border: 1px solid #ddd;'>
                                
                            </td>
                             <td style='background-color: #{{$item->secondary_background_color}}; width: 200px; height: 30px; border: 1px solid #ddd;'>
                                
                            </td>
                            <td class="td-buttons">                                
                                <a href="/administration/brandings/edit/{{$item->id}}" class="edit-branding btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>                            
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='1'>
                                No Record
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

@include('partials.confirmation-modal')
@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/js/administration/parts-aliases.js"></script>

@endsection