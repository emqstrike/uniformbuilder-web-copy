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
        <main class="cd-main-content" style="display: none">

            <div class="cd-tab-filter-wrapper">
                <div class="cd-tab-filter">
                    <ul class="cd-filters">
                        <li class="placeholder"> 
                            <a data-type="all" href="#0">All</a> <!-- selected option on mobile -->
                        </li> 
                        <li class="filter"><a class="selected" href="javascript:void(0)" data-type="all">All</a></li>
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
                                <input class="filter" data-filter="" type="radio" name="" id="" checked>
                                <label class="radio-label" for="men">Men</label>
                            </li>

                            <li>
                                <input class="filter" data-filter="" type="radio" name="" id="">
                                <label class="radio-label" for="women">Women</label>
                            </li>

                            <!-- <li>
                                <input class="filter" data-filter="" type="radio" name="" id="">
                                <label class="radio-label" for="unisex">Unisex</label>
                            </li> -->
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Gender -->

                    <!-- Sports -->
                    <div class="cd-filter-block">
                        <h4>Sports</h4>
                        
                        <div class="cd-filter-content">
                            <div class="cd-select cd-filters">
                                <select class="filter" name="" id="selectSport">
                                    <option value="">Choose an option</option>
                                    <option value=".option1">Option 1</option>
                                    <option value=".option2">Option 2</option>
                                    <option value=".option3">Option 3</option>
                                    <option value=".option4">Option 4</option>
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
                                <input class="filter" data-filter="" type="radio" name="uniformApplicationTypeButton" id="all" checked>
                                <label class="radio-label" for="all">All</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".tackle_twill" type="radio" name="uniformApplicationTypeButton" id="tackle_twill">
                                <label class="radio-label" for="tackle_twill">Tacke Twill</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".sublimated" type="radio" name="uniformApplicationTypeButton" id="sublimated">
                                <label class="radio-label" for="sublimated">Sublimated</label>
                            </li>
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Gender -->

                    <!-- Block Pattern -->
                    <div class="cd-filter-block">
                        <h4>Block Pattern</h4>
                        
                        <div class="cd-filter-content">
                            <div class="cd-select cd-filters">
                                <select class="filter" name="blockPatternSelect" id="cd-block-pattern">
                                    <option value="">All</option>
                                </select>
                            </div> <!-- cd-select -->
                        </div> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Block Pattern -->

                    <!-- Option -->
                    <div class="cd-filter-block">
                        <h4>Option</h4>

                        <ul class="cd-filter-content cd-filters list">
                            <li>
                                <input class="filter" data-filter="" type="radio" name="radioButton" id="radio1" checked>
                                <label class="radio-label" for="radio1">All</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2">
                                <label class="radio-label" for="radio2">Choice 2</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3">
                                <label class="radio-label" for="radio3">Choice 3</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2">
                                <label class="radio-label" for="radio2">Choice 2</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3">
                                <label class="radio-label" for="radio3">Choice 3</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2">
                                <label class="radio-label" for="radio2">Choice 2</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3">
                                <label class="radio-label" for="radio3">Choice 3</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2">
                                <label class="radio-label" for="radio2">Choice 2</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3">
                                <label class="radio-label" for="radio3">Choice 3</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio2" type="radio" name="radioButton" id="radio2">
                                <label class="radio-label" for="radio2">Choice 2</label>
                            </li>

                            <li>
                                <input class="filter" data-filter=".radio3" type="radio" name="radioButton" id="radio3">
                                <label class="radio-label" for="radio3">Choice 3</label>
                            </li>
                        </ul> <!-- cd-filter-content -->
                    </div> <!-- cd-filter-block -->
                    <!-- end Option -->

                </form>

                <a href="#0" class="cd-close">Close</a>
            </div> <!-- cd-filter -->

            <a href="#0" class="cd-filter-trigger">Filters</a>

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