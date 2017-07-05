$(document).ready(function() {

    ub.endpoints = {

        items: [

            {
                name: 'Get Sales Rep by Zip Code',
                code: 'getSalesRepByZipCode',
                url:  '/api/sales_reps/get_by_zipcode/',
                desc: 'Concatenate Zip Code at the end of the url to get sales reps on those areas.',
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