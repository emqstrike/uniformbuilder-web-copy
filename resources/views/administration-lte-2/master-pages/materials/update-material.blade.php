@extends('administration-lte-2.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
               
                <div class="panel-heading">Update Material</div>

                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/material/styles_to_materials" enctype="multipart/form-data" id='edit-material-form'>
                        <div class="row">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <label class="col-md-2 control-label text-right" required>Material ID</label>
                            <div class="col-md-2">
                                <input type="text" class="input-material-id form-control" name="material-id">
                            </div>
                            <label class="col-md-2 control-label text-right">Style ID</label>
                            <div class="col-md-2">
                                <input type="text" class="input-style-id form-control"  name="style-id">
                            </div>
                            <label class="col-md-2 control-label text-right">Rule ID</label>
                            <div class="col-md-2">
                                <input type="text" class="input-rule-id form-control" name="rule-id">
                            </div>
                            <input type="hidden" class="valid-material-id form-control" name="validmaterial" value='0'>
                            <input type="hidden" class="valid-rule-id form-control" name="rule-id-valid" value='0'>
                            <input type="hidden" class="valid-style-id form-control" name="style-id-valid" value='0'>

                        </div>
                        <br>
                        <div class="row" >
                            <div class="col text-center">
                                <button type="submit" class="btn btn-flat btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script>

    $('.edit-material').on('click', function(event){
       
        event.preventDefault(); 

        var rule_id =  $('.input-rule-id').val();
        var style_id =  $('.input-style-id').val();
        var material_id =  $('.input-material-id ').val();

        var url = "//"+ qx7_host +"/api/rule/" +rule_id;
        var url2 = "//"+api_host+"/api/material_option/" + material_id + "/material";
        var url3 = "//"+api_host+"/api/material/" +  material_id;
        
        var ptitle = "";
        var ptext = "";
        var ptype = "";

        if(rule_id && style_id && material_id){
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    if(data['success']){
                        $('.valid-rule-id').val('1');
                    }else{
                        $('.valid-rule-id').val('0');
                    }
                }
            });

            $.ajax({
                url: url2,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    if(data['success']){
                        $('.valid-style-id').val('1');
                    }else{
                        $('.valid-style-id').val('0');
                    }
                }
            });
            
            $.ajax({
                url: url3,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    if(data['success']){
                        $('.valid-material-id').val('1');
                    }else{
                        $('.valid-material-id').val('0');
                    }
                }
            });

            if($('.valid-style-id ').val() ==1){
                ptitle = 'Material Options Found(Material ID: '+ material_id +')';
                ptext = 'Updating Material_Options Style_ID';
                ptype = 'success';
            }else{
                ptitle = 'No Material Options Found(Material ID: '+ material_id +')';
                ptext = 'No Data To Update';
                ptype = 'info';
            }

            new PNotify({
                title:  ptitle,
                text: ptext,
                type:  ptype,
                hide: true
            });

            if($('.valid-rule-id').val() ==1 && $('.valid-material-id').val() ==1){
                ptitle = 'Material Exist (Material ID: '+ material_id +')';
                ptext = 'Updating Material Rule Id';
                ptype = 'success';
            }else if($('.valid-material-id').val() ==0 ){
                ptitle = 'Material Doesnt Exist (Material ID: '+ material_id +')';
                ptext = 'Cannot Update Material Rule ID';
                ptype = 'info';
                
            }else{
                ptitle = 'Rule ID is Invalid (Rule ID: '+ rule_id +')';
                ptext = 'Cannot Update Material Rule ID';
                ptype = 'error';
            }

            new PNotify({
                title:  ptitle,
                text: ptext,
                type:  ptype,
                hide: true
            });
            
            $('#edit-material-form').submit();

        }else{
            ptitle = 'Please Fill out the form';
            ptext = 'Complete The form';
            ptype = 'info';
            new PNotify({
                title:  ptitle,
                text: ptext,
                type:  ptype,
                hide: true
            });
        }
    });
</script>

@endsection

@section('custom-scripts')
<script src="/js/administration-lte-2/styles/style-configurator.js"></script>
@endsection
