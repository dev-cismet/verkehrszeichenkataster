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
        id
        name
      }
    }
  }
}`;

queries.textById = `
query MyQuery($id: String) {
  vzk_attachment_text(where: {uuid: {_eq: $id}}) {
    id
    text
    uuid
  }
}`;

queries.drawingById = `
query MyQuery($id: String) {
  vzk_attachment_drawing(where: {uuid: {_eq: $id}}) {
    drawing
    id
    uuid
  }
}`;

queries.fileById = `
query MyQuery($id: String) {
  vzk_attachment_file(where: {uuid: {_eq: $id}}) {
    description
    file
    id
    name
    uuid
  }
}`;

queries.requestById = `
query MyQuery($id: String) {
  vzk_attachment_request(where: {uuid: {_eq: $id}}) {
    billing_city
    uuid
    billing_postal_code
    billing_street
    billing_street_number
    description
    email
    firstname
    id
    lastname
    phone
    requester_city
    requester_postalcode
    requester_street
    requester_street_number
    sign_location
    time
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
      id
      name
    }
    vzk_type {
      id
      name
    }
    vzk_anordnung_timelineArrayRelationShip {
      fk_uuid
      uuid
      name
      vzk_attachment_typ {
        id
        name
      }
    }
  }
}`;
