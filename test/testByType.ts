import { assert } from 'chai';
import * as fs from 'fs';
import { GeoJsonlookfor } from '../src/index';


// testデータのディレクトリ名を取得する
const geojson = JSON.parse(fs.readFileSync(`${__dirname}/test.geojson`, 'utf8'));


/* *****************
 * AND検索テスト
 * *****************/
describe('AND search test', () => {

  // AND検索をする（スイーツショップかつ、上尾市）
  it('should be lookfor features include "スイーツ" and "上尾市".', () => {
    const lookfor = new GeoJsonlookfor(geojson); 
    const res1 = lookfor.lookfor('スイーツ').lookfor('上尾市').getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": [
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

    const res2 = lookfor.lookfor('スイーツ').lookfor('那覇市').getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res2 );

  });

  // AND検索をする（スイーツかつ、桶川市）
  it('should be lookfor features include "スイーツ" and "桶川市".', () => {
    const lookfor = new GeoJsonlookfor(geojson); 
    const res1 = lookfor.andMatch(['スイーツ', '桶川市']).getGeoJSON();
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

    const res2 = lookfor.andMatch(['高層ビル', '桶川市']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res2 );

    const res3 = lookfor.andMatch(['ホテル', '沖縄市']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res3 );
  });

})

/* *****************
 * OR検索テスト
 * *****************/
describe('OR search test', () => {
  // OR検索をする（書店または、カフェ）
  it('should be lookfor features include "書店" or "カフェ".', () => {
    const lookfor = new GeoJsonlookfor(geojson); 
    const res1 = lookfor.orMatch(['書店', 'カフェ']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "樋口書店",
              "address": "埼玉県入間郡越生町大字西和田",
              "category": "書店"
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
              "name": "オーガニックカフェ GEO",
              "address": "埼玉県入間郡越生町大谷",
              "category": "カフェ"
            },
            "geometry": {
              "coordinates": [
                139.30085900992,
                35.975010429248
              ],
              "type": "Point"
            }
          }
        ]
    }, res1 );

    const res2 = lookfor.orMatch(['高層ビル', 'カフェ']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "オーガニックカフェ GEO",
              "address": "埼玉県入間郡越生町大谷",
              "category": "カフェ"
            },
            "geometry": {
              "coordinates": [
                139.30085900992,
                35.975010429248
              ],
              "type": "Point"
            }
          }
        ]
    }, res2 );

    const res3 = lookfor.orMatch(['ホテル', 'ビーチ']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res3 );
  });

})



/* *****************
 * NOT検索テスト
 * *****************/
describe('NOT search test', () => {
  // NOT検索をする（スイーツではない）
  it('should be look for features other than "スイーツ".', () => {
    const lookfor = new GeoJsonlookfor(geojson); 
    const res = lookfor.notMatch('スイーツ').getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "樋口書店",
              "address": "埼玉県入間郡越生町大字西和田",
              "category": "書店"
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
          },
          {
            "type": "Feature",
            "properties": {
              "name": "オーガニックカフェ GEO",
              "address": "埼玉県入間郡越生町大谷",
              "category": "カフェ"
            },
            "geometry": {
              "coordinates": [
                139.30085900992,
                35.975010429248
              ],
              "type": "Point"
            }
          }
        ]
    }, res );
  });

  // NOT検索をする（スイーツまたは書店ではない）
  it('should be look for features other than "スイーツ" or "書店".', () => {
    const lookfor = new GeoJsonlookfor(geojson); 
    const res = lookfor.notMatch(['スイーツ', '書店']).getGeoJSON();
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
          },
          {
            "type": "Feature",
            "properties": {
              "name": "オーガニックカフェ GEO",
              "address": "埼玉県入間郡越生町大谷",
              "category": "カフェ"
            },
            "geometry": {
              "coordinates": [
                139.30085900992,
                35.975010429248
              ],
              "type": "Point"
            }
          }
        ]
    }, res );
  });
});