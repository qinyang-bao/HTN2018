(function() {
	//include jquery
	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);

	// anger level: (0) <0.5 (1) 0.5 - 0.7 (2) 0.7 - 0.9 (3) >0.9
	let comment = "";
	let sentenceTone = [];

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
			let documentToneAnger = "";

			//return array if has anger
			let docToneData = data.document_tone.tones.filter(tone => tone.tone_id === "anger");
			console.log(docToneData);
			if (docToneData[0].score >= 0.5 && docToneData[0].score < 0.7) {
				documentToneAnger = 1;
			} else if (docToneData[0].score >= 0.7 && docToneData[0].score < 0.9) {
				documentToneAnger = 2;
			} else if (docToneData[0].score >= 0.9) {
				documentToneAnger = 3;
			} else {
				documentToneAnger = 0;
			}
			
			//let sentenceToneData = data.document_tone.tones.filter(tone => tone.tone_id === "anger");

			console.log("data: ", data);
			console.log("docAnger: ", documentToneAnger);
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