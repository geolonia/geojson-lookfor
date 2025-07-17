# geojson-lookfor
Quickly search any feature from GeoJSON.
Can be searched by any keyword.
This is an npm module that returns GeoJson that only contains geojson that match the keywords.

## Usage
1. Install through npm.
```shell
npm i @geolonia/geojson-lookfor
```
2. Require the module.
```javascript
const gl = require("@geolonia/geojson-lookfor");
```
3. Initialize by passing geojson to the GeoJsonlookfor object.
```javascript
const GeoJsonlookfor = new gl.GeoJsonlookfor(geojson);
```
4. We can look for features with "bakery" in their properties in the following ways.
```javascript
GeoJsonlookfor.match('bakery');
console.log(GeoJsonlookfor.getGeoJSON());
```

When importing:
```javascript
import { GeoJsonlookfor } from '@geolonia/geojson-lookfor';

const gl = new GeoJsonlookfor(geojson);
const result = gl.match(keyword).getGeoJSON();

console.log(result);
```

## Example
1. Look for a feature with "clothing store".
```typescript
const gl = require("@geolonia/geojson-lookfor");
const geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Bistro A",
          "address": "sample address",
          "category": "restaurant"
        },
        "geometry": {
          "coordinates": [
            139.517720985072,
            35.99865685174926
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "sample shop",
          "address": "sample address",
          "category": "clothing store"
        },
        "geometry": {
          "coordinates": [
            139.3008590099202,
            35.97501042924834
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Bistro B",
          "address": "sample address",
          "category": "restaurant"
        },
        "geometry": {
          "coordinates": [
            139.5371783066526,
            35.941979468748585
          ],
          "type": "Point"
        }
      }
    ]
}

const GeoJsonlookfor = new gl.GeoJsonlookfor(geojson);
const res = GeoJsonlookfor.match('clothing store').getGeoJSON();

console.log(res);
```
```shell
# result
{
  type: 'FeatureCollection',
  features: [ 
    {
        "type": "Feature",
        "properties": {
            "name": "sample shop",
            "address": "sample address",
            "category": "clothing store"
        },
        "geometry": {
            "coordinates": [
            139.3008590099202,
            35.97501042924834
            ],
            "type": "Point"
        }
    }
  ]
}
```

2. Look for a feature with "restaurant" and "A".
```typescript
const res = GeoJsonlookfor.match('restaurant').match('A').getGeoJSON();

console.log(res);
```
```shell
# result
{
  type: 'FeatureCollection',
  features: [
    {
        type: 'Feature',
        properties: {
            name: 'Bistro A',
            address: 'sample address',
            category: 'restaurant'
        },
        geometry: {
            coordinates: [ 
                139.517720985072, 
                35.99865685174926 
            ],
            type: 'Point'
        }
    }
  ]
}
```

## Exclude Keys from Search

You can exclude specific property keys from the search by using the `excludeKeys` option in the `match` function.  
This is useful when you want to ignore certain fields during keyword matching.

### Example

```javascript
const gl = new GeoJsonlookfor(geojson);
// Search for features containing "bakery" but ignore the "name" property
const result = gl.match('bakery', { excludeKeys: ['name'] }).getGeoJSON();

console.log(result);
```

In this example, even if the `name` property contains "bakery", it will not be considered in the search. Only other properties will be checked for the keyword.

## Filter by geometryType

You can filter features by their geometry type using the `geometryType` option in the `match` function.  
Only features whose geometry type matches the specified value will be included in the search.

### Example

```javascript
const gl = new GeoJsonlookfor(geojson);
// Search only features with geometry.type === 'Point' and containing 'bakery'
const result = gl.match('bakery', { geometryType: 'Point' }).getGeoJSON();

console.log(result);
```

Supported geometry types are:  
`'Point'`, `'MultiPoint'`, `'LineString'`, `'MultiLineString'`, `'Polygon'`, `'MultiPolygon'`
