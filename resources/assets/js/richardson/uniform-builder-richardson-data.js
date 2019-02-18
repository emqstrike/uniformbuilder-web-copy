$(document).ready(function () {
    window.ub = {}
	ub.richardson = {};
	ub.richardson.data = {};

    ub.richardson.data.secondaryLabels = {
        items: [
            {
                blockPattern: 'PTS Signature',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button', 'Faux Button']
            },

            {
                blockPattern: 'PTS Signature',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
            {
                blockPattern: 'PTS Pro Select',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button', 'Faux Button']
            },

            {
                blockPattern: 'PTS Pro Select',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
            {
                blockPattern: 'PTS Select',
                type: 'upper',
                labels: ['BSB V-Neck', '2 Button', 'Full Button']
            },
            {
                blockPattern: 'PTS Select',
                type: 'lower',
                labels: ['Full Length Elastic', 'Full Length Open Cuff', 'Knicker']
            },
        ],

        getLabel: function(blockPattern, type) {
            var _result = _.find(this.items, {blockPattern: blockPattern, type: type});

            if (typeof _result === "undefined") { ub.utilities.info('Secondary Bar Labels not found for ' + sport); }

            return _result.labels;
        }
    }
});