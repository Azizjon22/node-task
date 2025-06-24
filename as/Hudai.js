"use strict";
const hundaiCar = {
    color: "Qora",
    price: "$47,000",
    year: 2024,
    mileage: "0 km",
    engine: "168 kW Electric",
    fuel: "Elektr",
};
process.stdin.on("data", (data) => {
    const query = data.toString().trim();
    if (query in hundaiCar) {
        console.log(`[hundai] ${query} → ${hundaiCar[query]}`);
    }
    else {
        console.log("Bunday ma'lumot yo'q.");
    }
});
