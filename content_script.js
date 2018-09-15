(function() {
	//include jquery
	var script = document.createElement('script');
	script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(script);


	var comment = "";

	function valid_key(keycode) {
		let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)
        if (valid){
        	return true;
        }
        return false;
    }

    function call_api(comment, test=true){
    	if (!test){
			let apitext = comment.split(" ").join("%20");
				  	$.ajax({
						type: "GET",
						url: "https://167.99.190.191/call_watson_api?comment=" + apitext,
						success: function(data) {
							//called when successful
							console.log("data: ", data);

							// anger level: (0) <0.5 (1) 0.5 - 0.7 (2) 0.7 - 0.9 (3) >0.9
							let documentToneAnger = "";

							//return array if has anger
							let docToneData = data.document_tone.tones.filter(tone => tone.tone_id === "anger");
							console.log("docToneData", docToneData);
							if (docToneData.length !=0 ){
								if (docToneData[0].score >= 0.5 && docToneData[0].score < 0.7) {
									documentToneAnger = 1;
								} else if (docToneData[0].score >= 0.7 && docToneData[0].score < 0.9) {
									documentToneAnger = 2;
								} else if (docToneData[0].score >= 0.9) {
									documentToneAnger = 3;
								} else {
									documentToneAnger = 0;
								}
								console.log("docAnger: ", documentToneAnger);

								update_ele(fb_get_active_ele, documentToneAnger);
							}
					
						},
						error: function(e) {
						  //called when there is an error
						  console.log(e);
						}
					});
		}

		else{
			update_ele(fb_get_active_ele, 3);
		}
    }

    function update_ele(get_active_ele, data){
    	ele = get_active_ele();
    	if (typeof(ele) != "undefined"){
    		ele.style.color = "red";
    		ele.setAttribute("id", "_the_one_and_the_only_one_selected");
    	}
    }

    function chrome_get_active_ele(){
    	return document.activeElement;
    }

    function fb_get_active_ele(){
    	//var selector = ":contains("+ comment +")";
	  	//activeElement = $(selector);
	  	//console.log("element: ", activeElement.html());
	  	var ae = document.activeElement;
	  	var children = ae.getElementsByTagName("*");
	  	for (var i=0; i<children.length; i++){
	  		if (children[i].getAttribute("data-text")){
	  			return children[i];
	  		}
	  		
	  	}
		//console.log(activeElement.html());
    }

	//add listener for keypress
	$(document).keydown(function(e) {
	  console.log("raw", e.keyCode, e.key);
	  if (valid_key(e.keyCode)){
	  	var key = e.key;
	  	comment += key;
	  	console.log(key, comment);

	  	if (key == "."){
	  		call_api(comment);
	  		comment = "";
	    }

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