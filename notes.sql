
-- malls GLA generation

with 
c as(
	SELECT
	*
	FROM
	    abel.centros_comerciales_de_madrid
	WHERE not no_cc
),
t as (
	SELECT
	    array_agg(cartodb_id::bigint) as id,
	    array_agg(the_geom) as g,
	    array_agg(coalesce(sba,0)::numeric) as w
	FROM c
),
s as (
	SELECT
	    array_agg(cartodb_id::bigint) as id,
	    array_agg(center) as g,
	    array_agg(coalesce(t1_1, 0)::numeric) as p
	FROM
	    sscc_madrid
)
select
    g.*,
    c.sba,
	c.name,
100*hpop/h as pop
FROM c, t, s, cdb_crankshaft.CDB_Gravity(t.id, t.g, t.w, s.id, s.g, s.p, c.cartodb_id, 100000, 0) g




-- GLA layer

select 
dist, h, hpop, name, pop, sba, 
ss.the_geom, ss.the_geom_webmercator, ss.age_mode 
from abel.gla_madrid, abel.sscc_madrid ss 
where ss.cartodb_id = source_id and target_id=71

-- chargers
with a as(
select
  	cartodb_id,
	case when location='Gas station' then 1
	 when location='Mall' then 2
	 when location='Taxis only' then 0
	 when location='Private' then 0
	 when location='Camping' then 0.5
	 when location='Garages' then 1
	 when location='Parking' then 2
	 when location='Car dealer' then 0.5
	 when location='Hotel' then 0.5
	 when location='Airport' then 0.5
	 when location='Private use' then 0
	 when location='Ground level' then 1
	 when location='Restaurant' then 1.5
	 when location='Shop' then 1.5 end as weight
	from abel.charging_stations_spain
)
update abel.charging_stations_spain set w=a.weight
from a
where a.cartodb_id=abel.charging_stations_spain.cartodb_id
