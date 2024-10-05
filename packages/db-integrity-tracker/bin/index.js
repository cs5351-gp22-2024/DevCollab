#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const os_1 = require("os");
const yargs_1 = __importDefault(require("yargs/yargs"));
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    sqlfolder: {
        type: "string",
        demandOption: "The path for the sql folder is required",
    },
    trackfile: {
        type: "string",
        demandOption: "The path for the sql track file is required",
    },
})
    .parseSync();
if (!fs_1.default.existsSync(argv.sqlfolder)) {
    console.error(`Make sure the sql folder exist`);
    process.exit(1);
}
if (!fs_1.default.existsSync(argv.trackfile)) {
    fs_1.default.writeFileSync(argv.trackfile, "", { encoding: "utf-8" });
}
const sqls = fs_1.default.readdirSync(argv.sqlfolder);
const tracked = fs_1.default.readFileSync(argv.trackfile, "utf-8").split(os_1.EOL);
const diff = (0, lodash_1.difference)(sqls, tracked);
if (diff.length === 0) {
    process.exit();
}
else {
    console.error(`Make sure you have run the following sqls in your local database:${os_1.EOL}${(0, lodash_1.join)((0, lodash_1.map)(diff, () => "- " + diff), os_1.EOL)}`);
    process.exit(1);
}
