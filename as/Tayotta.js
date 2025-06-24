"use strict";
const tayottaCar = {
    color: "Oq",
    price: "$35,000",
    year: 2024,
    mileage: "0 km",
    engine: "2.5L Hybrid",
    fuel: "Gibrid",
};
process.on("message", (msg) => {
    var _a, _b;
    if (msg in tayottaCar) {
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, `[tayotta] ${msg} → ${tayottaCar[msg]}`);
    }
    else {
        (_b = process.send) === null || _b === void 0 ? void 0 : _b.call(process, "Bunday ma'lumot yo'q.");
    }
});
