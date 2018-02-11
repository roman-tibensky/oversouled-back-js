"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nano = require('../couch').nano;
const tilesCloud = 'N/A';
function getAllReleaseNotes() {
    return new Promise((res, rej) => {
        tilesCloud.get('_all_docs', { revs_info: false, include_docs: true, descending: true }, (err, body) => {
            if (err) {
                rej(err);
            }
            res(body);
        });
    });
}
exports.getAllReleaseNotes = getAllReleaseNotes;
//# sourceMappingURL=release-notes.js.map