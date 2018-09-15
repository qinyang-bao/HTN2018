(function() {
	//include jquery
	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);


	let comment = "";

	//add listener for keypress
	$(document).keypress(function(e) {
	  key = String.fromCharCode(e.which);
	  comment += key;
	  console.log(key, comment);

	  if (key === "."){
	  	//var selector = ":contains("+ comment +")";
	  	//activeElement = $(selector);
		  //console.log("element: ", activeElement.html());
		let apitext = comment.split(" ").join("%20")
	  	$.ajax({
			type: "GET",
			url: "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=" + apitext,
			dataType : 'json',
			headers: {
				"Authorization": "Basic " + btoa("3c86c40d-60e5-43d9-9215-2ceea54b6fad" + ":" + "tXbZalBwWS8e")
			},
			success: function(data) {
			  //called when successful
	
			  console.log(data);
	
			},
			error: function(e) {
			  //called when there is an error
			  console.log(e);
			}
		});
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
	

	p = $("title").html();
	console.log(p);
})();