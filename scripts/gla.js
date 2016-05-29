(function () {

    window.myapp = window.myapp || {};

    window.onload = function () {

        var // diJSON = 'https://team.cartodb.com/u/abel/api/v3/viz/a4193e4e-25d5-11e6-9e21-0e787de82d45/viz.json',
            username = window.myapp.dijson.datasource.user_name,//username = diJSON.match(/\/u\/(.+)\/api\/v\d\/|:\/\/(.+)\.cartodb\.com\/api/i)[1],
            myapp = window.myapp,
            options='',
            mywidget = document.querySelector('#mywidget');

        myapp.sqlclient = new cartodb.SQL({ // SQL client
            user: username,
            protocol: "https",
            sql_api_template: "https://{user}.cartodb.com:443"
        });

        myapp.sqlclient.execute("SELECT * FROM abel.centros_comerciales_de_madrid where not no_cc and sba >0 order by sba desc", {})
             .done(function (data) {
            var selector = document.querySelector('#myselector');
            for (var i=0; i<data.rows.length;i++){
                options += '<option value='+data.rows[i].cartodb_id+((i==0)?' selected':'')+'>'+data.rows[i].name+'</option>';
            }
            selector.innerHTML=options;
            selector.onchange = function(){
                myapp.layers[1].set('sql','select dist, h, hpop, name, pop, sba, ss.the_geom, ss.the_geom_webmercator, ss.age_mode from abel.gla_madrid, abel.sscc_madrid ss where ss.cartodb_id = source_id and target_id='+this.value);
                myapp.layers[2].set('cartocss','#centros_comerciales_de_madrid{   marker-fill-opacity: 0.9;   marker-line-color: #FFF;   marker-line-width: 1;   marker-line-opacity: 1;   marker-placement: point;   marker-multi-policy: largest;   marker-type: ellipse;   marker-fill: ramp([sba], cartocolor(Teal2, 7));   marker-allow-overlap: true;   marker-clip: false; marker-width: 10;[cartodb_id='+this.value+']{marker-width: 20;}}');
                setTimeout(function(){myapp.widgetsdata.forEach(function(a){a.refresh();})}, 750);
            }
        })

        cartodb.deepInsights.createDashboard('#dashboard',  window.myapp.dijson, {
            no_cdn: false
        }, function (err, dashboard) {
            myapp.Lmap = dashboard.getMap(); // Leaflet map object
            myapp.layers = myapp.Lmap.getLayers(); // CartoDB layers
            // if the layer has an analysis node, its SQL is not exposed in the API
            myapp.layers.map(function (a) {
                var tmp;
                if (a.attributes.sql != void 0) {
                    tmp = dashboard._dashboard.vis._analysisCollection.models.filter(function (b) {
                        return b.id == b.attributes.source;
                    })[0];
                    if (tmp != void 0) a.attributes.sql = tmp.attributes.query;
                }
                return a;
            });

            dashboard.createFormulaWidget({
                "title": "Total pop.",
                "column": "pop",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createFormulaWidget({
                "title": "Patronizing pop.",
                "column": "hpop",
                "operation": "sum"
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Chance of patronizing",
                "column": "h",
                "bins": 20,
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Distance to mall",
                "column": "dist",
                "bins": 20,
            }, myapp.layers[1]);
            dashboard.createHistogramWidget({
                "title": "Avg age",
                "column": "age_mode",
                "bins": 20,
            }, myapp.layers[1]);

            myapp.widgetsdata = dashboard.getWidgets().map(function (a) { // Array of widgets’ data models
                return a.dataviewModel
            });
            myapp.widgets = dashboard.getWidgets(); // Array of widgets views

            myapp.wcontainer = cdb.$('#' + vis.$el.context.id + ' .CDB-Widget-canvasInner').get(0); // Container
            myapp.wcontainer.insertBefore(mywidget, myapp.wcontainer.children[0]);



        });
    }



})();
