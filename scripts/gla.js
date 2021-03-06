(function () {

    window.myapp = window.myapp || {};

    window.onload = function () {

        var username = window.myapp.dijson.datasource.user_name,
            myapp = window.myapp,
            options = '',
            rep = 1,
            bins = [6675, 10723, 14390, 23234, 31070, 55000, 152887],
            colors = ["#b2eee6", "#90d7d3", "#69bebf", "#37a4ab", "#1a8a98", "#017087", "#005777"],
            mywidget = document.querySelector('#mywidget'),
            changestate = function (el, state) {
                el.prop('disabled', !state);
                if (state) {
                    el.removeClass('is-disabled');
                } else {
                    el.addClass('is-disabled');
                }
            },
            oldquery, oldcss,
            geticon = function () {
                var j = 0,
                    s,
                    gla = cdb.$('#gla').get(0).value;
                for (var i = 0; i < bins.length; i++) {
                    if (gla < bins[i]) {
                        j = i;
                        break;
                    }
                }
                myapp.color = colors[j];
                s = 10 + j * (20 - 10) / 7;
                return cdb.L.divIcon({
                                className: 'newmall',
                                iconSize: [s, s],
                            })
            },
            newmall = function (lat, lon) {
                var mymap = myapp.Lmap.getNativeMap(),
                    pos,
                    addmarker = function (pos) {
                        myapp.marker = new cdb.L.marker(pos, {
                            icon: geticon(),
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
                        cdb.$('.newmall').css('background',myapp.color);
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
            },
            changegla = function(e){
                if (myapp.marker == void 0) return;
                myapp.marker.setIcon(geticon());
                cdb.$('.newmall').css('background',myapp.color);
            };

        myapp.sqlclient = new cartodb.SQL({
            user: username,
            protocol: "https",
            sql_api_template: "https://{user}.cartodb.com:443"
        });

        myapp.sqlclient.execute("SELECT * FROM abel.centros_comerciales_de_madrid where not no_cc and sba >0 order by sba desc", {})
            .done(function (data) {
                var selector = document.querySelector('#myselector');
                for (var i = 0; i < data.rows.length; i++) {
                    options += '<option value=' + data.rows[i].cartodb_id + ((i == 0) ? ' selected' : '') + '>' + data.rows[i].name + '</option>';
                }
                selector.innerHTML = options;
                selector.onchange = function () {
                    cdb.$('.CDB-Loader').addClass('is-visible');
                    myapp.layers[2].set('cartocss', "#centros_comerciales_de_madrid{\n  marker-fill-opacity: 0.9;\n  marker-line-color: #FFF;\n  marker-line-width: 1;\n  marker-line-opacity: 1;\n  marker-placement: point;\n  marker-multi-policy: largest;\n  marker-type: ellipse;\n  marker-fill: ramp([sba], cartocolor(Teal, 7));\n  marker-allow-overlap: true;\n  marker-clip: false;\nmarker-width: ramp([sba], 10, 20);[cartodb_id=" + this.value + "]{marker-line-color: red;\n  marker-line-width: 2;}}");
                    myapp.layers[1].set('sql', 'select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid, abel.sscc_madrid ss where ss.cartodb_id = source_id and target_id=' + this.value);
                    setTimeout(function () {
                        myapp.widgetsdata.forEach(function (a) {
                            a.refresh();
                            cdb.$('.CDB-Loader').removeClass('is-visible');
                        })
                    }, 750);
                }
            })

        cartodb.deepInsights.createDashboard('#dashboard', window.myapp.dijson, {
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
                "title": "Total population",
                "column": "pop",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createFormulaWidget({
                "title": "Potential customers",
                "column": "hpop",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Probability of patronage",
                "column": "h",
                "bins": 20,
                "normalized": true
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Distance to mall",
                "column": "dist",
                "bins": 20,
                "normalized": true
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Avg age",
                "column": "age_mode",
                "bins": 20,
                "normalized": true
            }, myapp.layers[1]);

            myapp.widgetsdata = dashboard.getWidgets().map(function (a) {
                return a.dataviewModel
            });
            myapp.widgets = dashboard.getWidgets();

            myapp.wcontainer = cdb.$('#' + vis.$el.context.id + ' .CDB-Widget-canvasInner').get(0);
            myapp.wcontainer.insertBefore(mywidget, myapp.wcontainer.children[0]);

            cdb.$('input[type=radio]').on('click', function () {
                var s = cdb.$('#myselector'),
                    i = cdb.$('.CDB-InputText');
                if (this.value == '02' && this.checked) {
                    changestate(s, false);
                    changestate(i, true);
                    oldquery = myapp.layers[1].get('sql');
                    oldcss = myapp.layers[2].get('cartocss');
                    myapp.layers[2].set('cartocss', "#centros_comerciales_de_madrid{\n  marker-fill-opacity: 0.9;\n  marker-line-color: #FFF;\n  marker-line-width: 1;\n  marker-line-opacity: 1;\n  marker-placement: point;\n  marker-multi-policy: largest;\n  marker-type: ellipse;\n  marker-fill: ramp([sba], cartocolor(Teal, 7));\n  marker-allow-overlap: true;\n  marker-clip: false;\nmarker-width: ramp([sba], 10, 20);\n}")
                    newmall(cdb.$('#lat').get(0).value, cdb.$('#lon').get(0).value);
                } else {
                    cdb.$('.CDB-Loader').addClass('is-visible');
                    rep = 1;
                    changestate(s, true);
                    changestate(i, false);
                    myapp.marker != void 0 && myapp.Lmap.getNativeMap().removeLayer(myapp.marker);
                    myapp.layers[1].set('sql', oldquery);
                    myapp.layers[2].set('cartocss', oldcss);
                    setTimeout(function () {
                        myapp.widgetsdata.forEach(function (a) {
                            a.refresh();
                            cdb.$('.CDB-Loader').removeClass('is-visible');
                        })
                    }, 750);
                }
            });
            cdb.$('#calcnew').on('click', function () {
                var lat = cdb.$('#lat').get(0).value,
                    lon = cdb.$('#lon').get(0).value,
                    gla = cdb.$('#gla').get(0).value;
                if (isNaN(lat) || isNaN(lon) || isNaN(gla) || gla <= 0 || lat == '' || lon == '' || gla =='') {
                    alert('Values for the new mall are not right');
                    return;
                }
                if (myapp.tic == void 0) {
                    var d = new Date();
                    myapp.tic = -1 * d.getTime();
                }
                cdb.$('.CDB-Loader').addClass('is-visible');
                myapp.sqlclient.execute("select gla_tmp(" + myapp.tic + "," + lat + "::numeric," + lon + "::numeric," + gla + "::numeric)", {})
                    .done(function (data) {
                        myapp.layers[1].set('sql', 'select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid_tmp, abel.sscc_madrid ss where ss.cartodb_id = source_id and target_id =' + myapp.tic + new Array(rep).join(' '));
                        setTimeout(function () {
                            myapp.widgetsdata.forEach(function (a) {
                                a.refresh();
                                rep += 1;
                                cdb.$('.CDB-Loader').removeClass('is-visible');
                            })
                        }, 750);
                    });

            });
            cdb.$('#gla').on('change keyup',changegla);
        });
    }
})();
