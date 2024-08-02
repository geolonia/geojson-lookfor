

// const filterParticularProperty = (geojson: any, conditionProperty: {[key: string]: string}) => {
//     try {
//         if (geojson === undefined || geojson === null || typeof geojson !== 'object' || typeof geojson === 'string') {
//         throw new Error('Invalid GeoJSON');
//         }
//         const features = geojson.features;
//         const keys = Object.keys(conditionProperty);
    
//         geojson = {
//         "type": "FeatureCollection",
//         "features": features.filter((feature: any) => {
//             return feature.properties[].includes(JSON.stringify(conditionProperty));
//         })
//         };
        
//         return geojson;
//     } catch (err: any) {
//         throw new Error(err);
//     }
// };