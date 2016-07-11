(function () {

    window.myapp = window.myapp || {};

    window.myapp.dijson =

{
    "id": "f1bd7154-28bb-11e6-a555-0ecd1babdde5",
    "version": "3.0.0",
    "title": "Charging Stations",
    "likes": 0,
    "description": null,
    "scrollwheel": false,
    "legends": false,
    "map_provider": "leaflet",
    "bounds": [
        [33.04550781490999, -20.91796875],
        [45.01141864227728, 14.3701171875]
    ],
    "center": "[39.282810655823724, -3.273925739340484]",
    "zoom": 6,
    "updated_at": "2016-06-02T13:55:05+00:00",
    "layers": [{
        "options": {
            "visible": true,
            "type": "Tiled",
            "default": "true",
            "url": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
            "subdomains": "abcd",
            "minZoom": "0",
            "maxZoom": "18",
            "name": "Positron",
            "className": "httpsbasemapscartocdncomlight_nolabelszxypng",
            "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
            "labels": {
                "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
            },
            "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        },
        "infowindow": null,
        "tooltip": null,
        "id": "5a9f6de4-913e-40a3-93d5-17bae44b8c37",
        "order": 0,
        "type": "tiled"
    }, {
        "type": "layergroup",
        "options": {
            "user_name": "abel",
            "maps_api_template": "https://{user}.cartodb.com:443",
            "sql_api_template": "https://{user}.cartodb.com:443",
            "filter": "mapnik",
            "layer_definition": {
                "stat_tag": "f1bd7154-28bb-11e6-a555-0ecd1babdde5",
                "version": "3.0.0",
                "layers": [{
                    "id": "d3a83a99-8446-41e7-a176-bf291f604be2",
                    "type": "CartoDB",
                    "infowindow": {
                        "fields": [],
                        "template_name": "table/views/infowindow_light",
                        "template": "<div class=\"CDB-infowindow CDB-infowindow--light js-infowindow\">\n  <div class=\"CDB-infowindow-container\">\n    <div class=\"CDB-infowindow-bg\">\n      <div class=\"CDB-infowindow-inner\">\n        {{#loading}}\n          <div class=\"CDB-Loader js-loader is-visible\"></div>\n        {{/loading}}\n        <ul class=\"CDB-infowindow-list js-content\">\n          {{#content.fields}}\n          <li class=\"CDB-infowindow-listItem\">\n            {{#title}}<h5 class=\"CDB-infowindow-subtitle\">{{title}}</h5>{{/title}}\n            {{#value}}<h4 class=\"CDB-infowindow-title\">{{{ value }}}</h4>{{/value}}\n            {{^value}}<h4 class=\"CDB-infowindow-title\">null</h4>{{/value}}\n          </li>\n          {{/content.fields}}\n        </ul>\n      </div>\n    </div>\n    <div class=\"CDB-hook\">\n      <div class=\"CDB-hook-inner\"></div>\n    </div>\n  </div>\n</div>\n",
                        "alternative_names": {},
                        "width": 226,
                        "maxHeight": 180
                    },
                    "tooltip": {
                        "fields": [],
                        "template_name": "tooltip_light",
                        "template": "<div class=\"CDB-Tooltip CDB-Tooltip--isLight\">\n  <ul class=\"CDB-Tooltip-list\">\n    {{#fields}}\n      <li class=\"CDB-Tooltip-listItem\">\n        {{#title}}\n          <h3 class=\"CDB-Tooltip-listTitle\">{{{ title }}}</h3>\n        {{/title}}\n        <h4 class=\"CDB-Tooltip-listText\">{{{ value }}}</h4>\n      </li>\n    {{/fields}}\n  </ul>\n</div>\n",
                        "alternative_names": {},
                        "maxHeight": 180
                    },
                    "legend": {
                        "type": "none",
                        "show_title": false,
                        "title": "",
                        "template": "",
                        "visible": true,
                        "items": [{
                            "name": "Left label",
                            "visible": true,
                            "value": "410.00",
                            "type": "text"
                        }, {
                            "name": "Right label",
                            "visible": true,
                            "value": "1506962.00",
                            "type": "text"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#FFFFB2",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#FED976",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#FEB24C",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#FD8D3C",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#FC4E2A",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#E31A1C",
                            "type": "color"
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#B10026",
                            "type": "color"
                        }]
                    },
                    "order": 1,
                    "visible": true,
                    "options": {
                        "layer_name": "charging_stations_muni",
                        "cartocss": "#layer {\n  polygon-fill: ramp([cars], cartocolor(Sunset,7));\n  polygon-opacity: 0.7;\n}",
                        "cartocss_version": "2.1.1",
                        "interactivity": "cartodb_id",
                        //"source": "a0",
                        "sql": "SELECT * FROM charging_stations_muni"
                    }
                }, {
                    "id": "007e9da3-5565-45a4-ba9e-a48f28ae7f48",
                    "type": "CartoDB",
                    "infowindow": {
                        "fields": [{
                            "name": "name",
                            "title": true,
                            "position": 1
                        }, {
                            "name": "gestor",
                            "title": true,
                            "position": 2
                        }, {
                            "name": "location",
                            "title": true,
                            "position": 6
                        }, {
                            "name": "plugs",
                            "title": true,
                            "position": 8
                        }],
                        "template_name": "infowindow_light",
                        "template": "<div class=\"CDB-infowindow CDB-infowindow--light js-infowindow\">\n  <div class=\"CDB-infowindow-container\">\n    <div class=\"CDB-infowindow-bg\">\n      <div class=\"CDB-infowindow-inner\"><div class='CDB-infowindow-close close' style='float: right;' title='Close'><i class='CDB-IconFont CDB-IconFont-close Size-large' style='color: red;cursor:pointer;'></i></div>\n        {{#loading}}\n          <div class=\"CDB-Loader js-loader is-visible\"></div>\n        {{/loading}}\n        <ul class=\"CDB-infowindow-list js-content\">\n          {{#content.fields}}\n          <li class=\"CDB-infowindow-listItem\">\n            {{#title}}<h5 class=\"CDB-infowindow-subtitle\">{{title}}</h5>{{/title}}\n            {{#value}}<h4 class=\"CDB-infowindow-title\">{{{ value }}}</h4>{{/value}}\n            {{^value}}<h4 class=\"CDB-infowindow-title\">null</h4>{{/value}}\n          </li>\n          {{/content.fields}}\n        </ul>\n      </div>\n    </div>\n    <div class=\"CDB-hook\">\n      <div class=\"CDB-hook-inner\"></div>\n    </div>\n  </div>\n</div>\n",
                        "alternative_names": {},
                        "width": 226,
                        "maxHeight": 180
                    },
                    "tooltip": {
                        "fields": [],
                        "template_name": "tooltip_light",
                        "template": "<div class=\"CDB-Tooltip CDB-Tooltip--isLight\">\n  <ul class=\"CDB-Tooltip-list\">\n    {{#fields}}\n      <li class=\"CDB-Tooltip-listItem\">\n        {{#title}}\n          <h3 class=\"CDB-Tooltip-listTitle\">{{{ title }}}</h3>\n        {{/title}}\n        <h4 class=\"CDB-Tooltip-listText\">{{{ value }}}</h4>\n      </li>\n    {{/fields}}\n  </ul>\n</div>\n",
                        "alternative_names": {},
                        "maxHeight": 180
                    },
                    "legend": {
                        "type": "none",
                        "show_title": false,
                        "title": "",
                        "template": "",
                        "visible": true,
                        "items": [{
                            "name": "Left label",
                            "visible": true,
                            "value": 3,
                            "legend_type": "bubble",
                            "type": "text",
                            "sync": false
                        }, {
                            "name": "Right Label",
                            "visible": true,
                            "value": 44,
                            "legend_type": "bubble",
                            "type": "text",
                            "sync": false
                        }, {
                            "name": "Color",
                            "visible": true,
                            "value": "#5CA2D1",
                            "type": "color"
                        }]
                    },
                    "order": 2,
                    "visible": true,
                    "options": {
                        "layer_name": "charging_stations_spain",
                        "cartocss": "#layer {\n  marker-line-width: 0.5;\n  marker-line-color: #cafdd8;\n  marker-line-opacity: 1;\n  marker-fill: #67cda3;\n  marker-fill-opacity: 0.9;\n  marker-allow-overlap: true;\n  marker-width: ramp([plugs], 10,25);\n}",
                        "cartocss_version": "2.1.1",
                        "interactivity": "cartodb_id",
                        "source": "c0"
                    }
                }]
            },
            "attribution": ""
        }
    }, {
        "options": {
            "visible": true,
            "type": "Tiled",
            "default": "true",
            "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
            "subdomains": "abcd",
            "minZoom": "0",
            "maxZoom": "18",
            "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
            "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
            "name": "Positron Labels",
            "className": "httpsbasemapscartocdncomlight_only_labelszxypng",
            "letter": "d"
        },
        "infowindow": null,
        "tooltip": null,
        "id": "829f9701-f418-49d0-9ce6-dc7fc2ffb201",
        "order": 4,
        "type": "tiled"
    }],
    "overlays": [{
        "type": "zoom",
        "order": 6,
        "options": {
            "display": true,
            "x": 20,
            "y": 20
        },
        "template": "<a href=\"#zoom_in\" class=\"zoom_in\">+</a> <a href=\"#zoom_out\" class=\"zoom_out\">-</a>"
    }, {
        "type": "loader",
        "order": 8,
        "options": {
            "display": true,
            "x": 20,
            "y": 150
        },
        "template": "<div class=\"loader\" original-title=\"\"></div>"
    }, {
        "type": "logo",
        "order": 9,
        "options": {
            "display": true,
            "x": 10,
            "y": 40
        },
        "template": ""
    }],
    "prev": null,
    "next": null,
    "transition_options": {
        "time": 0
    },
    "widgets": [],
    "datasource": {
        "user_name": "abel",
        "maps_api_template": "https://{user}.cartodb.com:443",
        "stat_tag": "f1bd7154-28bb-11e6-a555-0ecd1babdde5"
    },
    "user": {
        "fullname": "abel",
        "avatar_url": "http://s3.amazonaws.com/com.cartodb.users-assets.production/production/abel/assets/20160318095129abel.c52ddb5d.jpg"
    },
    "analyses": [{
        "id": "a0",
        "type": "source",
        "params": {
            "query": "SELECT * FROM charging_stations_muni"
        },
        "options": {
            "table_name": "charging_stations_muni"
        }
    }, {
        "id": "b0",
        "type": "source",
        "params": {
            "query": "SELECT * FROM charging_stations_spain_areas"
        },
        "options": {
            "table_name": "charging_stations_spain_areas"
        }
    }, {
        "id": "c0",
        "type": "source",
        "params": {
            "query": "SELECT * FROM charging_stations_spain"
        },
        "options": {
            "table_name": "charging_stations_spain"
        }
    }],
    "vector": false
}

})();
