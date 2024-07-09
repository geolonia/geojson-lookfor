import { assert } from 'chai';
import * as fs from 'fs';
import { GeoJsonlookfor } from '../src/index';


// testデータのディレクトリ名を取得する
const geojson = JSON.parse(fs.readFileSync(`${__dirname}/test.geojson`, 'utf8'));

/* *******************
 * 取得するデータ別のテスト
 * *******************/
describe('Test by return value', () => {

    // 件数を取得する
    it('Get the number of cases', () => {
        const gl = new GeoJsonlookfor(geojson); 
        const res = gl.lookfor('スイーツ').getFeatureCount();
        assert.deepEqual(4, res);
    });

    // 指定した件数分featureを取得する
    it('Get the number of cases', () => {
        const gl = new GeoJsonlookfor(geojson); 
        const res = gl.lookfor('スイーツ').getGeoJSON(2);
        assert.deepEqual({
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
                },{
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
                }
            ]
        }, res);
    });
});