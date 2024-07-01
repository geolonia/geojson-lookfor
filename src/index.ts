
export default class GeoJsonlookfor {

    geojson: any;
    keywordArr: string[];
    
    
    constructor(geojson: any) {
        this.geojson = geojson;
        this.keywordArr = [];
    }

    // "keyword"を含む項目があるfeatureを検索する
    lookfor(keyword: string) {
        this.keywordArr.push(keyword);
        return this;
    }

    getGeoJSON() {
        const features = this.geojson.features

        const res = {
            "type": "FeatureCollection",
            "features": features.filter((feature: any) => {
                return this.keywordArr.every((keyword: string) => {
                    return JSON.stringify(feature).includes(keyword);
                });
            })
        };
        return res;
    }
    
}