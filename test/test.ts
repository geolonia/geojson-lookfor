import { assert } from 'chai';
import * as fs from 'fs';
import GeoJsonLookup from '../src/index';

// このファイルのディレクトリ名を取得する
const geojson = JSON.parse(fs.readFileSync(`${__dirname}/test.geojson`, 'utf8'));

describe('The first test', () => {
    it('is the first test.', () => {
      assert.deepEqual( true, true )
    });

    it('should be geojson.', () => {
        assert.deepEqual( 'スイーツショップ', geojson.features[0].properties.name );
    });

    // スイーツショップを検索する
    it('should be lookup sweetsshop.', () => {
        const gl = new GeoJsonLookup(geojson); 
        const res1 = gl.lookup('スイーツショップ');
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

        const res2 = gl.lookup('銭湯');
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [ ]
        }, res2 );

    });

    // "スイーツ"を含む名称、カテゴリを検索する
    it('should be lookup sweetsshop.', () => {
      const gl = new GeoJsonLookup(geojson); 
      const res1 = gl.lookup('スイーツ');
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

    // "さいたま市"を含む住所を検索する
    it('should be lookup sweetsshop.', () => {
      const gl = new GeoJsonLookup(geojson); 
      const res1 = gl.lookup('さいたま市');
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

      const res2 = gl.lookup('那覇市');
      assert.deepEqual( {
          "type": "FeatureCollection",
          "features": []
      }, res2 );
    });

});