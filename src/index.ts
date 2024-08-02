
export class GeoJsonlookfor {

  geojson: any;
  
  constructor(geojson: any) {
    this.geojson = geojson;
  }

  /* *****************
   * "keyword"を含む項目があるfeatureを検索する 
   * *****************/
  match(keyword: string, geometryType?: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon') {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          return JSON.stringify(feature).includes(keyword);
        })
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
            return (keywords as string[]).some((keyword) => JSON.stringify(feature).includes(keyword));
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
            return (keywords as string[]).every((keyword) => JSON.stringify(feature).includes(keyword));
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
            return !keywordArr.some((keyword) => JSON.stringify(feature).includes(keyword));
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
