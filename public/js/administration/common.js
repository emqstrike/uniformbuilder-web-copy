$(document).ready(function(){
    modalConfirm = function(title, message, value, className, id) {
        className = typeof className !== 'undefined' ? className : 'confirm-yes';
        if (typeof id === 'undefined') {
            id = 'confirmation-modal';
        }
        $('#' + id + ' .modal-title').text(title);
        $('#' + id + ' .modal-body').text(message);
        $('#' + id + ' .delete-yes').addClass(className);
        $('#' + id + ' .' + className).data('value', value);
        $('#' + id).modal('show');
    };

    showAlert = function(msg) {
        $('.flash-alert .flash-sub-title').text('Error: ');
        $('.flash-alert .flash-message').text(msg);
        $('.flash-alert').addClass('alert-warning');
        $('.flash-alert').show();
    };

    flashAlertFadeOut = function() {
        setTimeout(function(){
            $('.flash-alert').fadeOut();
        }, 3000);
    };

    $('.data-table').DataTable();
});