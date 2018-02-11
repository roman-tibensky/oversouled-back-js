"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nano = require('../couch').nano;
const mapCloud = 'N/A';
function getFirstMap() {
    return new Promise((res, rej) => {
        mapCloud.get('default_map', { revs_info: false }, (err, body) => {
            if (err) {
                rej(err);
            }
            res(body);
        });
    });
}
exports.getFirstMap = getFirstMap;
//# sourceMappingURL=map.js.map