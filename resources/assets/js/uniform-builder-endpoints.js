$(document).ready(function() {

    ub.endpoints = {

        items: [

            {
                name: 'Get Sales Rep by Zip Code',
                code: 'getSalesRepByZipCode',
                url:  'api/sales_reps/get_by_zipcode/',
                info: 'Concatenate Zip Code at the end of the url to get sales reps on those areas.',
            },
            {
                name: 'Get All Sales Rep',
                code: 'getAllSalesReps',
                url:  'api/sales_reps/',
                info: 'Get All Sales Rep (no parameters)',
            },
            {
                name: 'Get Order Info',
                code: 'getOrderInfoByOrderID',
                url:  'api/order/orderId/',
                info: 'Concatenate Order Code at the end of the url to get order info.',
            },
            {
                name: 'Get Order Items',
                code: 'getOrderItemsByOrderID',
                url:  'api/order/items/',
                info: 'Concatenate Order Code at the end of the url to get order items.',
            },
            {
                name: 'Get Order Items',
                code: 'getOrderItemsByOrderID',
                url:  'api/order/items/',
                info: 'Concatenate Order Code at the end of the url to get order items.',
            },
            {
                name: 'Get Messages By Recipient ID',
                code: 'getMessagesByRecipientID',
                url:  'api/messages/recipient/',
                info: 'Concatenate Recepient ID at the end of the URL to get the messages .',
            },
            {
                name: 'Update Artwork Status',
                code: 'updateArtworkStatus',
                url:  'api/order/updateArtworkStatus',
                info: 'Pass Order ID and Status.',
            },
            {
                name: 'Update Order Item',
                code: 'updateOrderItem',
                url:  'api/orders/updateOrderItem',
                info: 'Pass the key value pair',
            },
            {
                name: 'Get Orders w/ Items',
                code: 'getOrdersWItems',
                url:  'api/order/orderswItems/',
                info: 'Concatenate Order ID at the end of the URL to get the order details.',
            },
            {
                name: 'Update Artwork Request',
                code: 'updateArtworkRequest',
                url:  'api/artwork_request/update/',
                info: 'Post artwork id, order code and approve value',
            },
            {
                name: 'Get Cut Links',
                code: 'getCutLinks',
                url:  'api/cut_links/',
                info: 'Get PDF Urls',
            },
            {
                name: 'Get Mascot Scales',
                code: 'getMascotScales',
                //url: 'api/v1-0/mascot_sizes', // old endpoint
                url: 'api/v1-0/get_mascot_size',
                info: 'Get Mascot Scales',
            },
            {
                name: 'Create New Embellishment Data',
                code: 'createNewEmbellishmentData',
                url: 'api/v1-0/inksoft_design',
                info: 'Create New Embelishment Data',
            },
            {
                name: 'Update Custom Artwork',
                code: 'updateCustomArtwork',
                url: 'api/v1-0/inksoft_design/update',
                info: 'Update Custom Artwork',
            },
        ],

        getUrl: function (code) {

            var _result = _.find(this.items, {code: code});
            var _url = '';

            if (typeof _result === "undefined") { ub.utilities.error("Can't find url for [" + name + "]"); } 

            return _result;

        },

        getFullUrlString: function (code)  {

            var _result = _.find(this.items, {code: code});
            var _url = '';

            if (typeof _result === "undefined") {  ub.utilities.error("Can't find url for [" + code + "]");  }

            return ub.config.api_host + '/' + _result.url;

        },

        fetch: function (str, parameters, cb) {

            $.ajax({

                url: ub.endpoints.getFullUrlString(str) + parameters,
                type: "GET",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    if (response.success) {
                        cb(response);
                    }

                }
                
            });

        },

        fetchPOST: function (str, parameters, cb) {

            var _url = ub.endpoints.getFullUrlString(str);

            $.ajax({

                url: _url,
                data: JSON.stringify(parameters),
                type: "POST",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    if (response.success) {

                        ub.displayDoneAt('Mascot Sizes Loaded ...');
                        cb(response);
                        
                    } else {
                        
                        if (ub.devtools.debugMode) {

                            console.log(' ');
                            console.error('URL String: ' + _url);
                            console.error('No Mascot Size detected for the following parameters: ');
                            console.error(parameters);
                            console.log(' ');

                        }

                    }

                }, 

            });

        }


    };

    window.ubep = ub.endpoints;

});