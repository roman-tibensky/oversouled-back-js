"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const nano = require('../couch').nano;
const mapCloud = 'N/A';
function getNpcs(lvl, mapData, tileData) {
    const tilesIndex = tileData.rows.map(oneTile => oneTile.id);
    const nameArr = [];
    const countArr = [];
    return new Promise((res, rej) => {
        mapCloud.view('views', 'npc-by-level-' + lvl, { revs_info: false, include_docs: true }, (err, body) => {
            if (err) {
                rej(err);
            }
            const finalAmmount = Math.floor(Math.random()
                * (mapData.creaturePointMax - mapData.creaturePointMin)) + mapData.creaturePointMin;
            let currPoints = 0;
            let creatureArr = [];
            while (currPoints < finalAmmount) {
                const pickCreature = Math.floor(Math.random() * body.rows.length);
                let oneCreature = _.cloneDeep(body.rows[pickCreature]);
                let creaturePos = nameArr.indexOf(oneCreature.doc.name);
                oneCreature = placeNpc(creatureArr, oneCreature, mapData, tilesIndex, tileData);
                if (creaturePos < 0) {
                    nameArr.push(oneCreature.doc.name);
                    countArr.push(0);
                }
                else {
                    countArr[creaturePos]++;
                    oneCreature.doc.name = oneCreature.doc.name + countArr[creaturePos];
                }
                currPoints += body.rows[pickCreature].doc.mapCount;
                creatureArr.push(_.cloneDeep(oneCreature));
            }
            const applySpecial = Math.random();
            console.log(applySpecial);
            if (applySpecial <= 0.1) {
                mapCloud.view('views', 'special-npc-by-level-' + lvl, {
                    revs_info: false,
                    include_docs: true
                }, (err, body) => {
                    const pickCreature = Math.floor(Math.random() * body.rows.length);
                    let oneCreature = _.cloneDeep(body.rows[pickCreature]);
                    let creaturePos = nameArr.indexOf(oneCreature.doc.name);
                    oneCreature = placeNpc(creatureArr, oneCreature, mapData, tilesIndex, tileData);
                    if (creaturePos < 0) {
                        nameArr.push(oneCreature.doc.name);
                        countArr.push(0);
                    }
                    else {
                        countArr[creaturePos]++;
                        oneCreature.doc.name = oneCreature.doc.name + countArr[creaturePos];
                    }
                    creatureArr.push(_.cloneDeep(oneCreature));
                    res(creatureArr);
                });
            }
            else {
                res(creatureArr);
            }
        });
    });
}
exports.getNpcs = getNpcs;
function placeNpc(creatureArr, alteredCreature, mapData, tilesIndex, tileData) {
    let newX;
    let newY;
    while (!newX) {
        const y = Math.floor(Math.random() * (mapData.tiles.length));
        const x = Math.floor(Math.random() * (mapData.tiles[y].length));
        if (tileData.rows[tilesIndex.indexOf(mapData.tiles[y][x])].doc.canBodyEnter) {
            let isUsed = false;
            for (const oneCreature of creatureArr) {
                if (oneCreature.x === x && oneCreature.y === y) {
                    isUsed = true;
                }
            }
            if (!isUsed) {
                alteredCreature.x = x;
                alteredCreature.y = y;
                alteredCreature._id = alteredCreature.id + '-' + y + '-' + x;
                newX = x;
            }
        }
    }
    alteredCreature.doc.baseLevel = Math.floor((alteredCreature.doc.baseStr +
        alteredCreature.doc.baseAgi +
        alteredCreature.doc.baseDex +
        alteredCreature.doc.baseMgc +
        alteredCreature.doc.baseDef +
        alteredCreature.doc.baseRes) / 5);
    return alteredCreature;
}
//# sourceMappingURL=npcs.js.map