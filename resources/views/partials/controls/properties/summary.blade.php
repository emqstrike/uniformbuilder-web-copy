<script type="text/mustache" id="m-summary-dealer">
    <div class="uk-padding-small">
        <div class="save-design-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">1</span> Save Design</h6>
            <form id="save-design-form">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-2-3">
                        <label class="uk-form-label" for="form-stacked-text">Design Name</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small design-name" type="text" placeholder="Design Name">
                        </div>
                    </div>

                    <div class="uk-width-1-3">
                        <label class="uk-form-label" for="form-stacked-text">ID</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small design-id" type="text" placeholder="0000" readonly="true">
                        </div>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label class="uk-form-label" for="form-stacked-text">Notes</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea design-notes" rows="3" style="resize: none !important"></textarea>
                    </div>
                </div>
                <button class="uk-button uk-button-small fc-white save-my-design bgc-darkGray abrade-ultra-italic" type="button">Save</button>
            </form>
        </div>
        <hr class="uk-margin-small">
        <div class="cart-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">2</span> Add to Cart</h6>
            <div class="uk-flex uk-flex-right">
                <div class="uk-width-1-2">
                    <button href="javascript:void(0)" class="uk-button uk-button-small abrade-ultra-italic bgc-darkGray fc-white uk-text-uppercase uk-width-1-1 uk-margin-small-bottom">Add To Cart</button>
                    <button href="javascript:void(0)" class="uk-button uk-button-small abrade-ultra-italic bgc-darkGray fc-white uk-text-uppercase uk-width-1-1 uk-margin-small-bottom">Go to cart</button>
                    <button href="javascript:void(0)" class="uk-button uk-button-small abrade-ultra-italic bgc-darkGray fc-white uk-text-uppercase uk-width-1-1">back to designer</button>
                </div>
            </div>
        </div>
        <hr class="uk-margin-small">
        <div class="send-design">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">3</span> Email</h6>
            <form id="send-email">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-1 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Email Address</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small receiver-email" type="email">
                        </div>
                    </div>
                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Name</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-name" type="text">
                        </div>
                    </div>

                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Email Address</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-email" type="email">
                        </div>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label class="uk-form-label" for="form-stacked-text">Message</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea sender-message" rows="2" style="resize: none !important"></textarea>
                    </div>
                </div>
                <button class="uk-button uk-button-small fc-white save bgc-darkGray abrade-ultra-italic send-design-button" type="button">Send</button>
            </form>
        </div>
        <hr class="uk-margin-small">
        <div class="share-design">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">4</span> Share</h6>
            <div>
                <a href="" class="uk-icon-button uk-margin-small-right bgc-darkGray fc-white" uk-icon="facebook"></a>
                <a href="" class="uk-icon-button  uk-margin-small-right bgc-darkGray fc-white" uk-icon="linkedin"></a>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-summary-player">
    <div class="uk-padding-small">
        <div class="save-design-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">1</span> Save Design</h6>
            <form id="save-design-form">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-2-3">
                        <label class="uk-form-label" for="form-stacked-text">Design Name</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small design-name" type="text" placeholder="Design Name">
                        </div>
                    </div>

                    <div class="uk-width-1-3">
                        <label class="uk-form-label" for="form-stacked-text">ID</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small design-id" type="text" placeholder="0000" readonly="true">
                        </div>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label class="uk-form-label" for="form-stacked-text">Notes</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea design-notes" rows="3" style="resize: none !important"></textarea>
                    </div>
                </div>
                <button class="uk-button uk-button-small fc-white save-my-design bgc-darkGray abrade-ultra-italic" type="button">Save</button>
            </form>
        </div>
        <hr class="uk-margin-small">
        <div class="send-design-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">3</span> Email</h6>
            <form id="send-email">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-1 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Email Address</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small receiver-email" type="email">
                        </div>
                    </div>
                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Name</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-name" type="text">
                        </div>
                    </div>

                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Email Address</label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-email" type="email">
                        </div>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label class="uk-form-label" for="form-stacked-text">Message</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea sender-message" rows="2" style="resize: none !important"></textarea>
                    </div>
                </div>
                <button class="uk-button uk-button-small fc-white save bgc-darkGray abrade-ultra-italic send-design-button" type="button">Send</button>
            </form>
        </div>
        <hr class="uk-margin-small">
        <div class="share-design-container>
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">4</span> Share</h6>
            <div>
                <a href="" class="uk-icon-button uk-margin-small-right bgc-darkGray fc-white" uk-icon="facebook"></a>
                <a href="" class="uk-icon-button  uk-margin-small-right bgc-darkGray fc-white" uk-icon="linkedin"></a>
            </div>
        </div>
    </div>
