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

            if (typeof _result === "undefined") {  ub.utilities.error("Can't find url for [" + name + "]");  }

            return ub.config.api_host + '/' + _result.url;

        },

    };

});