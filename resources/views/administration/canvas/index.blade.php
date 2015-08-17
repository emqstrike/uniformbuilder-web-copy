@extends('administration.canvas.canvas-main')

@section('contentarea')

    <div id="prolook_canvas">
        
    </div>

@endsection('contentarea')

@section('modifiers')

    <div id="prolook_modifiers">

        <h3> Base </h3>

        <div id="baseDropzone" class="panel panel-default">
            
            <div class="panel-body">
             
                Drop Image Here...

                <em class="dz-message">
                    
                </em>
                
            </div>

        </div>
        
        <br />        
        <hr />

        <em >
            
            Free rotate on camera is enabled by default, just mouse down on the model and drag, to reset camera position double click on the model.

        </em>


    </div>

@endsection('modifiers')
