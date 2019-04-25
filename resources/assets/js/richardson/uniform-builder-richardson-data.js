$(document).ready(function () {
	ub.richardson = {};
	ub.richardson.data = {};

    ub.richardson.data.secondaryLabels = {
        items: [
            {
                blockPattern: 'pts signature',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button', 'Faux Button']
            },

            {
                blockPattern: 'pts signature',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
            {
                blockPattern: 'pts pro select',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button', 'Faux Button']
            },

            {
                blockPattern: 'pts pro select',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
            {
                blockPattern: 'pts select',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button']
            },
            {
                blockPattern: 'pts select',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
        ],

        getLabel: function(blockPattern, type) {
            var _result = _.find(this.items, {blockPattern: blockPattern.toLowerCase(), type: type});

            if (typeof _result === "undefined") {
                console.log('Secondary Bar Labels not found for ' + blockPattern);
                return;
            }

            return _result.labels;
        }
    }
});