
module.exports.absolute = function (number) {
   return (number >= 0) ? number : -number
 }



// Matinlarni test qlish
 module.exports.salam = function (name) {
   return 'Asalomu alekum, ' + name 
 }


// Qatorlarni test qlish 
module.exports.getCurrencies = function () {
   return ['UZS', 'MYR', 'TRY']
}

module.exports.getProduct = function (productId) {
   return {id: productId, title: 'banana', price: 2}
}


module.exports.registeruser = function (userName) {
   if(!userName) throw new Error('Username is required');

   return { id: 111, userName: userName}
}