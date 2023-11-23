import getArea from "@turf/area";
import bboxPolygon from "@turf/bbox-polygon";
import { reproject } from "reproject";
import proj4 from "proj4";
import { projectionData } from "react-cismap/constants/gis";

export const getArea25832 = (geoJSON) => {
  const wGS84GeoJSON = getWGS84GeoJSON(geoJSON);
  if (wGS84GeoJSON !== undefined) {
    return getArea(wGS84GeoJSON);
  }
};

export const getWGS84GeoJSON = (geoJSON) => {
  try {
    const reprojectedGeoJSON = reproject(
      geoJSON,
      projectionData["25832"].def,
      proj4.WGS84
    );

    return reprojectedGeoJSON;
  } catch (e) {
    return undefined;
  }
};

export const createQueryGeomFromBB = (boundingBox) => {
  const geom = bboxPolygon([
    boundingBox.left,
    boundingBox.top,
    boundingBox.right,
    boundingBox.bottom,
  ]).geometry;
  geom.crs = {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::25832",
    },
  };
  const reprojectedGeoJSON = reproject(
    {
      type: "Feature",
      geometry: geom,
      properties: {},
    },
    projectionData["3857"].def,
    projectionData["25832"].def
  );
  const updatedGeom = reprojectedGeoJSON.geometry;
  updatedGeom.crs = {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::25832",
    },
  };

  return updatedGeom;
};
