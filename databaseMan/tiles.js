"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nano = require('../couch').nano;
const tilesCloud = 'N/A';
function getUsedTiles(uniqueTiles) {
    return new Promise((res, rej) => {
        tilesCloud.fetch({ keys: uniqueTiles }, { revs_info: false }, (err, body) => {
            if (err) {
                rej(err);
            }
            res(body);
        });
    });
}
exports.getUsedTiles = getUsedTiles;
//# sourceMappingURL=tiles.js.map