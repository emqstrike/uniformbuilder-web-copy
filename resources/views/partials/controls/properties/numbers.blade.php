<script type="text/mustache" id="m-decorations-numbers">
<li class="uk-active">
    <ul id="m-decorations-numbers" class="uk-list uk-list-large uk-list-divider uk-height-max-large uk-overflow-auto uk-padding-small uk-margin-remove">
    	<li class="con-add-view-application">
		    <h5 uk-margin="" class="uk-margin-remove-top uk-margin-small-bottom uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Decoration Numbers</h5>
		    <div class="toggle-decor-number con-add-application uk-active">
		        <h6 uk-margin="" class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark abrade-black">Choose location</h6>
		        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-2 uk-text-center con-select active-bgc-dark uk-grid uk-grid-stack" uk-grid="">
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Front body</button>
		            </div>
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Back body</button>
		            </div>
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Left sleeve</button>
		            </div>
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Right sleeve</button>
		            </div>
		        </div>
		        <h6 uk-margin="" class="uk-margin-small uk-margin-remove-horizontal uk-text-bold uk-text-uppercase fc-dark abrade-black">Choose perspective</h6>
		        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-3 uk-text-center con-select active-bgc-dark uk-margin-medium-bottom uk-grid uk-grid-stack" uk-grid="">
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Front number</button>
		            </div>
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Back number</button>
		            </div>
		            <div class="">
		                <button href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">Sleeve number</button>
		            </div>
		        </div>
		    </div>

		    <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-toggle uk-grid" uk-grid="">
		        <div class="uk-width-1-2 uk-first-column">
		            <button class="toggle-decor-number uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice toggle-show" type="button" uk-toggle="target:.toggle-decor-number; cls: uk-active">
		                <span class="uk-margin-small-right icon-add"></span>Add application
		            </button>
		        </div>
		        <div class="uk-width-1-2 ">
		            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize uk-text-capitalize btn-selection-choice toggle-hide" type="button" uk-toggle="target: #modal-all-application">
		                <span class="uk-margin-small-right icon-view"></span>View all application
		            </button>
		        </div>
		    </div>
		</li>
		<li>
		    <h5 uk-margin="" class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker abrade-ultra-italic"><span class="uk-text-uppercase uk-first-column">Front number</span> (front view) #3</h5>
		    <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark uk-grid" uk-grid="">
		        <div class="uk-width-1-2 uk-first-column">
		            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">View</button>
		        </div>
		        <div class="uk-width-1-2 ">
		            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Hide</button>
		        </div>
		    </div>

		    <div class="con-input-object con-en-disable-me">
		        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Input front number</h6>
		        <div class="">
		            <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-xsmall uk-disabled" type="text" placeholder="00">
		        </div>
		    </div>

		    <div class="toggle-me" style="display: none;">
		        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Front number font</h6>
		        <div class="uk-grid-collapse uk-grid-match uk-text-center uk-grid uk-grid-stack" uk-grid="">
		            <div class="uk-width-auto ">
		                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default">
		                    <span class="fc-red icon-left-arrow"></span>
		                </a>
		            </div>
		            <div class="uk-width-expand ">
		                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark">Full Block</a>
		            </div>
		            <div class="uk-width-auto ">
		                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default">
		                    <span class="fc-red icon-right-arrow"></span>
		                </a>
		            </div>
		        </div>

        		<div class="uk-padding-small uk-padding-remove-vertical">
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom"><span class="uk-margin-small-right icon-font-size"></span>Font Size</h6>
            <div class="uk-padding uk-padding-remove-vertical">
                <div class="slider-range range-small-large ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Small</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Large</span></span></div>
            </div>
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-move"></span>Position</h6>
            <div class="uk-padding uk-padding-remove-vertical">
                <div class="slider-range range-left-right ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Left</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Right</span></span></div>
                <div class="slider-range range-up-down uk-margin-medium-top ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Down</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Up</span></span></div>
            </div>

            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-rotate"></span>Rotate</h6>
            <div class="uk-flex-center uk-grid uk-grid-stack" uk-grid="">
                <div class="">
                    <div class="slider rs-ie rs-control rs-animation" style="height: 140px; width: 140px;"><div class="rs-container full" style="height: 140px; width: 140px;"><div class="rs-inner-container"><div class="rs-block rs-outer rs-border"><div class="rs-path rs-transition rs-path-color"></div><span class="rs-block" style="padding: 12px;"><div class="rs-inner rs-bg-color rs-border"></div></span></div></div><div class="rs-bar rs-transition rs-first" style="z-index: 7; transform: rotate(0deg);"><div class="rs-handle rs-move" index="1" tabindex="0" role="slider" aria-label="handle" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 26px; width: 26px; margin: -13px 0px 0px -6px;"></div></div><span class="rs-bar rs-transition rs-start" style="transform: rotate(0deg);"><span class="rs-seperator rs-border" style="width: 14px; margin-top: -0.5px;"></span></span><span class="rs-bar rs-transition rs-end" style="transform: rotate(360deg);"><span class="rs-seperator rs-border" style="width: 14px; margin-top: -0.5px;"></span></span><span class="rs-tooltip rs-tooltip-text edit" style="margin-top: 0px; margin-left: 0px;">0</span></div><input type="hidden" name="" value="0"></div>
                </div>
            </div>
        		</div>

		        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font Accent</h6>
		        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-5 uk-child-width-1-6@s uk-child-width-1-5@m con-select con-palettes m-accents uk-grid uk-grid-stack" uk-grid="">
			<div>
				<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
				<div class=" bdr-thin bdr-gray">
				<img src="http://customizer.prolook.com/images/sidebar/no-accent.png" uk-img="">
				</div>
				<div class="uk-position-cover choice-icon bdr-lightGray">
				<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
				</div>
				</button>
				</div>
				<div>
				<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
				<div class=" bdr-thin bdr-gray">
				<img src="http://customizer.prolook.com/images/sidebar/outlined.png" uk-img="">
				</div>
				<div class="uk-position-cover choice-icon bdr-lightGray">
				<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
				</div>
				</button>
				</div>
				<div>
				<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
				<div class=" bdr-thin bdr-gray">
				<img src="http://customizer.prolook.com/images/sidebar/single_outline_with_shadow.png" uk-img="">
				</div>
				<div class="uk-position-cover choice-icon bdr-lightGray">
				<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
				</div>
				</button>
				</div>
				<div>
				<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
				<div class=" bdr-thin bdr-gray">
				<img src="http://customizer.prolook.com/images/sidebar/drop_shadow.png" uk-img="">
				</div>
				<div class="uk-position-cover choice-icon bdr-lightGray">
				<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
				</div>
				</button>
				</div>
				<div>
				<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
				<div class=" bdr-thin bdr-gray">
				<img src="http://customizer.prolook.com/images/sidebar/no-accent.png" uk-img="">
				</div>
				<div class="uk-position-cover choice-icon bdr-lightGray">
				<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
				</div>
				</button>
				</div>
				</div>

        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font color</h6>
        <div>
            <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark uk-grid uk-grid-stack" uk-switcher="" uk-grid="">
                <li class="uk-padding-remove uk-active" aria-expanded="true"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Main&nbsp;Color</a></li>
                <li class="uk-padding-remove" aria-expanded="false"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Outline&nbsp;Color</a></li>
            </ul>
            <ul class="uk-switcher uk-margin uk-padding-remove">
                <li class="uk-active">
                    <div class="con-select con-palettes">
                        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color uk-grid uk-grid-stack" uk-grid="">
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-black"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-lightBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-charcoalGray"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-maroon"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-green"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-gold"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-grey"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-silverGray"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-green-2"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-maroonBrown"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-darkBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-orange"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-purple"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-cardinal"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-cornBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-seminol"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-creamYellow"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-white"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-neonPink"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						</div>
                    </div>
                </li>
                <li>
                    <div class="con-select con-palettes">
                        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color uk-grid uk-grid-stack" uk-grid="">
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-black"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-lightBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-charcoalGray"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-maroon"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-green"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-gold"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-grey"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-silverGray"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-green-2"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-maroonBrown"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-darkBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-orange"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-purple"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-cardinal"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-cornBlue"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-seminol"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-creamYellow"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-white"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						<div>
						<button class="uk-inline box-palette btn-selection-choice palette-color">
						<div class="palette palette-c-neonPink"></div>
						<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
						<span class="icon icon-check uk-text-bold uk-position-center"></span>
						</div>
						</button>
						</div>
						</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</li>
