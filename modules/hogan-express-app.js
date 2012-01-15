/**
 * Created by JetBrains WebStorm.
 * User: akinsella
 * Date: 13/01/12
 * Time: 23:13
 * To change this template use File | Settings | File Templates.
 */

var HoganExpressAdapter = (function() {
	var init = function(hogan) {
		var compile = function(source){
			return function(options) {
			  return hogan.compile(source).render(options);
			};
		}
		return {compile: compile};
	};
	return {init: init};
}());

if(typeof module!== 'undefined' && module.exports) {
	module.exports=HoganExpressAdapter;
}
else if (typeof exports!=='undefined') {
	exports.HoganExpressAdapter=HoganExpressAdapter;
}