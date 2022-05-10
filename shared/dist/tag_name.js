"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagNameSchema = exports.extractTagName = void 0;
/**
 * Remove folder part of tag name, leaving the tag name.
 *
 * If the tag name does not include a folder part, return the tag name as is.
 */
var extractTagName = function (tagName) {
    return tagName.substring(tagName.indexOf(":") + 1);
};
exports.extractTagName = extractTagName;
exports.tagNameSchema = {
    $id: "TagName",
    enum: [
        "fit_for:adults",
        "fit_for:children",
        "fit_for:elderly",
        "fit_for:families",
        "fit_for:infants",
        "location:center",
        "location:suburban",
        "location:rural",
        "price:free",
        "price:paid",
        "culture",
        "indoor",
        "museum",
        "music",
        "nature",
        "outdoor",
        "restaurant",
        "sports",
    ],
};
