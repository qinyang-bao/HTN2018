(function() {

	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);
	

	p = $("title").html();
	console.log(p);

	$.ajax({
		type: "GET",
		url: "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=Team,%20I%20know%20that%20times%20are%20tough!%20Product%20sales%20have%20been%20disappointing%20for%20the%20past%20three%20quarters.%20We%20have%20a%20competitive%20product,%20but%20we%20need%20to%20do%20a%20better%20job%20of%20selling%20it!",
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
})();