<li>
    <h5 uk-margin="" class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold fc-darker abrade-ultra-italic"><span class="uk-text-uppercase uk-first-column">Back number</span> (Back view) #4</h5>
    <div class="uk-grid-small grid-tiny uk-grid-match uk-text-center con-select con-toggle active-bgc-dark uk-grid" uk-grid="">
        <div class="uk-width-1-2 uk-first-column">
            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice">View</button>
        </div>
        <div class="uk-width-1-2 ">
            <button class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-capitalize btn-selection-choice toggle-hide uk-active">Hide</button>
        </div>
    </div>

    <div class="con-input-object con-en-disable-me">
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Input back number</h6>
        <div class="">
            <input class="en-disable-me uk-input bgc-light bdr-lightGray uk-form-width-xsmall uk-disabled" type="text" placeholder="00">
        </div>
    </div>

    <div class="toggle-me" style="display: none;">
        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Back number font</h6>
        <div class="uk-grid-collapse uk-grid-match uk-text-center uk-grid uk-grid-stack" uk-grid="">
            <div class="uk-width-auto ">
                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default">
                    <span class="fc-red icon-left-arrow"></span>
                </a>
            </div>
            <div class="uk-width-expand ">
                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default uk-text-bold fc-dark">Full Block</a>
            </div>
            <div class="uk-width-auto ">
                <a href="#" class="uk-button uk-button-small uk-width-1-1 uk-button-default">
                    <span class="fc-red icon-right-arrow"></span>
                </a>
            </div>
        </div>

        <div class="uk-padding-small uk-padding-remove-vertical">
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom"><span class="uk-margin-small-right icon-font-size"></span>Font Size</h6>
            <div class="uk-padding uk-padding-remove-vertical">
                <div class="slider-range range-small-large ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Small</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Large</span></span></div>
            </div>
            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-move"></span>Position</h6>
            <div class="uk-padding uk-padding-remove-vertical">
                <div class="slider-range range-left-right ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Left</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Right</span></span></div>
                <div class="slider-range range-up-down uk-margin-medium-top ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content ui-slider-float ui-slider-pips"><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 50%;"><span class="ui-slider-tip">0</span></span><span class="ui-slider-pip ui-slider-pip-first ui-slider-pip-label ui-slider-pip--100" style="left: 0%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-100">Down</span></span><span class="ui-slider-pip ui-slider-pip--90" style="left: 5.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-90">-90</span></span><span class="ui-slider-pip ui-slider-pip--80" style="left: 10.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-80">-80</span></span><span class="ui-slider-pip ui-slider-pip--70" style="left: 15.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-70">-70</span></span><span class="ui-slider-pip ui-slider-pip--60" style="left: 20.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-60">-60</span></span><span class="ui-slider-pip ui-slider-pip--50" style="left: 25.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-50">-50</span></span><span class="ui-slider-pip ui-slider-pip--40" style="left: 30.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-40">-40</span></span><span class="ui-slider-pip ui-slider-pip--30" style="left: 35.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-30">-30</span></span><span class="ui-slider-pip ui-slider-pip--20" style="left: 40.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-20">-20</span></span><span class="ui-slider-pip ui-slider-pip--10" style="left: 45.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="-10">-10</span></span><span class="ui-slider-pip ui-slider-pip-0 ui-slider-pip-initial ui-slider-pip-selected" style="left: 50.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="0">0</span></span><span class="ui-slider-pip ui-slider-pip-10" style="left: 55.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="10">10</span></span><span class="ui-slider-pip ui-slider-pip-20" style="left: 60.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="20">20</span></span><span class="ui-slider-pip ui-slider-pip-30" style="left: 65.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="30">30</span></span><span class="ui-slider-pip ui-slider-pip-40" style="left: 70.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="40">40</span></span><span class="ui-slider-pip ui-slider-pip-50" style="left: 75.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="50">50</span></span><span class="ui-slider-pip ui-slider-pip-60" style="left: 80.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="60">60</span></span><span class="ui-slider-pip ui-slider-pip-70" style="left: 85.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="70">70</span></span><span class="ui-slider-pip ui-slider-pip-80" style="left: 90.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="80">80</span></span><span class="ui-slider-pip ui-slider-pip-90" style="left: 95.0000%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="90">90</span></span><span class="ui-slider-pip ui-slider-pip-last ui-slider-pip-label ui-slider-pip-100" style="left: 100%"><span class="ui-slider-line"></span><span class="ui-slider-label" data-value="100">Up</span></span></div>
            </div>

            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-small-bottom"><span class="uk-margin-small-right icon-rotate"></span>Rotate</h6>
            <div class="uk-flex-center uk-grid uk-grid-stack" uk-grid="">
                <div class="">
                    <div class="slider rs-ie rs-control rs-animation" style="height: 140px; width: 140px;"><div class="rs-container full" style="height: 140px; width: 140px;"><div class="rs-inner-container"><div class="rs-block rs-outer rs-border"><div class="rs-path rs-transition rs-path-color"></div><span class="rs-block" style="padding: 12px;"><div class="rs-inner rs-bg-color rs-border"></div></span></div></div><div class="rs-bar rs-transition rs-first" style="z-index: 7; transform: rotate(0deg);"><div class="rs-handle rs-move" index="1" tabindex="0" role="slider" aria-label="handle" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="height: 26px; width: 26px; margin: -13px 0px 0px -6px;"></div></div><span class="rs-bar rs-transition rs-start" style="transform: rotate(0deg);"><span class="rs-seperator rs-border" style="width: 14px; margin-top: -0.5px;"></span></span><span class="rs-bar rs-transition rs-end" style="transform: rotate(360deg);"><span class="rs-seperator rs-border" style="width: 14px; margin-top: -0.5px;"></span></span><span class="rs-tooltip rs-tooltip-text edit" style="margin-top: 0px; margin-left: 0px;">0</span></div><input type="hidden" name="" value="0"></div>
                </div>
            </div>
        </div>

        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font Accent</h6>
        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-1-5 uk-child-width-1-6@s uk-child-width-1-5@m con-select con-palettes m-accents uk-grid uk-grid-stack" uk-grid="">
		<div>
		<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
		<div class=" bdr-thin bdr-gray">
		<img src="http://customizer.prolook.com/images/sidebar/no-accent.png" uk-img="">
		</div>
		<div class="uk-position-cover choice-icon bdr-lightGray">
		<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
		</div>
		</button>
		</div>
		<div>
		<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
		<div class=" bdr-thin bdr-gray">
		<img src="http://customizer.prolook.com/images/sidebar/outlined.png" uk-img="">
		</div>
		<div class="uk-position-cover choice-icon bdr-lightGray">
		<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
		</div>
		</button>
		</div>
		<div>
		<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
		<div class=" bdr-thin bdr-gray">
		<img src="http://customizer.prolook.com/images/sidebar/single_outline_with_shadow.png" uk-img="">
		</div>
		<div class="uk-position-cover choice-icon bdr-lightGray">
		<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
		</div>
		</button>
		</div>
		<div>
		<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
		<div class=" bdr-thin bdr-gray">
		<img src="http://customizer.prolook.com/images/sidebar/drop_shadow.png" uk-img="">
		</div>
		<div class="uk-position-cover choice-icon bdr-lightGray">
		<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
		</div>
		</button>
		</div>
		<div>
		<button class="uk-inline bgc-transparent box-palette btn-selection-choice">
		<div class=" bdr-thin bdr-gray">
		<img src="http://customizer.prolook.com/images/sidebar/no-accent.png" uk-img="">
		</div>
		<div class="uk-position-cover choice-icon bdr-lightGray">
		<span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary uk-icon"><svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1.5"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg></span>
		</div>
		</button>
		</div>
		</div>

        <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-top uk-margin-small-bottom abrade-black">Choose font color</h6>
        <div>
            <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark uk-grid uk-grid-stack" uk-switcher="" uk-grid="">
                <li class="uk-padding-remove uk-active" aria-expanded="true"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Main&nbsp;Color</a></li>
                <li class="uk-padding-remove" aria-expanded="false"><a href="#" class="uk-width-1-1 padding-tiny-vertical uk-button-default uk-text-capitalize">Outline&nbsp;Color</a></li>
            </ul>
            <ul class="uk-switcher uk-margin uk-padding-remove">
                <li class="uk-active">
                    <div class="con-select con-palettes">
                        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color uk-grid uk-grid-stack" uk-grid="">
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-black"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-lightBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-charcoalGray"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-maroon"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-green"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-gold"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-grey"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-silverGray"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-green-2"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-maroonBrown"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-darkBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-orange"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-purple"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-cardinal"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-cornBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-seminol"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-creamYellow"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-white"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-neonPink"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							</div>
                    </div>
                </li>
                <li>
                    <div class="con-select con-palettes">
                        <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color uk-grid uk-grid-stack" uk-grid="">
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-black"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-lightBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-charcoalGray"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-maroon"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-green"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-gold"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-grey"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-silverGray"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-green-2"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-maroonBrown"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-darkBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-orange"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-purple"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-cardinal"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-cornBlue"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-seminol"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-creamYellow"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-white"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							<div>
							<button class="uk-inline box-palette btn-selection-choice palette-color">
							<div class="palette palette-c-neonPink"></div>
							<div class="uk-overlay-primary uk-position-cover choice-icon bdr-lightGray">
							<span class="icon icon-check uk-text-bold uk-position-center"></span>
							</div>
							</button>
							</div>
							</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</li>
	</ul>
    <div class="uk-padding-small bgc-light">
        <div class="uk-grid-collapse uk-text-center uk-grid" uk-grid="">
            <a href="#" class="uk-link-reset uk-width-1-2 abrade-medium uk-first-column" uk-switcher-item="previous">
                <div class="uk-grid-collapse uk-grid" uk-grid="">
                    <div class="uk-width-auto uk-padding-small padding-tiny-vertical bdr-thin bdr-dark bdr-remove-right uk-first-column">
                        <span class="fc-red icon-left-arrow"></span>
                    </div>
                    <div class="uk-width-expand uk-padding-small padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right">Prev<span class="hidden-xxs">ious</span></div>
                </div>
            </a>
            <a href="#" class="uk-link-reset uk-width-1-2 abrade-medium" uk-switcher-item="next">
                <div class="uk-grid-collapse uk-grid" uk-grid="">
                    <div class="uk-width-expand uk-padding-small padding-tiny-vertical bdr-thin bdr-dark uk-text-uppercase bdr-remove-right uk-first-column">Next</div>
                    <div class="uk-width-auto uk-padding-small padding-tiny-vertical bdr-thin bdr-dark">
                        <span class="fc-red icon-right-arrow"></span>
                    </div>
                </div>
            </a>
            <a href="#" class="link-reset uk-padding-small uk-padding-remove-horizontal padding-tiny-vertical bgc-darkerGray fc-light uk-text-bold uk-width-1-1 uk-text-capitalize abrade-ultra-italic uk-grid-margin uk-first-column">Finish / View &nbsp;Summary</a>
        </div>

        <div class="uk-grid-small uk-text-bold fc-red abrade-ultra-italic uk-grid" uk-grid="">
            <div class="uk-width-expand con-legend uk-grid-small grid-tiny uk-flex-middle uk-grid uk-first-column" uk-grid="">
                <div class="uk-width-auto uk-first-column">
                    <div class="bdr-red bdr-reg box"></div>
                </div>
                <div class="uk-width-expand">
                    <span class="uk-text-middle">= Incomplete Step</span>
                </div>
            </div>
            <div class="uk-width-auto">
                <a href="#" class="uk-link-reset fc-red abrade-ultra-italic">User Login</a>
            </div>
        </div>
    </div>
    <hr class="bdr-darker uk-margin-remove">
</li>

</script>