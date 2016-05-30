CREATE OR REPLACE FUNCTION gla_tmp(
    lat numeric,
    lon numeric,
    gla numeric
)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    truncate table abel.gla_madrid_tmp;
    with t as (
        SELECT
            -1 || array_agg(cartodb_id) as id,
            CDB_LatLng(lat, lon) || array_agg(the_geom) as g,
            gla || array_agg(coalesce(sba,0)::numeric) as w
        FROM
            abel.centros_comerciales_de_madrid
        WHERE not no_cc
    ),
    s as (
        SELECT
            array_agg(cartodb_id) as id,
            array_agg(center) as g,
            array_agg(coalesce(t1_1, 0)::numeric) as p
        FROM
            sscc_madrid
    ),
    r as(
        select
            g.source_id as cartodb_id,
            'NEW MALL' as name,
            gla::numeric as sba,
            g.source_id,
            g.target_id,
            trunc(g.h,2) as h,
            round(g.hpop) as hpop,
            100*round(g.hpop/g.h) as pop,
            trunc(g.dist/1000,2) as dist
        FROM t, s, CDB_Gravity1(t.id, t.g, t.w, s.id, s.g, s.p, -1, 100000, 0) g
    )
    INSERT INTO abel.gla_madrid_tmp (cartodb_id, name, sba, source_id, target_id, h, hpop, pop, dist) select * from r;
    return 1;
END;
$$;
