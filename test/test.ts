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
        const res1 = gl.lookfor('スイーツショップ').getGeoJSON();
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

        const res2 = gl.lookfor('銭湯').getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [ ]
        }, res2 );

    });

    // "スイーツ"を含む項目があるfeatureを検索する
    it('should be lookfor features that include "sweets".', () => {
      const gl = new GeoJsonlookfor(geojson); 
      const res1 = gl.lookfor('スイーツ').getGeoJSON();
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
      const res1 = gl.lookfor('さいたま市').getGeoJSON();
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

      const res2 = gl.lookfor('那覇市').getGeoJSON();
      assert.deepEqual( {
          "type": "FeatureCollection",
          "features": []
      }, res2 );
    });

    // stringを引数として渡す
    it('string as argument', () => {
      try {
        const gl = new GeoJsonlookfor(pmtile); 
        const res1 = gl.lookfor('家電').getGeoJSON();
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
        const res1 = gl.lookfor('家電').getGeoJSON();
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
        const res1 = gl.lookfor('家電').getGeoJSON();
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



/* *****************
 * 検索タイプ別テスト
 * *****************/
describe('Test by search type', () => {

  // AND検索をする（スイーツショップかつ、上尾市）
  it('should be lookfor features include "スイーツ" and "上尾市".', () => {
    const gl = new GeoJsonlookfor(geojson); 
    const res1 = gl.lookfor('スイーツ').lookfor('上尾市').getGeoJSON();
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

    const res2 = gl.lookfor('スイーツ').lookfor('那覇市').getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res2 );

  });

  // OR検索をする（書店または、カフェ）
  it('should be lookfor features include "書店" or "カフェ".', () => {
    const gl = new GeoJsonlookfor(geojson); 
    const res1 = gl.orMatch(['書店', 'カフェ']).getGeoJSON();
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

    const res2 = gl.orMatch(['高層ビル', 'カフェ']).getGeoJSON();
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

    const res3 = gl.orMatch(['ホテル', 'ビーチ']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res3 );
  });

  // AND検索をする（スイーツかつ、桶川市）
  it('should be lookfor features include "スイーツ" and "桶川市".', () => {
    const gl = new GeoJsonlookfor(geojson); 
    const res1 = gl.andMatch(['スイーツ', '桶川市']).getGeoJSON();
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

    const res2 = gl.andMatch(['高層ビル', '桶川市']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res2 );

    const res3 = gl.andMatch(['ホテル', '沖縄市']).getGeoJSON();
    assert.deepEqual( {
        "type": "FeatureCollection",
        "features": []
    }, res3 );
  });

  // NOT検索をする（スイーツではない）
  it('should be look for features other than "スイーツ".', () => {
    const gl = new GeoJsonlookfor(geojson); 
    const res1 = gl.notMatch('スイーツ').getGeoJSON();
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
    }, res1 );

    const res2 = gl.notMatch('').getGeoJSON();
    assert.deepEqual({
      "type": "FeatureCollection",
      "features": []
    }, res2 );
  });

});
