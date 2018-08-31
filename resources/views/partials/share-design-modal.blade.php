<!-- Share Design Modal -->
<div class="modal bs-modal-sm in" id="share-design-modal" aria-hidden="false">
    <div class="modal-dialog"> chrome
        <div class="modal-content"> 
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal">×</button> 
                <h4 class="modal-title">Share this design via email</h4> 
            </div> 
            <div class="modal-body">
                <form class='form-vertical'>
                    <div class="form-group">
                        <label>Email Addresses</label>
                        <textarea class='form-control team-email' placeholder='you@example.com, another@example.com &#10;Note: Add comma (,) as separator for more than one email.'></textarea>
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea class='form-control message'>Hello!, Please checkout this uniform i created using Prolook Uniform Customizer.</textarea>
                    </div>
                    <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}"></div>
                </form>
            </div>

            <div class="modal-footer">
                <button class="btn share-uniform-design-by-email">
                    <span class='fa fa-send-o'></span>
                    Send Email
                </button>
                <button class="btn close-share-uniform-design-modal" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>