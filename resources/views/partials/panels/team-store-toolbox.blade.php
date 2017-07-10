<div id="team-store-toolbox" data-teamstore-api="{{ env('TEAM_STORE_API_BASE_URL') }}">
    
    <div class="header">

        <span class="header-text">Team Store Tools</span>

        <span class="close">
                
            <i class="fa fa-times" aria-hidden="true"></i><br />

        </span>

    </div>

    <div class="menu">

        <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
            <ul class="nav navbar-nav">

            @if (Session::get('userHasTeamStoreAccount'))

                <li class="open-team-store" data-store="{{ env('TEAM_STORE_BASE_URL') }}/visit-store-by-code/{{ $store_code }}">
                    <span class="fa fa-3 fa-eye"></span>
                    <br>
                    Open Team Store
                </li>
                <li class="update-images">
                    <span class="fa fa-3 fa-floppy-o"></span>
                    <br>
                    Update Images
                </li>
                <li class="add-to-team-store">
                    <span class="fa fa-3 fa-plus-square-o"></span>
                    <br>
                    Add to Team Store
                </li>
                <li class="view-product-page" data-product="{{ env('TEAM_STORE_BASE_URL') }}/visit-product-by-code/{{ $store_code }}/{{ $product_id }}">
                    <span class="fa fa-3 fa-external-link"></span>
                    <br>
                    View Product Page
                </li>
                <li class="open-team-store">
                    <span class="fa fa-3 fa-folder-open-o"></span>
                    <br>
                    Open Products
                </li>

            @else

                <li class="active" class="create-team-store">
                    <a href="{{ env('TEAM_STORE_REGISTRATION_URL') }}/{{ Session::get('teamstore_registration_params') }}">
                        <span class="fa fa-3 fa-eye"></span>
                        <br>
                        Create Team Store
                    </a>
                </li>
                <li class="update-images disabled">
                    <span class="fa fa-3 fa-floppy-o"></span>
                    <br>
                    Update Images
                </li>
                <li class="add-to-team-store disabled">
                    <span class="fa fa-3 fa-plus-square-o"></span>
                    <br>
                    Add to Team Store
                </li>
                <li class="view-product-page disabled">
                    <span class="fa fa-3 fa-external-link"></span>
                    <br>
                    View Product Page
                </li>
                <li class="open-team-store disabled">
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