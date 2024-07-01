# geojson-lookfor
GeoJSON中にある地物(feature)を任意のキーワードで検索し、マッチした地物だけが含まれるGeoJsonを返すnpmモジュールです。

## 基本的な使い方
1. lookfor関数に文字列を渡す
    - 引数に指定した文字列に対応する`properties`を持つfeatureを返します。
```typescript
const gl = new GeoJsonlookfor(geojson); 
const res = gl.lookfor('さいたま市').getGeoJSON();

console.log(res);

// {
//     "type": "FeatureCollection",
//     "features": [
//     {
//         "type": "Feature",
//         "properties": {
//         "name": "電気店",
//         "address": "埼玉県さいたま市見沼区大字蓮沼",
//         "category": "家電"
//         },
//         "geometry": {
//         "coordinates": [
//             139.65389691240966,
//             35.933316420262145
//         ],
//         "type": "Point"
//         }
//     }
//     ]
// }
```
AND検索も可能です。
```typescript
const res = gl.lookfor('スイーツ').lookfor('上尾市').getGeoJSON();
```
