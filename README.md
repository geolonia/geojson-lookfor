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
