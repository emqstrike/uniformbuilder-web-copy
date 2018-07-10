# Code Map

Most of the important JS files are located in https://github.com/qstrike/uniformbuilder-web/tree/master/resources/assets/js

## Main JS Files

**ubdata**

    - Configuration Values 

**ubj**

    - Handles the main logic

**uba**

    - Handles the create of applications and handling of mouse events

**ubproc**

    - Handles the ordering process

**ubpl**

    - Helper functions for creating the color pickers, and the text and mascot sprites for the applications

**ubtcj**

    - Team Color Functions and Other Color Management Functions

**ubren**

    - Screen Management Functions (Fullscreen Preview, Zooming, etc)

**ubutilities**

    - General Utility Functions

**ubshort**

    - Keyboard Shortcut handlers 

**ubpip**

    - Piping Code

**ubrando**

    - Random Feed Functions

**ubf**

    - Font Processing Code

## Data and Configuration 

**ubdata**

    - General Configuration values (that are not yet transferred to the backend)

**ubpla**

    - Application Creation Behavior such as single view applications

**ubsize**

    - Application Sizes (Mascot sizes, Pant applications and Upper uniform applications, etc...)

**ubdata**

    - General Configuration values (that are not yet transferred to the backend)

**ubconfig**

    - Main Config File with version info and feature flag setup

## Third Party Interop

**ubinterop**

    - Inksoft interop code 


## Pattern Handling

**ubj@ub.funcs.coordinateAdjustments**

    - Adjustment to pattern coordinates
    - theres also a pattern coordinate adjustment code for stripe on ubj@ub.generate_pattern, refactor this

**ubj@ub.generate_pattern**

    - Generates pattern for material options

**ubj@$.ub.mvChangePattern**

    - Generates pattern for applications

## Popups

**uba@ub.funcs.createPatternPopup**

    - Pattern Popup

**uba@ub.funcs.createMascotPopup**

    - Mascot Popup

**uba@ub.funcs.createFontPopup**

    - Font Popup

**uba@ub.funcs.createAccentPopup**

    - Application Accents Popup (e.g. two color, three color text styles)


## Infrastructure

**ubj@ub.funcs.renderApplication**

    - Main Render Proc for creating Applications and Mascots

**ubj@ub.funcs.stageMouseMove**

    - Handles all the global mousemove events


## UI

**uba@ub.funcs.drawPartsDrop**

    - Handles the rendering of the dropdown, and moving next and prev between material options

**uba@ub.funcs.createSmallColorPickers**

    - Drawing of the small color pickers for Mascots and Applications 
    - uba@ub.funcs.changeActiveColorSmallColorPicker

## Others

**ubconfig@ub.config.print_version**
    
    - Print customizer version and other info such as API Url in the console








