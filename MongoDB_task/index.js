const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test')
.then(() =>{
    console.log("MongoDB ga mufaqatli ulandi");
})
.catch((err) => {
    console.log("serverda xatolik", err);
})


const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})

const inventorySchema = new mongoose.Schema({
    item:String,
    qty: Number,
    size: SizeSchema,
    status: String
},{collection: "inventory" })

const Inventory = mongoose.model('Inventory', inventorySchema);

async function getInventoryItems1() {
    return await Inventory
    .find({status: "A"})
    .sort({item: 1})
    .select({item: 1 , qty:1 , _id: 0})
}

async function getInventoryItems2() {
    return await Inventory
    .find()
    .or([{ qty: { $lte: 50 } }, { item: /.*l.*/i }])
    .sort({qty: -1})
}

async function run () {
    const result1 = await getInventoryItems1();
    console.log("Status A bolganlar:");
    console.log(result1);
}


run()