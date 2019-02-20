<script type="text/template" id="dropdown-cart-item-tmpl">
    <% if (cart_items.length > 0) { %>
        <% _.each(cart_items, function(cart_item) { %>
            <a href="/builder/0/<%= cart_item.item_id %>?customizer-uniform" class="shopping-cart-item" target="_blank">
                <div class="row cp-padding-small" style="margin-right: 0">
                    <div class="col-md-3">
                        <img src="<%= cart_item.front_image %>" alt="" width="100" height="100">
                    </div>
                    <div class="col-md-9">
                        <h4 class="cp-margin-remove-top cp-text-uppercase cp-text-bold">
                            <%= cart_item.name %>
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
    <% } else { %>
        <div class="row cp-padding-small" style="margin-right: 0">
            <div class="col-md-12">
                <h4 class="cp-margin-remove-top cp-text-uppercase cp-text-bold">Empty Cart</h4>
            </div>
        </div>
    <% } %>
</script>

<script type="text/template" id="duplicate-items-tmpl">
    <div id="duplicate-items-container">
        <% _.each(duplicate_cart_items, function(cart_items) { %>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h1 class="panel-title"><%= cart_items[0].name %></h1>
                </div>
                <div class="panel-body">
                    <div class="btn-group-vertical btn-block">
                        <% _.each(cart_items, function (item) { %>
                            <button type="button" class="btn btn-default cart-item-btn" data-cart-item-id="<%= item.id %>">
                                <% if (item.left_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.left_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Left</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.front_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.front_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Front</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.back_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.back_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Back</b>
                                        </p>
                                    </div>
                                <% } %>

                                <% if (item.right_image !== null) { %>
                                    <div class="col-md-3">
                                        <img src="<%= item.right_image %>" class="img-responsive" alt="" width="100" />
                                        <p class="text-center">
                                            <b>Right</b>
                                        </p>
                                    </div>
                                <% } %>
                            </button>
                        <% }); %>
                    </div>
                </div>
            </div>
        <% }); %>
    </div>
</script>