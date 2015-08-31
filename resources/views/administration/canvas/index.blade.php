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


            <a href="https://s3-us-west-2.amazonaws.com/uniformbuilder/sources/arkansas09_reference.psd">Sample Base Photoshop File</a>
            <br />
            <em>Just edit and export as .png or .jpg, drag the resulting file to the box above to see the material applied to the 3d model. For a guide on how to create materials, read <a href="/administration/canvas/texturing-guide">this</a>.</em>
            <br /><br />


            <a href="/images/sources/grayscale.jpg">Sample Base PNG File</a>
            <br />
            <em>Download ( Right-click and save link as... ) this sample export and drag it to the box above.</em>
             <br /><br />
        
        <br />

        <hr />

        <em >
            
            Free rotate on camera is enabled by default, just mouse down on the model and drag, to reset camera position double click on the model.

        </em>


    </div>

@endsection('modifiers')
