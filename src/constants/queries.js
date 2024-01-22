const queries = {};
export default queries;

queries.jwtTestQuery = `
query Test {
  __typename ## Placeholder value
}`;

queries.landParcel = `
query MyQuery($bbPoly: geometry) {
  alkis_landparcel(where: {geom: {geo_field: {_st_intersects: $bbPoly}}}) {
    gemarkung
    flur
    fstck_nenner
    fstck_zaehler
    id
    geom {
      geo_field
    }
  }
}`;

queries.anordnungById = `
query MyQuery($id: String) {
  vzk_anordnung(where: {uuid: {_eq: $id}}) {
    id
    department_name
    department_number
    department
    number
    title
    uuid
    vzk_status {
      name
    }
    vzk_type {
      name
    }
    vzk_anordnung_timelineArrayRelationShip {
      fk_uuid
      uuid
      name
      vzk_attachment_typ {
        name
      }
    }
  }
}`;

queries.allAnordnungen = `
query MyQuery {
  vzk_anordnung {
    id
    department_name
    department_number
    department
    number
    title
    uuid
    vzk_status {
      name
    }
    vzk_type {
      name
    }
    vzk_anordnung_timelineArrayRelationShip {
      fk_uuid
      uuid
      name
      vzk_attachment_typ {
        name
      }
    }
  }
}`;
