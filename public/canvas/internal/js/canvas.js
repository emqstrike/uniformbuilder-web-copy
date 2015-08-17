
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

            var myDropzone = new Dropzone("div#baseDropzone",{url: '/uploadImage'});

            myDropzone.on("addedfile", function(file) {

                if($('#removeUploadedFile').length > 0){
                    $('#removeUploadedFile').click();
                }

                var temp = file.previewTemplate;
                 var FR= new FileReader();
                 FR.onload = function(e) {

                    utils.p(e.target.result,'from call');
                    pc.loadBase(e.target.result); 

                 };

                 FR.readAsDataURL( file );

                var removeButton = Dropzone.createElement("<button id='removeUploadedFile'>Remove file</button>");
                var _this = this;
                removeButton.addEventListener("click", function(e) {
                  e.preventDefault();
                  e.stopPropagation();

                  _this.removeFile(file);
                
                  // If you want to the delete the file on the server as well,
                  // you can do the AJAX request here.

                });

                file.previewElement.appendChild(removeButton);
                

            });
        
        }

        /// End Dropzone


        /// Start Rendering

            pb.renderScene();

        /// End Rendering

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'dblclick', onDocumentDoubleClick, false );


        function onDocumentMouseDown( event ) {

                event.preventDefault();

                utils.p('ok!');
                pb.freeRotate = true;

            
        }

        function onDocumentDoubleClick( event ) {

                event.preventDefault();


                pb.camera.position.x = pb.cameraPositionTo.x;
                pb.camera.position.y = pb.cameraPositionTo.y;
                pb.camera.position.z = pb.cameraPositionTo.z;

                pb.camera.rotation.x =  pb.cameraRotationTo.x;
                pb.camera.rotation.y =  pb.cameraRotationTo.y;
                pb.camera.rotation.z =  pb.cameraRotationTo.z;

                pb.camera.updateProjectionMatrix();

                pb.resetCamera();


            
        }

    });