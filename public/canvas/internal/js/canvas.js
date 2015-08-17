
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

                // Create the remove button
                var removeButton = Dropzone.createElement("<button>Remove file</button>");


                // Capture the Dropzone instance as closure.
                var _this = this;

                // Listen to the click event
                removeButton.addEventListener("click", function(e) {
                  // Make sure the button click doesn't submit the form:
                  e.preventDefault();
                  e.stopPropagation();

                  // Remove the file preview.
                  _this.removeFile(file);
                  // If you want to the delete the file on the server as well,
                  // you can do the AJAX request here.
                });

                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);


                setTimeout(function(){

                    utils.p('ok!')
                    pc.loadBase();

                }, 50);
                

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