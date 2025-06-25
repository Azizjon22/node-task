const hyundaiIoniq6: Record<string, string | number> = {
  color: "Mat qora",
  price: "$47,000",
  year: 2024,
  mileage: "0 km",
  engine: "168 kW Electric Motor",
  fuel: "Elektr"
};

process.stdin.on("data", (data: Buffer) => {
  const query = data.toString().trim().toLowerCase();

  if (query === "all" || query === "hammasi") {
    console.log("[hundai.ts] > Mashina haqida to‘liq ma’lumot:");
    console.log(JSON.stringify(hyundaiIoniq6, null, 2));
  } else if (query in hyundaiIoniq6) {
    console.log(`[hundai.ts] > ${query} → ${hyundaiIoniq6[query]}`);
  } else {
    console.log("[hundai.ts] > Bunday ma'lumot yo‘q.");
  }
});
