CREATE OR REPLACE FUNCTION abel.cdb_gravity1(t_id bigint[], t_geom geometry[], t_weight numeric[], s_id bigint[], s_geom geometry[], s_pop numeric[], target bigint, radius integer, minval numeric DEFAULT '-100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'::numeric)
 RETURNS TABLE(the_geom geometry, source_id bigint, target_id bigint, dist numeric, h numeric, hpop numeric)
 LANGUAGE plpgsql
AS $function$
DECLARE
    t_type text;
    s_type text;
    t_center geometry[];
    s_center geometry[];
BEGIN
    t_type := GeometryType(t_geom[1]);
    s_type := GeometryType(s_geom[1]);
    IF t_type = 'POINT' THEN
        t_center := t_geom;
    ELSE
        WITH tmp as (SELECT unnest(t_geom) as g) SELECT array_agg(ST_Centroid(g)) INTO t_center FROM tmp;
    END IF;
    IF s_type = 'POINT' THEN
        s_center := s_geom;
    ELSE
        WITH tmp as (SELECT unnest(s_geom) as g) SELECT array_agg(ST_Centroid(g)) INTO s_center FROM tmp;
    END IF;
    RETURN QUERY
        with target0 as(
            SELECT unnest(t_center) as tc, unnest(t_weight) as tw, unnest(t_id) as td
        ),
        source0 as(
            SELECT unnest(s_center) as sc, unnest(s_id) as sd, unnest (s_geom) as sg, unnest(s_pop) as sp
        ),
        prev0 as(
            SELECT
                source0.sg,
                source0.sd as sourc_id,
                coalesce(source0.sp,0) as sp,
                target.td as targ_id,
                coalesce(target.tw,0) as tw,
                GREATEST(1.0,ST_Distance(geography(target.tc), geography(source0.sc)))::numeric as distance
            FROM source0
            CROSS JOIN LATERAL
                (
                SELECT
                    *
                FROM target0
                    WHERE tw > minval
                    AND ST_DWithin(geography(source0.sc), geography(tc), radius)
                ) AS target
        ),
        deno as(
            SELECT
                sourc_id,
                sum(tw/distance) as h_deno
            FROM
                prev0
            GROUP BY sourc_id
        )
        SELECT
            p.sg as the_geom,
            p.sourc_id as source_id,
            p.targ_id as target_id,
            case when p.distance > 1 then p.distance else 0.0 end as dist,
            100*(p.tw/p.distance)/d.h_deno as h,
            p.sp*(p.tw/p.distance)/d.h_deno as hpop
        FROM
            prev0 p,
            deno d
        WHERE
            p.targ_id = target AND
            p.sourc_id = d.sourc_id;
END;
$function$



CREATE OR REPLACE FUNCTION gla_tmp(
    tic bigint,
    lat numeric,
    lon numeric,
    gla numeric
)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    delete from gla_madrid_tmp where target_id=tic or target_id >= tic + 3600000;
    with t as (
        SELECT
            tic || array_agg(cartodb_id::bigint) as id,
            CDB_LatLng(lat, lon) || array_agg(the_geom) as g,
            gla || array_agg(coalesce(sba,0)::numeric) as w
        FROM
            abel.centros_comerciales_de_madrid
        WHERE not no_cc
    ),
    s as (
        SELECT
            array_agg(cartodb_id::bigint) as id,
            array_agg(center) as g,
            array_agg(coalesce(t1_1, 0)::numeric) as p
        FROM
            sscc_madrid
    ),
    r as(
        select
            'NEW MALL' as name,
            gla::numeric as sba,
            g.source_id,
            g.target_id,
            trunc(g.h,2) as h,
            round(g.hpop) as hpop,
            100*round(g.hpop/g.h) as pop,
            trunc(g.dist/1000,2) as dist
        FROM t, s, CDB_Gravity1(t.id, t.g, t.w, s.id, s.g, s.p, tic, 100000, 0) g
    )
    INSERT INTO abel.gla_madrid_tmp (name, sba, source_id, target_id, h, hpop, pop, dist) select name, sba, source_id, target_id, h, hpop, pop, dist from r;
    return 1;
END;
$$;

CREATE OR REPLACE FUNCTION ele_tmp(
    tic bigint,
    lat numeric,
    lon numeric,
    ele numeric
)
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    delete from gla_madrid_tmp where target_id=tic or target_id >= tic + 3600000;
    with t as (
        SELECT
            tic || array_agg(cartodb_id::bigint) as id,
            CDB_LatLng(lat, lon) || array_agg(the_geom) as g,
            ele || array_agg(coalesce(w,0)::numeric) as w
        FROM
            abel.charging_stations_spain
    ),
    s as (
        SELECT
            array_agg(cartodb_id::bigint) as id,
            array_agg(center) as g,
            array_agg(coalesce(cars, 0)::numeric) as p
        FROM
            abel.charging_stations_muni
    ),
    r as(
        select
            'NEW STATION' as name,
            ele::numeric as sba,
            g.source_id,
            g.target_id,
            trunc(g.h,2) as h,
            round(g.hpop) as hpop,
            100*round(g.hpop/g.h) as pop,
            trunc(g.dist/1000,2) as dist
        FROM t, s, CDB_Gravity1(t.id, t.g, t.w, s.id, s.g, s.p, tic, 100000, 0) g
    )
    INSERT INTO abel.gla_madrid_tmp (name, sba, source_id, target_id, h, hpop, pop, dist) select name, sba, source_id, target_id, h, hpop, pop, dist from r;
    return 1;
END;
$$;
