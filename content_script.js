(function() {

	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);
	

	//p = $("title").html();
	//console.log(p);
	setInterval(function() {
  	var activeElement = document.activeElement;
  	console.log(activeElement.tagName);
	}, 5000);
	



})();