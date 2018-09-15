(function() {
	//include jquery
	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);


	var comment = "";

	//add listener for keypress
	$(document).keypress(function(e) {
	  key = String.fromCharCode(e.which);
	  comment += key;
	  console.log(key, comment);

	  if (comment.includes(".")){
	  	//var selector = ":contains("+ comment +")";
	  	//activeElement = $(selector);
	  	//console.log("element: ", activeElement.html());
	  	var activeElement = $(":focus");
		console.log(activeElement.html());
	  }
	  

	});
	


	/*
	setInterval(function() {
	var activeElement = $(":focus");
	console.log(activeElement.html());
	
	var inputElement = "";
	activeElement.find($("span").each(function(index ){
                   console.log( index + ": " + $( this ).text() );
                }));

  	//console.log(inputElement.innerHTML);
	}, 5000);
	*/
	

})();