const tayottaCar = {
  color: "Oq",
  price: "$35,000",
  year: 2024,
  mileage: "0 km",
  engine: "2.5L Hybrid",
  fuel: "Gibrid",
};

process.on("message", (msg: string) => {
  if (msg in tayottaCar) {
    process.send?.(`[tayotta] ${msg} → ${tayottaCar[msg as keyof typeof tayottaCar]}`);
  } else {
    process.send?.("Bunday ma'lumot yo'q.");
  }
});
