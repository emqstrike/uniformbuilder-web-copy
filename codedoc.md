# Code Map

## Main JS Files

**ubj**

    - Handles the main logic

**uba**

    - Handles the create of applications and handling of mouse events
**ubp**

    - Handles the ordering process

**ubp**

    - Helper functions for creating the color pickers, and the text and mascot sprites for the applications

**ubutilities**

    - General Utility Functions

** util

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