</script>

<script type="text/mustache" id="m-summary-guest">
    <div class="uk-padding-small">
        <div class="save-design-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">1</span> Save Design</h6>
            <div class="registration-container">
                <form id="registration-form">
                    <div class="uk-grid-small uk-child-width-1-2 uk-flex uk-flex-middle" uk-grid>
                        <div class="">
                            <label class="uk-form-label" for="form-stacked-text">Your Name <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small name" type="text" required>
                            </div>
                        </div>
                        <div class="">
                            <label class="uk-form-label" for="form-stacked-text">Your Email Address <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small email" type="email" required>
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <label class="uk-form-label" for="form-stacked-text">Password <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small password" type="password" required>
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <label class="uk-form-label" for="form-stacked-text">Confirm Password <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small confirm-password" type="password" required>
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <a href="javascript:void(0)" class="switch-reg-login abrade-ultra-italic fc-red" data-type="login">Returning User?</a>
                        </div>
                        <div class="uk-margin-small">
                            <button class="uk-button uk-button-small fc-white save bgc-darkGray abrade-ultra-italic" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>    

            <div class="login-container uk-hidden">
                <form id="login-customer">
                    <div class="uk-grid-small uk-margin-small uk-child-width-1-2 uk-flex uk-flex-middle" uk-grid>
                        <div>
                            <label class="uk-form-label" for="form-stacked-text">Your Email Address <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small email" type="email" required>
                            </div>
                        </div>
                        <div>
                            <label class="uk-form-label" for="form-stacked-text">Password <span class="fc-red">*</span></label>
                            <div class="uk-form-controls">
                                <input class="uk-input uk-form-small password" type="password" required>
                            </div>
                        </div>
                        <div class="uk-margin-small">
                            <a href="javascript:void(0)" class="switch-reg-login abrade-ultra-italic fc-red" data-type="register">Register?</a>
                        </div>
                        <div class="uk-margin-small">
                            <button class="uk-button uk-button-small fc-white save bgc-darkGray abrade-ultra-italic" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <hr class="uk-margin-small">

        <div class="send-design-container">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">2</span> Send to Dealer</h6>
            <form id="send-email">
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-1 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Dealer Email Address <span class="fc-red">*</span></label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small receiver-email" type="email" required>
                        </div>
                    </div>
                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Name <span class="fc-red">*</span></label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-name" type="text" required>
                        </div>
                    </div>

                    <div class="uk-width-1-2 uk-margin-small">
                        <label class="uk-form-label" for="form-stacked-text">Your Email Address <span class="fc-red">*</span></label>
                        <div class="uk-form-controls">
                            <input class="uk-input uk-form-small sender-email" type="email" required>
                        </div>
                    </div>
                </div>
                <div class="uk-margin-small">
                    <label class="uk-form-label" for="form-stacked-text">Message <span class="fc-red">*</span></label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea sender-message" rows="2" style="resize: none !important" required></textarea>
                    </div>
                </div>
                <button class="uk-button uk-button-small fc-white save bgc-darkGray abrade-ultra-italic send-design-button" type="submit">Send</button>
            </form>
        </div>

        <hr class="uk-margin-small">
        
        <div class="share-design">
            <h6 class="uk-text-bold uk-text-uppercase uk-margin-small"><span class="number-circle bgc-darkGray abrade-ultra-italic">4</span> Share</h6>
            <div>
                <a href="" class="uk-icon-button uk-margin-small-right bgc-darkGray fc-white" uk-icon="facebook"></a>
                <a href="" class="uk-icon-button  uk-margin-small-right bgc-darkGray fc-white" uk-icon="linkedin"></a>
            </div>
        </div>
    </div>
</script>