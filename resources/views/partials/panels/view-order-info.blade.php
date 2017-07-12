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

        <div class="row"> <!-- Start Row -->

            <div class="col-md-12"> 

                 <div class="col-md-6">

                    <h3>Order Description</h3>
                    <hr />

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="orderID">Order ID </label><br />
                            <span class="order-id"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="email">Description</label><br />
                            <span class="description"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="pdf">PDF</label><br />
                            <span class="pdf"><a href='' class="pdfOrderForm"></a></span>
                        </div>
                    </div>

                    <br />

                    <h3>Status</h3>
                    <hr />

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="status">Status</label><br />
                            <span class="status"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <br />
                            <label for="status">Custom Artwork Status</label><br />
                            <span class="custom-artwork-status"></span>
                        </div>
                    </div>

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


</div>