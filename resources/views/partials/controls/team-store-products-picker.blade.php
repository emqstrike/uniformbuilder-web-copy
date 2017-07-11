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

                    @{{#products}}

                        <div class="item grow" style="background-image: url('@{{ image_front }}')" data-pattern-id="@{{ id }}">

                            <div class="name">
                                <a href="/builder/0/@{{material_id}}/{{$store_code}}/{{$team_name}}/{{$csv_team_colors}}/PLAYER/23/0/0/0/@{{ id }}">
                                    @{{ name }}
                                </a>
                            </div>

                        </div>

                    @{{/products}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

</script>
<!-- End Team Store Product Picker -->
