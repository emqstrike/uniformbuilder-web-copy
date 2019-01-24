<script type="text/template" id="dropdown-cart-item-tmpl">
    <% if (cart_items.length > 0) { %>
        <% _.each(cart_items, function(cart_item) { %>
            <a href="/cart-items/1" class="shopping-cart-item" target="_blank">
                <div class="row cp-padding-small">
                    <div class="col-md-3">
                        <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/clinch_13_singlet072763a2c855/thumbnail.jpg?v=0.720" alt="" width="100" height="100">
                    </div>
                    <div class="col-md-9">
                        <h4 class="cp-margin-remove-top cp-text-uppercase cp-text-bold">
                            Clinch
                        </h4>
                        <div>
                            <span>Youth: $53</span><br>
                            <span>Adult: $43</span>
                        </div>
                    </div>
                </div>
                <hr class="cp-margin-remove">
            </a>
        <% }); %>
        <div>
            <a href="<%= shopping_cart_route %>" class="btn checkout-button">See All in My Cart</a>
        </div>
    <% } else { %>
        <a href="/cart-items/1" class="shopping-cart-item" target="_blank">
            <div class="row cp-padding-small">
                <div class="col-md-12">
                    <h4 class="cp-margin-remove-top cp-text-uppercase cp-text-bold">Empty Cart</h4>
                </div>
            </div>
            <hr class="cp-margin-remove">
        </a>
    <% } %>
</script>