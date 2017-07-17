<div id="view-order-info">


    <a class="btn" href="/my-orders"><< back to My Orders</a>  

    <div class="header">

        Order Info (Beta)<span class="orderID"></span>

    </div>

    <div class="order-tabs">
        
        <span class="tab active" data-type="main-info"> Main Info </span>

        <span class="tab" data-type="status-thread"> Status Thread </span>

        <span class="tab" data-type="pdf"> PDF </span>

    </div>    

    <!-- Main Info -->
    <div class="order-info main-info">

        <div class="row">
            
            <div class="col-md-12 view-order-thumbnails">

                <img class='grow thumbs right' /> 

                <img class='grow thumbs front' /> 

                <img class='grow thumbs back' /> 

                <img class='grow thumbs eft' /> 

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

                    <br />

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
                            </span>
                        </div>
                    </div>
    
                </div>

                <div class="col-md-6">

                    <h3>Custom Artwork Request</h3>
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

                    <br />

                </div>

            </div>

        </div> <!-- End Row -->
        
    </div>
    <!-- End Main Info -->

    <!-- Status Thread -->
    <div class="order-info status-thread">

        <!-- Start Row -->
         <div class="row"> 

            <div class="col-md-12"> 

                <div class="col-md-12">

                    <br />
                    <div class="order-info-messages message-list">
                        
                    </div>

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

        Loading Order Info... Please wait. <img src="/images/loading.gif" style="width: 50px"/><br />

    </div>

    <div class="row">

        <br /><br />
        <hr />
        <em class="note">Note: You can click on the thumbnails to view a larger a version of the images.</em>

    </div>

</div>