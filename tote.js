var fs = require('fs');
var readline = require('readline');
var dp = [];
var dpprev = [];
var products = [];
var filename = 'products.csv';
var startTime = +new Date;
readline.createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line) {
  var slices = line.split(',').map(Number);
  var id = slices[0];
  var price = slices[1];
  var length = slices[2];
  var width = slices[3];
  var height = slices[4];
  var weight = slices[5];
  if (length <= 45 && width <= 30 && height <= 35) {
    var volume = length*width*height;
    products.push({
      id,
      volume,
      price,
      weight,
    });
  }
}).on('close', function() {
  for (var j=0; j<products.length; j++) {
    var product = products[j];
    dpprev = dp.slice();
    for (var i=product.volume; i<=47250; i++) {
      dpprev[i-product.volume] = dpprev[i-product.volume] || {id: 0, price: 0, weight: 0};
      dpprev[i] = dpprev[i] || {id: 0, price: 0, weight: 0};
      if (dpprev[i-product.volume].price + product.price > dpprev[i].price ||
          (dpprev[i-product.volume].price + product.price == dpprev[i].price && dpprev[i-product.volume].weight + product.weight < dpprev[i].weight)
        ) {
        dp[i] = {
          id: dpprev[i-product.volume].id + product.id,
          price: dpprev[i-product.volume].price + product.price,
          weight: dpprev[i-product.volume].weight + product.weight,
        };
      }
    }
  }
  console.log((+new Date - startTime)/1000+' sec.');
  console.log(dp[47250].id);
});
