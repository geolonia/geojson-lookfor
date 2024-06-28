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
                  "address": "△△"
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

});