$(document).ready(function() {

    // Branding Configurations

    ub.branding = {
        logoUrl: '/images/branding/pl-logo-black-1e1e1e.png',
        appTitle: '',
        useAllColors: false, // If true, after the app reads all the default team colors for the current style it will append all the colors to the team colors, 
        					 // for use of brands that wants all the colors to appear on the color picker and not just those that are selected on the team colors
        					 
    };

    $('a.navbar-brand > img').attr('src', ub.branding.logoUrl);

});
