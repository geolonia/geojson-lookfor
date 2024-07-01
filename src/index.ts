
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
        
        try {
            if (this.geojson === undefined || this.geojson === null || typeof this.geojson !== 'object' || typeof this.geojson === 'string') {
                throw new Error('Invalid GeoJSON');
            }

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
        } catch (err: any) {
            throw new Error(err.message)
        }
    }
    
}