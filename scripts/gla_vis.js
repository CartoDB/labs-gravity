(function () {

    window.myapp = window.myapp || {};

    window.myapp.dijson = {
        "id": "a4193e4e-25d5-11e6-9e21-0e787de82d45",
        "version": "3.0.0",
        "title": "GLA gravity study",
        "likes": 0,
        "description": "Study of the power of attraction of the malls in the provice of Madrid based on their GLA (gross leasable area)",
        "scrollwheel": true,
        "legends": false,
        "map_provider": "leaflet",
        /*     "bounds": [
             [39.70296052957233, -5.6744384765625],
             [41.18278832811288, -1.2634277343749998]
         ],*/
        "center": "[40.44694705960048, -3.46893310546875]",
        "zoom": 10,
        "updated_at": "2016-05-29T19:52:30+00:00",
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
                "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "id": "af46b1fa-8096-411e-8f0b-7616897f56a6",
                "order": 0
            },
            "infowindow": null,
            "tooltip": null,
            "id": "af46b1fa-8096-411e-8f0b-7616897f56a6",
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
                    "stat_tag": "a4193e4e-25d5-11e6-9e21-0e787de82d45",
                    "version": "3.0.0",
                    "layers": [{
                        "id": "3ca8ce19-b5b1-4834-bd6f-cb6735439ba3",
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
                                "value": "3.20",
                                "type": "text"
                        }, {
                                "name": "Right label",
                                "visible": true,
                                "value": "91.06",
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
                            "layer_name": "gla_madrid",
                            "cartocss": "#layer {\npolygon-opacity: 0.7;\nline-width: 0;\nline-color: #FFFFFF;\nline-opacity: 1;\npolygon-fill: ramp([h], cartocolor(Sunset, 7));\n}",
                            "cartocss_version": "2.1.1",
                            "interactivity": null,
                            //"source": "a0"
                            "sql": "select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid, abel.sscc_madrid ss where ss.cartodb_id = source_id and target_id=71"
                        }
                }, {
                        "id": "ed706bf5-6c2a-4fcd-94d6-75345c6c8bc7",
                        "type": "CartoDB",
                        "infowindow": {
                            "fields": [{
                                "name": "name",
                                "title": false,
                                "position": null
                        }, {
                                "name": "sba2",
                                "title": false,
                                "position": null
                        }],
                            "template_name": "infowindow_light",
                            "template": "<div class=\"CDB-infowindow CDB-infowindow--light js-infowindow\">\n<div class=\"CDB-infowindow-container\">\n    <div class=\"CDB-infowindow-bg\">\n      <div class=\"CDB-infowindow-inner\"><div class='CDB-infowindow-close close' style='float: right;' title='Close'><i class='CDB-IconFont CDB-IconFont-close Size-large' style='color: red;cursor:pointer;'></i></div>\n        {{#loading}}\n          <div class=\"CDB-Loader js-loader is-visible\"></div>\n        {{/loading}}\n        <ul class=\"CDB-infowindow-list js-content\">\n          {{#content.fields}}\n          <li class=\"CDB-infowindow-listItem\">\n            {{#title}}<h5 class=\"CDB-infowindow-subtitle\">{{title}}</h5>{{/title}}\n            {{#value}}<h4 class=\"CDB-infowindow-title\">{{{ value }}}</h4>{{/value}}\n            {{^value}}<h4 class=\"CDB-infowindow-title\">null</h4>{{/value}}\n          </li>\n          {{/content.fields}}\n        </ul>\n      </div>\n    </div>\n    <div class=\"CDB-hook\">\n      <div class=\"CDB-hook-inner\"></div>\n    </div>\n  </div>\n</div>\n",
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
                                "value": 5350,
                                "legend_type": "bubble",
                                "type": "text",
                                "sync": false
                        }, {
                                "name": "Right Label",
                                "visible": true,
                                "value": 152887,
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
                            "layer_name": "centros_comerciales_de_madrid",
                            "cartocss": "#centros_comerciales_de_madrid{\n  marker-fill-opacity: 0.9;\n  marker-line-color: #FFF;\n  marker-line-width: 1;\n  marker-line-opacity: 1;\n  marker-placement: point;\n  marker-multi-policy: largest;\n  marker-type: ellipse;\n  marker-fill: ramp([sba], cartocolor(Teal, 7));\n  marker-allow-overlap: true;\n  marker-clip: false;\nmarker-width: ramp([sba], 10, 20);[cartodb_id=71]{marker-line-color: red;\n  marker-line-width: 2;}}",
                            "cartocss_version": "2.1.1",
                            "interactivity": "cartodb_id",
                            "sql": "SELECT *, sba ||'m²' as sba2 FROM abel.centros_comerciales_de_madrid where not no_cc order by sba desc"
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
                "id": "6b2a7f85-fede-4fd1-b5ed-1a45c11071ba",
                "className": "httpsbasemapscartocdncomlight_only_labelszxypng",
                "order": 3
            },
            "infowindow": null,
            "tooltip": null,
            "id": "6b2a7f85-fede-4fd1-b5ed-1a45c11071ba",
            "order": 3,
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
            "stat_tag": "a4193e4e-25d5-11e6-9e21-0e787de82d45"
        },
        "user": {
            "fullname": "abel",
            "avatar_url": "http://s3.amazonaws.com/com.cartodb.users-assets.production/production/abel/assets/20160318095129abel.c52ddb5d.jpg"
        },
        "analyses": [{
            "id": "a0",
            "type": "source",
            "params": {
                "query": "select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid, abel.sscc_madrid ss where ss.cartodb_id = source_id and target_id=71"
            },
            "options": {
                "table_name": "gla_madrid"
            }
    }],
        "vector": false
    }


})();
