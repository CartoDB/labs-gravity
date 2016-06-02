(function () {

    window.myapp = window.myapp || {};
    window.init = false;

    window.onload = function () {

        var username = window.myapp.dijson.datasource.user_name,
            myapp = window.myapp,
            options = '',
            rep = 1,
            mywidget = document.querySelector('#mywidget'),
            oldquery, oldcss,
            newmall = function (lat, lon) {
                var mymap = myapp.Lmap.getNativeMap(),
                    pos,
                    addmarker = function (pos) {
                        myapp.marker = new cdb.L.marker(pos, {
                            icon: cdb.L.divIcon({
                                className: 'newmall',
                                iconSize: [10, 10],
                            }),
                            draggable: 'true'
                        });
                        myapp.marker.on('dragend', function (event) {
                            var m = event.target,
                                position = m.getLatLng();
                            m.setLatLng(position);
                            document.querySelector('#lat').value = position.lat;
                            document.querySelector('#lon').value = position.lng;
                        });
                        document.querySelector('#lat').value = pos.lat;
                        document.querySelector('#lon').value = pos.lng;
                        mymap.addLayer(myapp.marker);
                        cdb.$('.newmall').css('background', myapp.color);
                        cdb.$('.CDB-Button').removeClass('is-disabled');
                    };
                if (lat == '' || isNaN(lat) || lon == '' || isNaN(lon)) {
                    document.querySelector('.leaflet-map-pane').style.cursor = 'crosshair';
                    mymap.once('click', function (e) {
                        addmarker(e.latlng);
                        document.querySelector('.leaflet-map-pane').style.cursor = '';
                    });
                } else {
                    addmarker(cdb.L.latLng(lat, lon));
                }
            };

        myapp.sqlclient = new cartodb.SQL({
            user: username,
            protocol: "https",
            sql_api_template: "https://{user}.cartodb.com:443"
        });

        myapp.dashboard = cartodb.deepInsights.createDashboard('#dashboard', window.myapp.dijson, {
            no_cdn: false
        }, function (err, dashboard) {

            myapp.Lmap = dashboard.getMap();
            myapp.layers = myapp.Lmap.getLayers();
            myapp.layers.map(function (a) {
                var tmp;
                if (a.attributes.sql == void 0) {
                    tmp = dashboard._dashboard.vis._analysisCollection.models.filter(function (b) {
                        return b.id == a.attributes.source;
                    })[0];
                    if (tmp != void 0) a.attributes.sql = tmp.attributes.query;
                }
                return a;
            });

            dashboard.createFormulaWidget({
                "title": "Charging stations",
                "column": "cartodb_id",
                "operation": "count"
            }, myapp.layers[2]);

            cdb.$('#lat, #lon').on('propertychange change click keyup input paste', function (e) {
                if (isNaN(e.target.value) || e.target.value == '') {
                    cdb.$('.CDB-Button').addClass('is-disabled');
                } else {
                    cdb.$('.CDB-Button').removeClass('is-disabled');
                }
            });

            myapp.calc = function () {
                var newmall = function (lat, lon) {
                        var mymap = myapp.Lmap.getNativeMap(),
                            pos,
                            addmarker = function (pos) {
                                myapp.marker = new cdb.L.marker(pos, {
                                    icon: cdb.L.divIcon({
                                        className: 'newmall',
                                        iconSize: [20, 20],
                                    }),
                                    draggable: 'true'
                                });
                                myapp.marker.on('dragend', function (event) {
                                    var m = event.target,
                                        position = m.getLatLng();
                                    m.setLatLng(position);
                                    document.querySelector('#lat').value = position.lat;
                                    document.querySelector('#lon').value = position.lng;
                                });
                                document.querySelector('#lat').value = pos.lat;
                                document.querySelector('#lon').value = pos.lng;
                                mymap.addLayer(myapp.marker);
                                cdb.$('.newmall').css('background', myapp.color);

                            };
                        if (lat == '' || isNaN(lat) || lon == '' || isNaN(lon)) {
                            document.querySelector('.leaflet-map-pane').style.cursor = 'crosshair';
                            mymap.once('click', function (e) {
                                addmarker(e.latlng);
                                document.querySelector('.leaflet-map-pane').style.cursor = '';
                                cdb.$('.CDB-Button').removeClass('is-disabled');
                            });
                        } else {
                            addmarker(cdb.L.latLng(lat, lon));
                            cdb.$('.CDB-Button').removeClass('is-disabled');
                        }
                    },
                    lat = cdb.$('#lat').get(0).value,
                    lon = cdb.$('#lon').get(0).value,
                    w = cdb.$('#myselector').get(0).value;

                myapp.widgets = dashboard.getWidgets();
                myapp.widgets.forEach(function (w, i) {
                    if (w.attributes.title != 'Charging stations') w.remove();
                })
                myapp.widgets.forEach(function (w, i) {
                    if (w.attributes.title != 'Charging stations') w.remove();
                })

                if (isNaN(lat) || isNaN(lon) || lat == '' || lon == '') {
                    alert('Values for the new station are not right');
                    return;
                }
                if (myapp.tic == void 0) {
                    var d = new Date();
                    myapp.tic = -1 * d.getTime();
                }

                cdb.$('.CDB-Loader').addClass('is-visible');
                cdb.$('.CDB-Button').addClass('is-disabled');
                myapp.sqlclient.execute("select ele_tmp(" + myapp.tic + "::bigint," + lat + "::numeric," + lon + "::numeric," + w + "::numeric)", {})
                    .done(function (data) {
                        myapp.layers[1].set('sql', 'select t.dist, t.h as cars, t.hpop, t.name, t.pop, t.sba, ss.the_geom, ss.the_geom_webmercator from abel.gla_madrid_tmp t, abel.charging_stations_muni ss where ss.cartodb_id = source_id and target_id =' + myapp.tic + new Array(rep).join(' '));
                        setTimeout(function () {
                            dashboard.createFormulaWidget({
                                "title": "Total cars",
                                "column": "pop",
                                "operation": "sum"
                            }, myapp.layers[1]);
                            dashboard.createFormulaWidget({
                                "title": "Potential customers (cars)",
                                "column": "hpop",
                                "operation": "sum"
                            }, myapp.layers[1]);
                            dashboard.createHistogramWidget({
                                "title": "Probability of patronage",
                                "column": "cars",
                                "bins": 20
                            }, myapp.layers[1]);
                            dashboard.createHistogramWidget({
                                "title": "Distance to charging station",
                                "column": "dist",
                                "bins": 20
                            }, myapp.layers[1]);
                            dashboard.createCategoryWidget({
                                "title": "Brand",
                                "column": "gestor",
                                "aggregation": "count"
                            }, myapp.layers[2]);
                            myapp.widgets = dashboard.getWidgets();
                            myapp.widgetsdata = dashboard.getWidgets().map(function (a) {
                                return a.dataviewModel
                            });
                            rep += 1;
                            cdb.$('.CDB-Loader').removeClass('is-visible');
                            cdb.$('.CDB-Button').removeClass('is-disabled');
                        }, 750);
                    });

            };
            cdb.$('#calc').on('click', myapp.calc);

            myapp.reset = function () {
                myapp.widgets = dashboard.getWidgets();
                myapp.widgets.forEach(function (w, i) {
                    if (w.attributes.title != 'Charging stations') w.remove();
                })
                myapp.widgets.forEach(function (w, i) {
                    if (w.attributes.title != 'Charging stations') w.remove();
                })
                myapp.marker != void 0 && myapp.Lmap.getNativeMap().removeLayer(myapp.marker);
                myapp.layers[1].set('sql', 'SELECT * FROM charging_stations_muni');
                dashboard.createHistogramWidget({
                    "title": "Population per municipality",
                    "column": "pop",
                    "bins": 20
                }, myapp.layers[1]);
                dashboard.createHistogramWidget({
                    "title": "Cars per municipality",
                    "column": "cars",
                    "bins": 20
                }, myapp.layers[1]);
                dashboard.createHistogramWidget({
                    "title": "Bikes per municipality",
                    "column": "bikes",
                    "bins": 20
                }, myapp.layers[1]);
                dashboard.createCategoryWidget({
                    "title": "Brand",
                    "column": "gestor",
                    "aggregation": "count"
                }, myapp.layers[2]);
                myapp.widgets = dashboard.getWidgets();
                myapp.widgetsdata = dashboard.getWidgets().map(function (a) {
                    return a.dataviewModel
                });
                newmall();
                rep = 1;
            }
            cdb.$('#reset').on('click', myapp.reset);

            myapp.reset();
            myapp.widgets = dashboard.getWidgets();
            myapp.wcontainer = cdb.$('#' + vis.$el.context.id + ' .CDB-Widget-canvasInner').get(0);
            myapp.wcontainer.insertBefore(mywidget, myapp.wcontainer.children[0]);


        });
    }
})();
