<div id="view-order-info">

    <a class="btn" href="/my-orders"><< back to My Orders</a>  

    <div class="header">

        Order Info (Beta)<span class="orderID"></span> <br />
        <em>This customizer is still under development. You can use most of the facilities of the customizer, but if you saved or submitted an order please make sure that your Prolook sales rep knows about the submission.</em>

    </div>

    <div class="order-tabs">
        
        <span class="tab active" data-type="main-info">Main Info</span>

        <span class="tab" data-type="custom-artwork-request-status">Custom Artwork Requests</span>

        <span class="tab" data-type="status-thread">Status Thread</span>

        <span class="tab" data-type="pdf">PDF</span>

    </div>    

    <!-- Main Info -->
    <div class="order-info main-info">

        <div class="row">
            
            <div class="col-md-12 view-order-thumbnails">

                <img class='grow thumbs right' /> 

                <img class='grow thumbs front' /> 

                <img class='grow thumbs back' /> 

                <img class='grow thumbs left' /> 

            </div>

        </div>


        <div class="row">
            
            <div class="col-md-12 view-order-link-container">

                <label>View submitted design for this order</label><br />
                <a href="" class="view-submitted-design" target="_new"></a>

            </div>

        </div>

        <div class="row"> <!-- Start Row -->

            <div class="col-md-12"> 

                <!-- Column 1 -->
                <div class="col-md-6">

                    <h3>STATUS</h3>
                    <hr />

                    <div class="row">

                        <div class="col-md-12">
                            
                            <br />
                            <label for="status">Status</label><br />
                            <span class="field-value status"></span>

                        </div>

                    </div>

                     <div class="row">

                        <div class="col-md-12">
                            
                            <br />
                            <label for="status">Custom Artwork Status</label>
                            
                            <br />

                            <span class="field-value custom-artwork-status"></span><br /><br />
                            <span class="field-value last-message"></span> <br /><br />
                            
                            <span class="field-value edit-order-link">
                                Edit Link:
                                <a href="" class="view-submitted-design edit-order-link" target="_new"></a>
                            </span>

                        </div>

                    </div>

                    <br />

                    <h3>Order Description</h3>
                    <hr />

                    <div class="row">

                        <div class="col-md-12">
                            <br />
                            <label for="orderID">Order ID </label><br />
                            <span class="field-value order-id"></span>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-12">
                            <br />
                            <label for="email">Description</label><br />
                            <span class="field-value description"></span>
                        </div>

                    </div>
    
                </div>
                <!-- End Column 1 -->

                <!-- Column 2 -->
                <div class="col-md-6">

                    <h3>Additional Notes and Attachments</h3>
                    <hr />

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="orderID">Additional Notes </label><br />
                            <span class="field-value notes"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            
                            <br />
                            <label for="email">Attachments</label><br />
                            
                            <span class="field-value attachments">
                                <img class="grow attachments" src="" />

                                <br /><br />
                                <a class='download-attachment' target="_new">Download / Open File in new Tab</a>

                            </span>

                        </div>
                    </div>

                </div>
                <!-- End Column 2 -->

            </div>

        </div> <!-- End Row -->

        <div class="row">

            <br /><br />
            <hr />
            <em class="note">Note: You can click on the thumbnails to view a larger a version of the images.</em>

        </div>
        
    </div>
    <!-- End Main Info -->

    <!-- Custom Artwork Request -->
    <div class="order-info custom-artwork-request-status">

        <!-- Start Row -->
         <div class="row"> 

            <!-- Column 1 -->
            <div class="col-md-9">

                <h3>Custom Artwork Requests</h3>
                <hr />

                <div class="row">
    
                    <div class="col-md-12">
                        
                        <br />
                        <label for="status">Custom Artwork Status</label>
                        <br />
                        
                        <span class="field-value custom-artwork-status"></span>
                        <br />

                        <span class="custom-artwork-applications"></span>
                        <br />

                    </div>

                </div>

                <div class="row">
    
                    <div class="col-md-12">

                        <br /><br />

                        <em>Notes: </em>
                        <br /><br />
                        
                        <p>      
                            <em>Custom artwork requests status can be viewed on this page if your order has one submitted.</em>
                        </p> 
                        
                        <p>
                            <em>

                                Sometimes a custom artwork requested gets rejected for a number of reasons such as the resolution of the image is too low to be converted to a vector file. In that case the [Update Image] button will be enabled so you can upload a new one. Reasons for rejection is indicated on the Notification Thread on the right.

                            </em>
                        </p>

                        <p>
                            You can click on the thumbnails to view a larger a version of the images.</em>
                        </p>

                    </div>

                </div>

                <br />

            </div>
            <!-- End Column 1 -->

            <!-- Column 2 -->
            <div class="col-md-3">

                <h3>Notification Thread</h3>

                <hr />
            
                <div class="car-notification-thread-container">
                    


                </div>

            </div>
            <!-- End Column 2 -->

        </div>
        <!-- End Row -->

    </div>
    <!-- End Custom Artwork Request -->


    <!-- Status Thread -->
    <div class="order-info status-thread">

        <!-- Start Row -->
         <div class="row"> 

            <div class="col-md-12">

                <p>      
                    <br />
                    <em>All Notification messages and status changes to inform you of your orders .</em>
                </p>

                <br />
                <div class="order-info-messages message-list">
                    
                </div>

            </div>

        </div>
        <!-- End Row -->

    </div>
    <!-- End Status Thread -->

    <!-- PDF -->
    <div class="order-info pdf">

        <!-- Start Row -->
        <div class="row"> 

            <div class="col-md-12"> 

                <div class="col-md-12">

                    <br />
                    <iframe class="pdfViewer" id="pdfViewer"> </iframe>

                </div>

            </div>

        </div>
        <!-- End Row -->

    </div>
    <!-- End Status Thread -->

    <div class="order-info status-thread">
        
    </div>

    <div class="order-info pdf">
        
    </div>

    <div class="my-orders-loading" style="text-align: center;">

        <br /><br />
        Loading Order Info... Please wait. <img src="/images/loading.gif" style="width: 50px"/><br />

    </div>

</div>