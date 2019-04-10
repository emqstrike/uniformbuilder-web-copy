var Shipping = {
    init: function() {
        $('#same-as-client-info').click(Shipping.onCheckSameAsClientInfo);
        $('input[name="full_name"], input[name="athletic_director"], input[name="email"], input[name="phone_number"], input[name="fax"]').keydown(_.throttle(Shipping.onShippingInfoModify, 1000));
    },

    onCheckSameAsClientInfo: function() {
        var _this = $(this);
        _this.button("loading");

        ShoppingCart.clia.getInfo(function(response) {
            if (response.success) {
                var data = response.data;

                $('input[name="full_name"]').val(data.full_name);
                $('input[name="athletic_director"]').val(data.athletic_director);
                $('input[name="email"]').val(data.email);
                $('input[name="phone_number"]').val(data.phone_number);
                $('input[name="fax"]').val(data.fax);

                _this.button("reset");
                _.delay(function() {
                    _this.prop('disabled', true);
                }, 100);
            } else {
                bootbox.alert("Cannot fetch client info this time. Please try again later.");
                _this.button("reset");
            }
        });
    },

    onShippingInfoModify: function() {
        console.log("fsafd");
        if ($('#same-as-client-info').prop('disabled')) {
            $('#same-as-client-info').prop('disabled', false);
        }
    }
};

$(document).ready(Shipping.init);
//# sourceMappingURL=shipping.js.map
