@extends('administration.canvas.canvas-main')

@section('contentarea')
    
    <h3>Texturing Guide</h3>

    <div id="texturing_guide_body">
        
        <p>
            
            1. The <a href="/images/sources/arkansas09_reference.psd">base Photoshop (PSD) Document</a> shows a sample on how to create a good material texture for use with the uniform builder. Download and play around with it, when done, just export it as JPG or PNG and drag it on the Base box in the <a href="/administration/canvas">Prolook Canvas</a> for preview.

        </p>

        <p>
            
        2. One of the most important idea to remember is to separate all logical components (sleeves, piping, etc) into each own layers, as materials and its various options are exported this way in the final texture set.

        </p>

        <p>
            
        3. Base material are should be exported as JPG so it can be optimized to produce lower sizes, material options in the future should be exported as transparent png for correct layering. For now the Canvas tool supports just one base layer.

        </p>

        <hr />
        <a href="/administration/canvas"><-- Back to Prolook Canvas</a>

    </div>

@endsection('contentarea')

@section('modifiers')

    <div id="texturing_guide_index">

       

    </div>

@endsection('modifiers')
