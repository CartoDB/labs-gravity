(function () {

    window.myapp = window.myapp || {};

    window.onload = function () {

        var username = window.myapp.dijson.datasource.user_name,
            myapp = window.myapp,
            options = '',
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
            newmall = function () {
                var mymap = myapp.Lmap.getNativeMap(),
                    myicon = cdb.L.divIcon({
                        className: 'newmall',
                        iconSize: [20, 20],
                    });
                document.querySelector('.leaflet-map-pane').style.cursor = 'crosshair';
                mymap.once('click', function (e) {
                    var pos = e.latlng;
                    myapp.marker = new cdb.L.marker(pos, {
                        icon: myicon,
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
                    document.querySelector('.leaflet-map-pane').style.cursor = '';
                    mymap.addLayer(myapp.marker);
                });
            }

        myapp.sqlclient = new cartodb.SQL({
            user: username,
            protocol: "https",
            sql_api_template: "https://{user}.cartodb.com:443"
        });

        myapp.sqlclient.execute("SELECT targ_name as name FROM abel.huff_13_2k_full group by targ_name order by targ_name asc", {})
            .done(function (data) {
                var selector = document.querySelector('#myselector');
                for (var i = 0; i < data.rows.length; i++) {
                    options += '<option value=' + data.rows[i].name + ((data.rows[i].name == 'Madrid') ? ' selected' : '') + '>' + data.rows[i].name + '</option>';
                }
                selector.innerHTML = options;
                selector.onchange = function () {
                    var myquery = "SELECT d.cartodb_id, d.dist_km as dist, d.h, d.sourc_name, d.targ_name, d.spob, d.spob_pat, d.tpob, h.the_geom, h.the_geom_webmercator, replace(h.idx_indus,',','')::numeric as idx_indus, replace(h.idx_com,',','')::numeric as idx_com, replace(h.idx_restauracion,',','')::numeric as idx_restauracion, replace(h.idx_turism,',','')::numeric as idx_turism, replace(h.idx_act_eco,',','')::numeric as idx_act_eco, h.paro, h.malls FROM     abel.huff_13_2k_full d left join     abel.spainmunicipalitiesfull h on h.ine=d.sourc_ine::integer where d.targ_name='"+this.value+"'";
                    cdb.$('.CDB-Loader').addClass('is-visible');
                    myapp.layers[1].set('sql', myquery);
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
                "column": "spob",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createFormulaWidget({
                "title": "Potential customers",
                "column": "spob_pat",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createFormulaWidget({
                "title": "Malls",
                "column": "malls",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Probability of patronage",
                "column": "h",
                "bins": 20
            }, myapp.layers[1]);
            dashboard.createCategoryWidget({
                "title": "Municipalities per potential customers",
                "column": "sourc_name",
                "aggregation_column": "spob_pat",
                "aggregation": "sum",
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Distance to target",
                "column": "dist",
                "bins": 20
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Economic activity index",
                "column": "idx_act_eco",
                "bins": 10
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Commercial index",
                "column": "idx_com",
                "bins": 10
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Catering index",
                "column": "idx_restauracion",
                "bins": 10
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Tourism index",
                "column": "idx_turism",
                "bins": 10
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Industrual index",
                "column": "idx_indus",
                "bins": 10
            }, myapp.layers[1]);

            myapp.widgetsdata = dashboard.getWidgets().map(function (a) {
                return a.dataviewModel
            });
            myapp.widgets = dashboard.getWidgets();

            myapp.wcontainer = cdb.$('#' + vis.$el.context.id + ' .CDB-Widget-canvasInner').get(0);
            myapp.wcontainer.insertBefore(mywidget, myapp.wcontainer.children[0]);

            /*cdb.$('input[type=radio]').on('click', function () {
                var s = cdb.$('#myselector'),
                    i = cdb.$('.CDB-InputText');
                if (this.value == '02' && this.checked) {
                    changestate(s, false);
                    changestate(i, true);
                    oldquery = myapp.layers[1].get('sql');
                    oldcss = myapp.layers[2].get('cartocss');
                    myapp.layers[2].set('cartocss', '#centros_comerciales_de_madrid{   marker-fill-opacity: 0.9;   marker-line-color: #FFF;   marker-line-width: 1;   marker-line-opacity: 1;   marker-placement: point;   marker-multi-policy: largest;   marker-type: ellipse;   marker-fill: ramp([sba], cartocolor(Teal2, 7));   marker-allow-overlap: true;   marker-clip: false; marker-width: 10;}');
                    newmall();
                } else {
                    cdb.$('.CDB-Loader').addClass('is-visible');
                    changestate(s, true);
                    changestate(i, false);
                    myapp.marker!= void 0 && myapp.Lmap.getNativeMap().removeLayer(myapp.marker);
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
            */
            /*
            cdb.$('#calcnew').on('click', function () {
                var lat = cdb.$('#lat').get(0).value,
                    lon = cdb.$('#lon').get(0).value,
                    gla = cdb.$('#gla').get(0).value;
                if (isNaN(lat) || isNaN(lon) || isNaN(gla) || gla <= 0) {
                    alert('Values for the new mall are not right');
                    return;
                }
                if (myapp.tic == void 0){
                    var d = new Date();
                    myapp.tic = -1 * d.getTime();
                }
                cdb.$('.CDB-Loader').addClass('is-visible');
                myapp.sqlclient.execute("select gla_tmp("+myapp.tic+","+lat+"::numeric,"+lon+"::numeric,"+gla+"::numeric)", {})
                .done(function (data) {
                    myapp.layers[1].set('sql', 'select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid_tmp, abel.sscc_madrid ss where ss.cartodb_id = source_id');
                        setTimeout(function () {
                        myapp.widgetsdata.forEach(function (a) {
                            a.refresh();
                            cdb.$('.CDB-Loader').removeClass('is-visible');
                        })
                    }, 750);
                });

            });
            */
        });
    }
})();
