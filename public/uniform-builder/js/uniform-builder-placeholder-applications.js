$(document).ready(function () {

    ub.data.freeFormValidTypes = {

        items: [
            {
                sport: "Crew Socks (Apparel)",
                part: 'Sublimated',
                validTypes: ["logo", "team_name"],
            },
            {
                sport: "Default",
                part: "Default",
                validTypes: ["logo","number","player_name","team_name"],
            }
        ], 

        getItem: function (sport, part) {

            var _result = _.find(this.items, {sport: sport, part: part});

            if (typeof _result === "undefined") {

                _result = _.find(this.items, {sport: "Default", part: "Default"});

            }

            return _result;

        }

    }

    // List of sports with a valid coordinate override for free-form application

    // Because of LS - RS Rule
    ub.data.placeHolderOverrideSports = {

        items: [
            'Crew Socks (Apparel)',
        ],
        isValid: function (sport) {

            return _.contains(this.items, sport);

        }

    }

    ub.data.placeHolderOverrides = {

        items: [], 

        getOverrides: function (sport, part, perspective, blockPattern) {

            var _result = _.find(this.items, {sport: sport, part: part, perspective: perspective, blockPattern: blockPattern});

            if (typeof _result === "undefined") {

                ub.utilities.info('Placeholder Override not found, using default.'); // Centoid Function will be used insteadff

            }

            return _result;

        }

    }

    ub.data.placeHolderApplications = [
        {
            id: 100,
            perspective: 'front',
        },
        {
            id: 101,
            perspective: 'back',
        },
        {
            id: 102,
            perspective: 'left',
        },
        {
            id: 103,
            perspective: 'right',
        }
    ];

    ub.data.placeholderApplicationSettings = {
        "100": {
            "application_type": "free",
            "application": {
                "id": "100",
                "name": "Free",
                "views": [
                    {
                        "perspective": "front",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "100",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 471.53846153846155,
                                "y": 472,
                                "xp": 190.136476426799,
                                "yp": 171.63636363636363
                            },
                            "topRight": {
                                "x": 523.5384615384615,
                                "y": 472,
                                "xp": 211.1042183622829,
                                "yp": 171.63636363636363
                            },
                            "bottomLeft": {
                                "x": 471.53846153846155,
                                "y": 524,
                                "xp": 190.136476426799,
                                "yp": 190.54545454545456
                            },
                            "bottomRight": {
                                "x": 523.5384615384615,
                                "y": 524,
                                "xp": 211.1042183622829,
                                "yp": 190.54545454545456
                            },
                            "isPrimary": 1,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 503.53846153846155,
                                "y": 498
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 497.53846153846155,
                                "y": 498
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "left",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "100",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 235.53846153846155,
                                "y": 474,
                                "xp": 94.97518610421837,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 287.53846153846155,
                                "y": 474,
                                "xp": 115.94292803970222,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 235.53846153846155,
                                "y": 526,
                                "xp": 94.97518610421837,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 287.53846153846155,
                                "y": 526,
                                "xp": 115.94292803970222,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 267.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 261.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "right",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "100",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 695.5384615384615,
                                "y": 474,
                                "xp": 280.4590570719603,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 747.5384615384615,
                                "y": 474,
                                "xp": 301.4267990074442,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 695.5384615384615,
                                "y": 526,
                                "xp": 280.4590570719603,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 747.5384615384615,
                                "y": 526,
                                "xp": 301.4267990074442,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 727.5384615384615,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 721.5384615384615,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    }
                ],
                "layer": "Body",
                "type": "free"
            },
            "code": "100",
            "type": "free",
            "validApplicationTypes": [
                "logo",
                "number",
                "player_name",
                "team_name"
            ],
            "status": "off"
        },
        "101": {
            "application_type": "free",
            "application": {
                "id": "101",
                "name": "Free",
                "views": [
                    {
                        "perspective": "back",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "101",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 471.53846153846155,
                                "y": 474,
                                "xp": 190.136476426799,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 523.5384615384615,
                                "y": 474,
                                "xp": 211.1042183622829,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 471.53846153846155,
                                "y": 526,
                                "xp": 190.136476426799,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 523.5384615384615,
                                "y": 526,
                                "xp": 211.1042183622829,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 1,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 503.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 497.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "left",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "101",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 675.5384615384615,
                                "y": 474,
                                "xp": 272.394540942928,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 727.5384615384615,
                                "y": 474,
                                "xp": 293.3622828784119,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 675.5384615384615,
                                "y": 526,
                                "xp": 272.394540942928,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 727.5384615384615,
                                "y": 526,
                                "xp": 293.3622828784119,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 707.5384615384615,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 701.5384615384615,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "right",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "101",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 225.53846153846155,
                                "y": 474,
                                "xp": 90.94292803970224,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 277.53846153846155,
                                "y": 474,
                                "xp": 111.91066997518611,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 225.53846153846155,
                                "y": 526,
                                "xp": 90.94292803970224,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 277.53846153846155,
                                "y": 526,
                                "xp": 111.91066997518611,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 257.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 251.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    }
                ],
                "layer": "Body",
                "type": "free"
            },
            "code": "101",
            "type": "free",
            "validApplicationTypes": [
                "logo",
                "number",
                "player_name",
                "team_name"
            ],
            "status": "off"
        },
        "102": {
            "application_type": "free",
            "application": {
                "id": "102",
                "name": "Free",
                "views": [
                    {
                        "perspective": "front",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "102",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 651.5384615384615,
                                "y": 474,
                                "xp": 262.71712158808936,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 703.5384615384615,
                                "y": 474,
                                "xp": 283.6848635235732,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 651.5384615384615,
                                "y": 526,
                                "xp": 262.71712158808936,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 703.5384615384615,
                                "y": 526,
                                "xp": 283.6848635235732,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 683.5384615384615,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 677.5384615384615,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "back",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "102",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 275.53846153846155,
                                "y": 474,
                                "xp": 111.10421836228288,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 327.53846153846155,
                                "y": 474,
                                "xp": 132.07196029776676,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 275.53846153846155,
                                "y": 526,
                                "xp": 111.10421836228288,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 327.53846153846155,
                                "y": 526,
                                "xp": 132.07196029776676,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 307.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 301.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "left",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "102",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 471.53846153846155,
                                "y": 474,
                                "xp": 190.136476426799,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 523.5384615384615,
                                "y": 474,
                                "xp": 211.1042183622829,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 471.53846153846155,
                                "y": 526,
                                "xp": 190.136476426799,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 523.5384615384615,
                                "y": 526,
                                "xp": 211.1042183622829,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 1,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 503.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 497.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    }
                ],
                "layer": "Body",
                "type": "free"
            },
            "code": "102",
            "type": "free",
            "validApplicationTypes": [
                "logo",
                "number",
                "player_name",
                "team_name"
            ],
            "status": "off"
        },
        "103": {
            "application_type": "free",
            "application": {
                "id": "103",
                "name": "Free",
                "views": [
                    {
                        "perspective": "front",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "103",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 275.53846153846155,
                                "y": 474,
                                "xp": 111.10421836228288,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 327.53846153846155,
                                "y": 474,
                                "xp": 132.07196029776676,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 275.53846153846155,
                                "y": 526,
                                "xp": 111.10421836228288,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 327.53846153846155,
                                "y": 526,
                                "xp": 132.07196029776676,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 307.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 301.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "back",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "103",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 651.5384615384615,
                                "y": 474,
                                "xp": 262.71712158808936,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 703.5384615384615,
                                "y": 474,
                                "xp": 283.6848635235732,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 651.5384615384615,
                                "y": 526,
                                "xp": 262.71712158808936,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 703.5384615384615,
                                "y": 526,
                                "xp": 283.6848635235732,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 0,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 683.5384615384615,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 677.5384615384615,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    },
                    {
                        "perspective": "right",
                        "application": {
                            "type": "free",
                            "name": "Free",
                            "id": "103",
                            "layerOrder": {},
                            "topLeft": {
                                "x": 471.53846153846155,
                                "y": 474,
                                "xp": 190.136476426799,
                                "yp": 172.36363636363637
                            },
                            "topRight": {
                                "x": 523.5384615384615,
                                "y": 474,
                                "xp": 211.1042183622829,
                                "yp": 172.36363636363637
                            },
                            "bottomLeft": {
                                "x": 471.53846153846155,
                                "y": 526,
                                "xp": 190.136476426799,
                                "yp": 191.27272727272728
                            },
                            "bottomRight": {
                                "x": 523.5384615384615,
                                "y": 526,
                                "xp": 211.1042183622829,
                                "yp": 191.27272727272728
                            },
                            "isPrimary": 1,
                            "hasLogo": 1,
                            "hasTeamName": 1,
                            "hasPlayerName": 1,
                            "hasNumber": 1,
                            "fontSizes": "2",
                            "verticalText": 0,
                            "defaultMascot": "",
                            "defaultFont": "25",
                            "defaultText": "Test",
                            "defaultNumber": "47",
                            "mascotData": {},
                            "fontData": {},
                            "center": {
                                "x": 503.53846153846155,
                                "y": 500
                            },
                            "colors": "W",
                            "accents": "0",
                            "width": 52,
                            "height": 52,
                            "widthp": 10.483870967741936,
                            "heightp": 9.454545454545455,
                            "pivot": {
                                "x": 497.53846153846155,
                                "y": 500
                            },
                            "rotation": 0
                        }
                    }
                ],
                "layer": "Body",
                "type": "free"
            },
            "code": "103",
            "type": "free",
            "validApplicationTypes": [
                "logo",
                "number",
                "player_name",
                "team_name"
            ],
            "status": "off"
        }
    };

});