uwatch.service('Config', function(){
	var IP_ADDRESS = "172.20.10.3";
	this.address = function(){
		return IP_ADDRESS;
	}
});