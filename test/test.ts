import { assert } from 'chai';
import * as fs from 'fs';
import { GeoJsonlookfor } from '../src/index';


// testデータのディレクトリ名を取得する
const geojson = JSON.parse(fs.readFileSync(`${__dirname}/test.geojson`, 'utf8'));
const csv = fs.readFileSync(`${__dirname}/test.csv`, 'utf8');
const json = JSON.parse(fs.readFileSync(`${__dirname}/test.json`, 'utf8'));
const pmtile = 'https://cyberjapandata.gsi.go.jp/xyz/optimal_bvmap-v1/optimal_bvmap-v1.pmtiles'

describe('The first test', () => {
    it('is the first test.', () => {
      assert.deepEqual( true, true )
    });

    it('should be geojson.', () => {
        assert.deepEqual( 'スイーツショップ', geojson.features[0].properties.name );
    });

    // スイーツショップを検索する
    it('should be lookfor sweetsshop.', () => {
        const gl = new GeoJsonlookfor(geojson); 
        const res1 = gl.match('スイーツショップ').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "name": "スイーツショップ",
                  "address": "埼玉県桶川市川田谷",
                  "category": "スイーツ"
                },
                "geometry": {
                  "coordinates": [
                    139.517720985072,
                    35.99865685174926
                  ],
                  "type": "Point"
                }
              }
            ]
        }, res1 );

        const res2 = gl.match('銭湯').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [ ]
        }, res2 );

    });

    // "スイーツ"を含む項目があるfeatureを検索する
    it('should be lookfor features that include "sweets".', () => {
      const gl = new GeoJsonlookfor(geojson); 
      const res1 = gl.match('スイーツ').getGeoJSON();
      assert.deepEqual( {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "name": "スイーツショップ",
                "address": "埼玉県桶川市川田谷",
                "category": "スイーツ"
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
                "name": "菓子店",
                "address": "埼玉県川越市中老袋",
                "category": "スイーツ"
              },
              "geometry": {
                "coordinates": [
                  139.5371783066526,
                  35.941979468748585
                ],
                "type": "Point"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "name": "パティスリーGeolonia",
                "address": "埼玉県上尾市弁財二丁目",
                "category": "スイーツ"
              },
              "geometry": {
                "coordinates": [
                  139.57772266590507,
                  35.97221769999193
                ],
                "type": "Point"
              }
            },
            {
              "type": "Feature",
              "properties": {
                "name": "パティスリーぷりこ",
                "address": "埼玉県上尾市中分三丁目",
                "category": "スイーツ"
              },
              "geometry": {
                "coordinates": [
                  139.54952061301026,
                  35.978737345548765
                ],
                "type": "Point"
              }
            }
          ]
      }, res1 );
    });

    // "さいたま市"を含むfeatureを検索する
    it('should be lookfor features include "さいたま市".', () => {
      const gl = new GeoJsonlookfor(geojson); 
      const res1 = gl.match('さいたま市').getGeoJSON();
      assert.deepEqual( {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "name": "電気店",
                "address": "埼玉県さいたま市見沼区大字蓮沼",
                "category": "家電"
              },
              "geometry": {
                "coordinates": [
                  139.65389691240966,
                  35.933316420262145
                ],
                "type": "Point"
              }
            }
          ]
      }, res1 );

      const res2 = gl.match('那覇市').getGeoJSON();
      assert.deepEqual( {
          "type": "FeatureCollection",
          "features": []
      }, res2 );
    });

    // stringを引数として渡す
    it('string as argument', () => {
      try {
        const gl = new GeoJsonlookfor(pmtile); 
        const res1 = gl.match('家電').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "name": "電気店",
                  "address": "埼玉県さいたま市見沼区大字蓮沼",
                  "category": "家電"
                },
                "geometry": {
                  "coordinates": [
                    139.65389691240966,
                    35.933316420262145
                  ],
                  "type": "Point"
                }
              }
            ]
        }, res1 );
      }catch(err){
        console.error(err);
      }

    });

    // jsonを引数として渡す
    it('json as argument', () => {
      try {
        const gl = new GeoJsonlookfor(json); 
        const res1 = gl.match('家電').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "name": "電気店",
                  "address": "埼玉県さいたま市見沼区大字蓮沼",
                  "category": "家電"
                },
                "geometry": {
                  "coordinates": [
                    139.65389691240966,
                    35.933316420262145
                  ],
                  "type": "Point"
                }
              }
            ]
        }, res1 );
      }catch(err){
        console.error(err);
      }

    });

    // csvを引数として渡す
    it('csv as argument', () => {
      try {
        const gl = new GeoJsonlookfor(csv); 
        const res1 = gl.match('家電').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "name": "電気店",
                  "address": "埼玉県さいたま市見沼区大字蓮沼",
                  "category": "家電"
                },
                "geometry": {
                  "coordinates": [
                    139.65389691240966,
                    35.933316420262145
                  ],
                  "type": "Point"
                }
              }
            ]
        }, res1 );
      }catch(err){
        console.error(err);
      }

    });
});
