
export class GeoJsonlookfor {

  geojson: any;
  
  constructor(geojson: any) {
    this.geojson = geojson;
  }

  /* *****************
   * "keyword"を含む項目があるfeatureを検索する 
   * *****************/
  match(keyword: string) {
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
   * "keywords"配列内の文字列で検索を行う 
   * *****************/
  orMatch(keywords: string[]) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          return keywords.some((keyword) => JSON.stringify(feature).includes(keyword));
        })
      };
      
      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  andMatch(keywords: string[]) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          return keywords.every((keyword) => JSON.stringify(feature).includes(keyword));
        })
      };
      
      return this;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /* *****************
   * "keyword"を含まないfeatureを検索する
   * *****************/
  notMatch(keyword: string | string[]) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features;

      this.geojson = {
        "type": "FeatureCollection",
        "features": features.filter((feature: any) => {
          const keywords = Array.isArray(keyword) ? keyword : [keyword];
          // return !JSON.stringify(feature).includes(keyword);
          return !keywords.some((keyword) => JSON.stringify(feature).includes(keyword));
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
  getGeoJSON() {
    return this.geojson
  }
    
}
