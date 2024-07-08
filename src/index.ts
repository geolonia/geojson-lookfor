
export class GeoJsonlookfor {

  geojson: any;
  
  constructor(geojson: any) {
    this.geojson = geojson;
  }

  // "keyword"を含む項目があるfeatureを検索する
  lookfor(keyword: string) {
    try {
      if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
        throw new Error('Invalid GeoJSON');
      }
      const features = this.geojson.features

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

  // geojsonを返す
  getGeoJSON() {
    return this.geojson
  }
    
}
