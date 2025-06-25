const toyotaCamry: Record<string, string | number> = {
  color: "Oq metallik",
  price: "$35,000",
  year: 2024,
  mileage: "0 km",
  engine: "2.5L Hybrid",
  fuel: "Benzin + Elektr (Gibrid)"
};

process.on("message", (msg: string) => {
  if (msg === "all" || msg === "hammasi") {
    process.send?.("[tayotta.ts] > Mashina haqida to‘liq ma’lumot:\n" + JSON.stringify(toyotaCamry, null, 2));
  } else if (msg in toyotaCamry) {
    process.send?.(`[tayotta.ts] > ${msg} → ${toyotaCamry[msg]}`);
  } else {
    process.send?.("[tayotta.ts] > Bunday ma'lumot yo‘q.");
  }
});
