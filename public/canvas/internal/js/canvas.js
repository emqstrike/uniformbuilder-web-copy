
    $( document ).ready(function() {


        /// Material Canvas, For Direct Material Editing
        /// TODO: Transfer this to a tab

            $("#materialCanvasModal").draggable({
                
                handle: ".modal-header",

            });

        /// End Material Canvas


        /// Dropzone 

            Dropzone.autoDiscover = false;

            if ($('div#baseDropzone').length) {

                var myDropzone = new Dropzone("div#baseDropzone", { url: '/uploadImage' } );

                myDropzone.on("addedfile", function(file) {

                    if($('#removeUploadedFile').length > 0){

                        $('#removeUploadedFile').click();

                    }

                    var temp = file.previewTemplate;
                    var FR = new FileReader();
                    
                    FR.onload = function(e) {

                        pc.loadBase(e.target.result); 

                    };

                    FR.readAsDataURL( file );

                    var removeButton = Dropzone.createElement("<button class='btn btn-default btn-sm' id='removeUploadedFile'>Remove</button><br /><br />");
                    var _this = this;

                    removeButton.addEventListener("click", function(e) {
                      
                        e.preventDefault();
                        e.stopPropagation();

                        _this.removeFile(file);

                    });

                    file.previewElement.appendChild(removeButton);
                    
                });
            
            }

        /// End Dropzone


        /// Start Rendering

            pb.renderScene();

        /// End Rendering


        /// Mouse Events

            document.addEventListener( 'mousedown', onDocumentMouseDown, false );
            document.addEventListener( 'dblclick', onDocumentDoubleClick, false );

            function onDocumentMouseDown( event ) {

                pb.freeRotate = true;
                
            }

            function onDocumentDoubleClick( event ) {

                pb.camera.position.x = pb.cameraPositionTo.x;
                pb.camera.position.y = pb.cameraPositionTo.y;
                pb.camera.position.z = pb.cameraPositionTo.z;

                pb.camera.rotation.x =  pb.cameraRotationTo.x;
                pb.camera.rotation.y =  pb.cameraRotationTo.y;
                pb.camera.rotation.z =  pb.cameraRotationTo.z;

                pb.camera.updateProjectionMatrix();
                pb.resetCamera();
                
            }

        /// End Mouse Events

    });