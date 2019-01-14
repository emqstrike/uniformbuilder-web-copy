/**
 * This will turn the UI of the customizer into Riddel Mock up
 *
 * @file   RiddellUIControls.
 * @author Aron Joshua Bagtas <aaron@qstrike.com>
 * @since  Jan 14, 2019
 */

function RiddellUIControls() {}


RiddellUIControls.funcs =  {
    loadUI: function() {
        console.log("Running RiddellUIControls");
        // Change Stage color
        ub.renderer.backgroundColor = 0xffffff;

        // Remove Prolook Logo
        $("div#navbar-header").html("");

        // Load Riddell Logo
        $("#header_text").html("<img src='/images/riddell/logo-black.png' alt='Riddell Logo' height='50' width='190'>")

        // Load Riddell CSS
        $('head').append('<link rel="stylesheet" type="text/css" href="/riddell/css/riddell.css">');
    }
}