 <div id="main-picker-container">

        <div id="topbar">

            <span class="slink main-picker-items my-favorites" data-picker-type="gender" data-item="My-Favorites"><i class="fa fa-star" aria-hidden="true"></i> My Favorites (<span class="count">0</span>)</span>

            <!-- <span class="slink main-picker-items back-link" data-picker-type="gender" data-item="Home"><i class="fa fa-home" aria-hidden="true"></i></span> -->
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Men" style="margin-left: -13px;">Men</span>
            <span class="slink main-picker-items" data-picker-type="gender" data-item="Women">Women</span>
            <!-- <span class="slink main-picker-items" data-picker-type="gender" data-item="Youth">Youth</span> -->

            <span class="slink main-picker-items loading" data-picker-type="gender" data-item="Loading">
               <img src="/images/loading.gif" width="50" height="50" />
            </span>

            <span class="slink-search">

                <i class="fa fa-search fa-search-icon" aria-hidden="true"></i>
                <input id="search_field" type='text' class="typeahead" placeholder="Preparing search, please wait..." disabled></input>

            </span>

        </div>

        <!-- Picker version 2 -->
        <main class="cd-main-content">

            <div class="cd-tab-filter-wrapper">
                <div class="cd-tab-filter">
                    <ul class="cd-filters">
                        <li class="placeholder"> 
                            <a data-type="all" href="#0">All</a> <!-- selected option on mobile -->
                        </li> 
                        <li class="filter"><a class="selected picker-slink" href="javascript:void(0)" data-type="all">All</a></li>
                        <li class="filter" data-filter=".upper"><a class="picker-slink" href="javascript:void(0)" data-type="upper">Jersey</a></li>
                        <li class="filter" data-filter=".lower"><a class="picker-slink" href="javascript:void(0)" data-type="lower">Pants</a></li>
                    </ul> <!-- cd-filters -->
                </div> <!-- cd-tab-filter -->
            </div> <!-- cd-tab-filter-wrapper -->

            <section class="cd-gallery" id="picker-items-container">
                <ul></ul>
                <div class="cd-fail-message">No results found</div>
            </section> <!-- cd-gallery -->

            <div class="cd-filter">
                <form>
                    <div class="cd-filter-block">
                        <h4>Search</h4>
                        
                        <div class="cd-filter-content" style="width: 90%">
                            <input type="search" placeholder="Search uniform">
                        </div> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->

                    <!-- Gender -->
                    <div class="cd-filter-block">
                        <h4>Gender</h4>

                        <ul class="cd-filter-content cd-filters list">
                            <li>
                                <input class="filter gender-type" type="radio" name="genderButton" id="menRadioButton" data-gender="men" checked>
                                <label class="radio-label" for="menRadioButton">Men</label>
                            </li>

                            <li>
                                <input class="filter gender-type" type="radio" name="genderButton" id="womenRadioButton" data-gender="women">
                                <label class="radio-label women-label" for="womenRadioButton">Women</label>
                            </li>

                            <!-- <li>
                                <input class="filter" data-filter="" type="radio" name="" id="">
                                <label class="radio-label" for="unisex">Unisex</label>
                            </li> -->
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Gender -->

                    <!-- Gender -->
                    <div class="cd-filter-block">
                        <h4>Uniform Type</h4>

                        <ul class="cd-filter-content cd-filters list">
                            <li>
                                <input class="filter uniform-type" type="radio" name="uniformTypeButton" id="sportsRadioButton" data-category="sports" checked>
                                <label class="radio-label" for="sportsRadioButton">Sports</label>
                            </li>

                            <li>
                                <input class="filter uniform-type" type="radio" name="uniformTypeButton" id="apparelRadioButton" data-category="apparel">
                                <label class="radio-label" for="apparelRadioButton">Apparel</label>
                            </li>

                            <li>
                                <input class="filter uniform-type" type="radio" name="uniformTypeButton" id="esportsRadioButton" data-category="esports">
                                <label class="radio-label esports-label" for="esportsRadioButton">eSports</label>
                            </li>
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Gender -->

                    <!-- Sports -->
                    <div class="cd-filter-block">
                        <h4>Sports</h4>
                        
                        <div class="cd-filter-content">
                            <div class="cd-select cd-filters">
                                <select name="sportSelect" id="cd-sport">
                                    <option value="">Choose sport</option>
                                </select>
                            </div> <!-- cd-select -->
                        </div> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Sports -->

                    <!-- Application Type -->
                    <div class="cd-filter-block">
                        <h4>Application Type</h4>

                        <ul class="cd-filter-content cd-filters list">
                            <li>
                                <input class="filter uniform-application-type" data-filter="" type="radio" name="uniformApplicationTypeButton" id="allRadioButton" data-type="all" checked>
                                <label class="radio-label" for="allRadioButton">All</label>
                            </li>

                            <li>
                                <input class="filter uniform-application-type" data-filter=".tackle_twill" type="radio" name="uniformApplicationTypeButton" id="tackleTwillRadioButton" data-type="tackle_twill">
                                <label class="radio-label" for="tackleTwillRadioButton">Tackle Twill</label>
                            </li>

                            <li>
                                <input class="filter uniform-application-type" data-filter=".sublimated" type="radio" name="uniformApplicationTypeButton" id="sublimatedRadioButton" data-type="sublimated">
                                <label class="radio-label" for="sublimatedRadioButton">Sublimated</label>
                            </li>
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Application Type -->

                    <!-- Block Pattern -->
                    <div class="cd-filter-block">
                        <h4>Block Pattern</h4>
                        
                        <div class="cd-filter-content">
                            <div class="cd-select cd-filters">
                                <select class="filter" name="blockPatternSelect" id="cd-block-pattern">
                                    <option value="" data-item="all">All</option>
                                </select>
                            </div> <!-- cd-select -->
                        </div> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Block Pattern -->

                    <!-- Option -->
                    <div class="cd-filter-block">
                        <h4>Option</h4>

                        <!-- <ul class="cd-filter-content cd-filters list" id="neck-options">
                            <li>
                                <input class="filter" data-filter="" type="radio" name="radioButton" id="radio1" checked="">
                                <label class="radio-label" for="radio1">All</label>
                            </li>
                        </ul> -->

                        <!-- For select option implementation -->
                        <div class="cd-filter-content">
                            <div class="cd-select cd-filters">
                                <select class="filter" name="neckOptionSelect" id="cd-neck-pattern">
                                    <option value="" data-item="all">All</option>
                                </select>
                            </div> 
                        </div> 
                        <!-- end select option implementation -->

                    </div> <!-- cd-filter-block -->
                    <!-- end Option -->

                </form>

                <a href="javascript:void(0)" class="cd-close">Close</a>
            </div> <!-- cd-filter -->

            <a href="javascript:void(0)" class="cd-filter-trigger">Filters</a>

        </main> <!-- cd-main-content -->
        <!-- end Picker version 2 -->

        <div class="secondary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items primary-filters" data-picker-type="gender" data-item="Jersey">Jersey</span>
            <span class="slink main-picker-items primary-filters" data-picker-type="gender" data-item="Pant">Pant</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="separator"> | </span>
            <span class="slink main-picker-items secondary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="Sublimated">Sublimated</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="Twill">Tackle Twill</span>
            <span class="slink main-picker-items secondary-filters" data-picker-type="gender" data-item="Knitted">Knitted</span>

        </div>

        <div class="tertiary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>
            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="Infused 14">INFUSED 14</span>

        </div>

        <div class="quarternary-bar">

            <span class="slink main-picker-items primary-filters active" data-picker-type="gender" data-item="All">All</span>

        </div>

        <div id="main-picker-scroller">

        </div>

        <div class="uniform_details"><span class="uniform_name">Test:</span><span class="uniform_description"></span></div>

    </div>