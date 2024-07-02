
export default class GeoJsonlookfor {

    geojson: any;
    
    constructor(geojson: any) {
        this.geojson = geojson;
    }

    // "keyword"を含む項目があるfeatureを検索する
    lookfor(keyword: string) {
        const features = this.geojson.features

        this.geojson = {
            "type": "FeatureCollection",
            "features": features.filter((feature: any) => {
                return this.keywordArr.every((keyword: string) => {
                    return JSON.stringify(feature).includes(keyword);
                });
            })
        };
        
        return this;
    }

    getGeoJSON() {
        return this.geojson
    }
    
}
