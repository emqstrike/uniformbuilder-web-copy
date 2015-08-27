$(document).ready(function(){
    modalConfirm = function(title, message, value, className)
    {
        className = typeof className !== 'undefined' ? className : 'confirm-yes';
        $('#confirmation-modal .modal-title').text(title);
        $('#confirmation-modal .modal-body').text(message);
        $('#confirmation-modal .' + className).data('value', value);
        $('#confirmation-modal').modal('show');
    }

    function showAlert(msg) {
	    $('.flash-alert .flash-title').text('Alert');
	    $('.flash-alert .flash-sub-title').text('Error');
	    $('.flash-alert .flash-message').text(msg);
	    $('.flash-alert').addClass('alert-warning');
	    $('.flash-alert').show();
	}
});