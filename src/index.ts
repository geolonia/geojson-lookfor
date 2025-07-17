
export class GeoJsonlookfor {

  geojson: any;
  
  constructor(geojson: any) {
    this.geojson = geojson;
  }

  /* *****************
   * "keyword"を含む項目があるfeatureを検索する 
   * *****************/
  match(
    keyword: string, 
    options?: {
      geometryType?: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon',
      excludeKeys?: string[],
      center?: [number, number], // [lng, lat]
    }
  ) {
    try {
      if (
        this.geojson === undefined ||
        this.geojson === null ||
        typeof this.geojson !== 'object' ||
        typeof this.geojson === 'string'
      ) {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;
      const { geometryType, excludeKeys, center } = options || {};

      // フィルタ処理
      let filtered = features.filter((feature: any) => {
        if (geometryType && feature.geometry?.type !== geometryType) {
          return false;
        }
        const props = { ...feature.properties };
        if (excludeKeys && Array.isArray(excludeKeys)) {
          excludeKeys.forEach((key) => {
            delete props[key];
          });
        }
        if (keyword === '') {
          return true;
        }
        return JSON.stringify(props).includes(keyword);
      });

      // centerが指定されていれば距離でソート
      if (center && Array.isArray(center) && center.length === 2) {
        filtered = filtered
          .map((feature: any) => {
            let coord = feature.geometry?.coordinates;
            // Point以外は最初の座標を利用
            if (Array.isArray(coord[0])) {
              coord = coord[0];
            }
            const dist = Math.sqrt(
              Math.pow(center[0] - coord[0], 2) + Math.pow(center[1] - coord[1], 2)
            );
            return { feature, dist };
          })
          .sort((a: { dist: number; }, b: { dist: number; }) => a.dist - b.dist)
          .map((item: { feature: any; }) => item.feature);
      }

      this.geojson = {
        type: 'FeatureCollection',
        features: filtered,
      };

      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /* *****************
   * "keywords"配列内の文字列でOR検索を行う
   * *****************/
  orMatch(keywords: string[] | { [key: string]: any }) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          if(Array.isArray(keywords)){
            return (keywords as string[]).some((keyword) => JSON.stringify(feature.properties).includes(keyword));
          } else {
            return Object.keys(keywords).some((key) => {
              return key in feature.properties && feature.properties[key].includes((keywords as any)[key])
            });
          }
        })
      };
      
      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /* *****************
   * "keywords"配列内の文字列でAND検索を行う 
   * *****************/
  andMatch(keywords: string[] | { [key: string]: any }) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          if(Array.isArray(keywords)){
            return (keywords as string[]).every((keyword) => JSON.stringify(feature.properties).includes(keyword));
          } else {
            return Object.keys(keywords).every((key) => {
              return key in feature.properties && feature.properties[key].includes((keywords as any)[key])
            });
          }
        })
      };
      
      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /* *****************
   * "keyword"を含まないfeatureをNOT検索する
   * *****************/
  notMatch(keywords: string | string[] | { [key: string]: any }) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          if(Array.isArray(keywords) || typeof keywords === 'string'){
            const keywordArr = Array.isArray(keywords) ? keywords : [keywords];
            return !keywordArr.some((keyword) => JSON.stringify(feature.properties).includes(keyword));
          } else {
            return !Object.keys(keywords).some((key) => {
              return key in feature.properties && feature.properties[key].includes((keywords as any)[key])
            });
          }
        })
      };
      
      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }



  /* *****************
   * geojsonを返す 
   * *****************/
  getGeoJSON(number?: number) {
    if (number !== undefined) {
      this.geojson.features = this.geojson.features.slice(0, number);
    }
    return this.geojson
  }
  

  /* *******************
   * featureの件数を取得する
   * *******************/ 
  getFeatureCount() {
    return this.geojson.features.length;
  }
    
}
