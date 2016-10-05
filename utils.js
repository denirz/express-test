module.exports = {
alert: function(m) {
console.log("alert -> \n\t");
console.log(m);
console.log('--------');
	},


getKeys	
}

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
};

// alert -  for log instead of alert 
var alert = function(m){
console.log("alert -> \n\t");
console.log(m);
console.log('--------');
};

