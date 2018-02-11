"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nano = require('../couch').nano;
const playerCloud = 'N/A';
function getFirstPlayer() {
    return new Promise((res, rej) => {
        playerCloud.get('UNIVERSAL_MIGRATOR', { revs_info: false }, (err, body) => {
            if (err) {
                rej(err);
            }
            res({ doc: body });
        });
    });
}
exports.getFirstPlayer = getFirstPlayer;
//# sourceMappingURL=player.js.map