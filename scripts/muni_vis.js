(function () {

    window.myapp = window.myapp || {};

    window.myapp.dijson = {
        "id": "854d39da-20f2-11e6-b280-0ecd1babdde5",
        "version": "3.0.0",
        "title": "Population gravity study",
        "likes": 0,
        "description":  "Study of the power of attraction of the municipalities of Spain based on their population",
        "scrollwheel": true,
        "legends": false,
        "map_provider": "leaflet",
        "bounds": [
        [34.65128519895413, -16.040039062499996],
        [44.41808794374849, 10.513916015625]
    ],
        "center": "[39.707186656826565, -2.7685546874999996]",
        "zoom": 7,
        "updated_at": "2016-05-31T08:25:16+00:00",
        "layers": [{
            "options": {
                "default": "true",
                "url": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "subdomains": "abcd",
                "minZoom": "0",
                "maxZoom": "18",
                "name": "Positron",
                "className": "positron_rainbow_labels",
                "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                "labels": {
                    "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
                },
                "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
            },
            "infowindow": null,
            "tooltip": null,
            "id": "551dff6c-ddbf-4312-98c2-616c48e7b4c1",
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
                    "stat_tag": "854d39da-20f2-11e6-b280-0ecd1babdde5",
                    "version": "3.0.0",
                    "layers": [{
                        "id": "7de772ab-9682-41ac-ba10-a9790e3cf0f7",
                        "type": "CartoDB",
                        "infowindow": {
                            "fields": [{
                                "name": "sourc_name",
                                "title": true,
                                "position": 0
                        }, {
                                "name": "spob",
                                "title": true,
                                "position": 2
                        }, {
                                "name": "spob_pat",
                                "title": true,
                                "position": 3
                        }, {
                                "name": "h",
                                "title": true,
                                "position": 5
                        }, {
                                "name": "dist",
                                "title": true,
                                "position": 6
                        }, {
                                "name": "idx_act_eco",
                                "title": true,
                                "position": 7
                        }, {
                                "name": "idx_com",
                                "title": true,
                                "position": 8
                        }, {
                                "name": "idx_restauracion",
                                "title": true,
                                "position": 9
                        }, {
                                "name": "idx_turism",
                                "title": true,
                                "position": 10
                        }, {
                                "name": "idx_indus",
                                "title": true,
                                "position": 11
                        }, {
                                "name": "malls",
                                "title": true,
                                "position": 12
                        }, {
                                "name": "paro",
                                "title": true,
                                "position": 13
                        }],
                            "template_name": "infowindow_light",
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
                                "value": "16.87",
                                "type": "text"
                        }, {
                                "name": "Right label",
                                "visible": true,
                                "value": "99.99",
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
                            "layer_name": "huff_13_2k_full",
                            "cartocss": "#layer {\npolygon-fill: ramp([h], cartocolor(Sunset2, 7));\npolygon-opacity: 0.7;\nline-width: 0.2;\nline-color: #FFFFFF;\nline-opacity: 1;\n}",
                            "cartocss_version": "2.1.1",
                            "interactivity": "cartodb_id",
                            //"source": "a0",
                            "sql": "SELECT d.cartodb_id, d.dist_km as dist, d.h, d.sourc_name, d.targ_name, d.spob, d.spob_pat, d.tpob, h.the_geom, h.the_geom_webmercator, replace(h.idx_indus,',','')::numeric as idx_indus, replace(h.idx_com,',','')::numeric as idx_com, replace(h.idx_restauracion,',','')::numeric as idx_restauracion, replace(h.idx_turism,',','')::numeric as idx_turism, replace(h.idx_act_eco,',','')::numeric as idx_act_eco, h.paro, h.malls FROM     abel.huff_13_2k_full d left join     abel.spainmunicipalitiesfull h on h.ine=d.sourc_ine::integer where d.targ_name='Barcelona'"
                        }
                }]
                },
                "attribution": ""
            }
    }, {
            "options": {
                "default": "true",
                "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                "subdomains": "abcd",
                "minZoom": "0",
                "maxZoom": "18",
                "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                "type": "Tiled",
                "name": "Positron Labels"
            },
            "infowindow": null,
            "tooltip": null,
            "id": "0852a7ca-1d96-4318-b209-a6d19801d0ad",
            "order": 2,
            "type": "tiled"
    }],
        "overlays": [{
            "type": "share",
            "order": 2,
            "options": {
                "display": true,
                "x": 20,
                "y": 20
            },
            "template": ""
    }, {
            "type": "search",
            "order": 3,
            "options": {
                "display": true,
                "x": 60,
                "y": 20
            },
            "template": ""
    }, {
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
            "stat_tag": "854d39da-20f2-11e6-b280-0ecd1babdde5"
        },
        "user": {
            "fullname": "abel",
            "avatar_url": "http://s3.amazonaws.com/com.cartodb.users-assets.production/production/abel/assets/20160318095129abel.c52ddb5d.jpg"
        },
        "analyses": [/*{
            "id": "a0",
            "type": "source",
            "params": {
                "query": "SELECT\nd.cartodb_id,\nd.dist_km as dist,\nd.h,\nd.sourc_name,\nd.targ_name,\nd.spob,\nd.spob_pat,\nd.tpob,\nh.the_geom,\nh.the_geom_webmercator,\nreplace(h.idx_indus,',','')::numeric as idx_indus,\nreplace(h.idx_com,',','')::numeric as idx_com,\nreplace(h.idx_restauracion,',','')::numeric as idx_restauracion,\nreplace(h.idx_turism,',','')::numeric as idx_turism,\nreplace(h.idx_act_eco,',','')::numeric as idx_act_eco,\nh.paro,\nh.malls\nFROM\n    abel.huff_13_2k_full d\nleft join\n    abel.spainmunicipalitiesfull h\non h.ine=d.sourc_ine::integer"
            },
            "options": {
                "table_name": "huff_13_2k_full"
            }
    }*/],
        "vector": false
    }


})();
