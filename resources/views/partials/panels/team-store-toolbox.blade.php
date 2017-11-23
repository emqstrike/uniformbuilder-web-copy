<div id="team-store-toolbox"
    data-teamstore-api="{{ env('TEAM_STORE_API_BASE_URL') }}"
    data-product-id="{{ $product_id }}"
    data-team-name="{{ $team_name }}"
    data-team-colors="{{ $csv_team_colors }}"
    data-team-store-user-id="{{ $team_store_user_id }}">
    
    <div class="header">

        <span class="header-text">
            Team Store Tools
        </span>

        <span class="close">
                
            <i class="fa fa-times" aria-hidden="true"></i><br />

        </span>

    </div>

    <div class="menu">

        <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
            <ul class="nav navbar-nav">

            @if (Session::get('userHasTeamStoreAccount'))

                <li class="open-team-store" data-store="{{ env('TEAM_STORE_BASE_URL') }}/visit-store-by-code/{{ Session::get('team_store_code') }}">
                    <span class="fa fa-3 fa-eye"></span>
                    <br>
                    Open Team Store
                </li>
                @if (!empty($product_id))
                <li class="update-images">
                    <span class="fa fa-3 fa-floppy-o"></span>
                    <br>
                    Update Images
                </li>
                @else
                <li class="disabled">
                    <span class="fa fa-3 fa-floppy-o"></span>
                    <br>
                    Update Images
                </li>
                @endif

                @if (!empty($product_id))
                <li class="disabled">
                    <span class="fa fa-3 fa-plus-square-o"></span>
                    <br>
                    Add to Team Store
                </li>
                @else
                <li class="add-to-team-store">
                    <span class="fa fa-3 fa-plus-square-o"></span>
                    <br>
                    Add to Team Store
                </li>
                @endif

                @if (!empty($product_id))
                <li class="view-product-page" data-product="{{ env('TEAM_STORE_BASE_URL') }}/visit-product-by-code/{{ $store_code }}/{{ $product_id }}">
                    <span class="fa fa-3 fa-external-link"></span>
                    <br>
                    View Product Page
                </li>
                @else
                <li class="disabled">
                    <span class="fa fa-3 fa-external-link"></span>
                    <br>
                    View Product Page
                </li>
                @endif

                <!--
                Disabled until completed
                <li class="open-team-store-products">
                -->
                <li class="open-team-store-manager-products" data-store-manager-products-url="{{ env('TEAM_STORE_BASE_URL') }}/store/manage/products">
                    <span class="fa fa-3 fa-folder-open-o"></span>
                    <br>
                    Open Products
                </li>

            @else

                <li class="create-team-store" data-create-store="{{ env('TEAM_STORE_REGISTRATION_URL') }}/{{ Session::get('teamstore_registration_params') }}">
                    <span class="fa fa-3 fa-eye"></span>
                    <br>
                    Create Team Store
                </li>
                <li class="disabled">
                    <span class="fa fa-3 fa-floppy-o"></span>
                    <br>
                    Update Images
                </li>
                <li class="disabled">
                    <span class="fa fa-3 fa-plus-square-o"></span>
                    <br>
                    Add to Team Store
                </li>
                <li class="disabled">
                    <span class="fa fa-3 fa-external-link"></span>
                    <br>
                    View Product Page
                </li>
                <li class="disabled">
                    <span class="fa fa-3 fa-folder-open-o"></span>
                    <br>
                    Open Products
                </li>

            @endif

            </ul>
        </div>

    </div>

    <br />

    <div class="toolbox-container">
        <p>&nbsp;</p>
    </div>

</div>