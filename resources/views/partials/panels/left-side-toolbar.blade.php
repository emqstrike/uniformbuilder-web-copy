<div id="left-side-toolbar">

    <hr class="left-side-divider middle middle-bottom fav-top" />

    <span class="toolbar-item favorite-btn">
        <i class="fa fa-star-o" aria-hidden="true"></i>
        <span class="toolbar-item-label">FAVORITE</span>
    </span>

    <br />
@if (\Session::has('is_show_teamstore_toolbox'))
    @if (\Session::get('is_show_teamstore_toolbox'))
    <hr class="left-side-divider middle middle-bottom fav-top" />

    <span class="toolbar-item team-store" id="show-team-store-toolbox">
        <i class="fa fa-group" aria-hidden="true"></i>
        <span class="toolbar-item-label">TEAM STORE</span>
    </span>

    <br />
    @endif
@endif

    <hr class="left-side-divider middle middle-bottom" />

    <span class="toolbar-item fullscreen-btn">
        <i class="fa fa-arrows-alt" aria-hidden="true"></i><br />
        <span class="toolbar-item-label">PREVIEW</span>
    </span>        

    <div class="spacer"> </div>  

    <span class="toolbar-item undo-btn">
        <i class="fa fa-undo" aria-hidden="true"></i><br />
        <span class="toolbar-item-label">UNDO</span>
    </span>

    <hr class="left-side-divider middle middle-bottom" />

    <br />

    <span class="toolbar-item resubmit-order-btn">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        <span class="toolbar-item-label">RE-SUBMIT ORDER</span>
    </span>

    <span class="toolbar-item add-art">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
        <span class="toolbar-item-label">
            CREATE ART <br />
            - or -<br />
            UPLOAD FILE
        </span>
    </span>

    <br />

    <span class="toolbar-item approve-reject-artwork-btn">
        <i class="fa fa-check-square-o" aria-hidden="true"></i>
        <span class="toolbar-item-label">APPROVE REJECT ARTWORK</span>
    </span>

    <br />

    <span class="toolbar-item table-btn">
        <i class="fa fa-table" aria-hidden="true"></i><br />
        <span class="toolbar-item-label">FABRIC TEST</span>
    </span>

</div>