
export default class GeoJsonlookfor {

    geojson: any;
    
    constructor(geojson: any) {
        this.geojson = geojson;
    }

    // "keyword"を含む項目があるfeatureを検索する
    lookfor(keyword: string) {
        const features = this.geojson.features;
        const res = {
            "type": "FeatureCollection",
            "features": features.filter(
                (feature: any) => JSON.stringify(feature).includes(keyword)
            )
        };
        console.log(res);
        return res;
    }
    
}