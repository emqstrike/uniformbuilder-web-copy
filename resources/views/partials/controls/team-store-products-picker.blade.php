<!-- Team Store Products -->
<script type="text/mustache" id="team-store-products-template">

@{{#products}}

    <div class="item grow" style="background-image: url('@{{ image_front }}')" data-product-id="@{{ id }}">

        <div class="name" data-product-id="@{{ id }}">
            @{{ name }}
        </div>

    </div>

@{{/products}}

</script>
<!-- End Team Store Products -->

<!-- Team Store Product Picker -->
<script type="text/mustache" id="team-store-products-picker-template">

        <div id="team-store-products-picker" data-status="hidden">

            <div class="header">

                TEAM STORE PRODUCTS

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="team-store-products-list">

                    <span>Loading...</span>
                    <i class="fa fa-circle-o-notch fa-spin fa-6 fa-fw"></i>

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

</script>
<!-- End Team Store Product Picker -->