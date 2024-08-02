import { assert } from 'chai';
import * as fs from 'fs';
import { GeoJsonlookfor } from '../src/index';


// testデータのディレクトリ名を取得する
const geojson = JSON.parse(fs.readFileSync(`${__dirname}/test.geojson`, 'utf8'));


describe('Passing an object as a condition to search test.', () => {

    // nameにスイーツを含むデータを検索する
    it('should be lookfor features with the name property containing "スイーツショップ".', () => {
        const gl = new GeoJsonlookfor(geojson); 
        const res1 = gl.orMatch({ 'name': 'スイーツショップ' }).getGeoJSON();
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

        const res2 = gl.andMatch({ 'name': 'スイーツショップ' }).getGeoJSON();
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
        }, res2 );


        const res3 = gl.orMatch({ 'name': 'レトロ' }).getGeoJSON();
        assert.deepEqual( {
            "type": "FeatureCollection",
            "features": [ ]
        }, res3 );
  
    });

    it('should be lookfor features with the name property containing "パティスリー" or address property containing "さいたま市".', () => {
        const gl = new GeoJsonlookfor(geojson); 
  
        const res = gl.orMatch({ 'name': 'パティスリー', 'address': 'さいたま市' }).getGeoJSON();
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
        }, res );
  
    });


    it('should be lookfor features with the name property containing "パティスリー" and address property containing "弁財二丁目".', () => {
        const gl = new GeoJsonlookfor(geojson); 
  
        const res = gl.andMatch({ 'name': 'パティスリー', 'address': '弁財二丁目' }).getGeoJSON();
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
                }
            ]
        }, res );
  
    });


    it('should be lookfor features that do not contain "パティスリー" in the name property.', () => {
        const gl = new GeoJsonlookfor(geojson); 
  
        const res = gl.notMatch({ 'name': 'パティスリー' }).getGeoJSON();
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


    it('should be lookfor features that do not contain "パティスリー" in the name property and "入間郡" in the address property.', () => {
        const gl = new GeoJsonlookfor(geojson); 
  
        const res = gl.notMatch({ 'name': 'パティスリー', 'address': '入間郡' }).getGeoJSON();
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
        }, res );
  
    });
  
  });
  