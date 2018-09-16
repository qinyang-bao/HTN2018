(function() {
	//include jquery and bootstrap
	
	/*
	var bootstrap_css = document.createElement('link');
	bootstrap_css.setAttribute("rel", "stylesheet");
	bootstrap_css.setAttribute("type", "text/css");
	bootstrap_css.setAttribute("href", "bootstrap.min.css");
	document.head.appendChild(bootstrap_css);
	*/
	
	//chrome.tabs.executeScript(tab.id, {code: "document.head.appendChild(document.createElement('link')).href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';"});
	/*
	var css = document.createElement('link');
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", "w3.css");
	document.head.appendChild(css);
	*/

	var jquery_script = document.createElement('script');
	jquery_script.setAttribute("scr", "jquery-3.3.1.min.js");
	document.head.appendChild(jquery_script);

	/*
	var bootstrap_js = document.createElement('script');
	bootstrap_js.setAttribute("scr", "bootstrap.min.js");
	document.head.appendChild(bootstrap_js);
	*/

	var comment = "";

	function valid_key(keycode) {
		let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        keycode == 8				     ||	// backspace
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) ;   // [\]' (in order)
        if (valid){
        	return true;
        }
        return false;
    }

    function call_api(comment, test=false){
    	if (!test){
			let apitext = comment.split(" ").join("%20");
				  	$.ajax({
						type: "GET",
						url: "https://167.99.190.191/call_watson_api?comment=" + apitext,
						success: function(data) {
							//called when successful
							console.log("data: ", data);

							result = evaluate_data(data);
							console.log("result: ", result);
							update_ele(twitter_get_active_ele, result, comment);
					
						},
						error: function(e) {
						  //called when there is an error
						  console.log(e);
						}
					});
		}
		else{
			// ok... idk why this is happening, but apparantly there needs to be a delay before replaceing the
			// active element ... else things just stops working. I think it probably has something to do with
			// async and event listener ... but anyways, when we are using the actual api, i.e. not testing,
			// there is definitely going to be a delay and that delay is long enough
			sleep(75).then(() => {
            	update_ele(twitter_get_active_ele, {"document": 3, "sentences":[{"text": "sentence1", "tone": 3},
            		{"text": "setence2", "tone": 2}]}, comment);
        	});
			
		}
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function evaluate_data(data){
		// anger level: (0) <0.5 (1) 0.5 - 0.7 (2) 0.7 - 0.9 (3) >0.9

		let documentToneAnger = "";
		let docToneData = data.document_tone.tones.filter(tone => tone.tone_id === "anger");
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
			console.log("docAnger:", documentToneAnger);

			if (typeof data.sentences_tone != "undefined") {
				let sentenceToneData = data.sentences_tone
				.map(sentence => ({text: sentence.text, tone: sentence.tones.filter(tone => tone.tone_id === "anger")[0]}))
				.map(sentence => {
					if (sentence.tone == undefined) {
						return ({text: sentence.text, tone: 0})
					} else if (sentence.tone.score >= 0.5 && sentence.tone.score < 0.7) {
						return ({text: sentence.text, tone: 1});
					} else if (sentence.tone.score >= 0.7 && sentence.tone.score < 0.9) {
						return ({text: sentence.text, tone: 2});
					} else if (sentence.tone.score >= 0.9) {
						return ({text: sentence.text, tone: 3});
					} else {
						return ({text: sentence.text, tone: 0});
					}
				})
				return {document: documentToneAnger, sentences: sentenceToneData}
			}
			return {document: documentToneAnger, sentences: []}
		}
	}

	function empty_top_node(ele){
		let old_html = ele.innerHTML;
		console.log(old_html);
		
		if (old_html.split("<").length != 0){
			var l = old_html.split("<");
			delete l[0];
			let new_html = l.join("<");//.join("");
			console.log(new_html);
			ele.innerHTML = new_html;
		}
		
	}

    function update_ele(get_active_ele, data, comment){
    	let ele = get_active_ele();
    	console.log(ele.innerHTML);
    	//ele.style.display = "none";

    	let warning_match = {"undefined": "", 0: "", 1:"", 2:"Be nicer", 3:"Please reconsider"};
    	let bg_color_match = {"undefined": "none", 0: "none", 1:"#F9E633", 2:"#FF8C21", 3:"#C11111"};
    	let ud_color_match = {"undefined": "none", 0: "none", 1:"#C2C2C2", 2:"#C2C2C2", 3:"#C2C2C2"};

    	if (typeof(ele) != "undefined" && typeof(data) != "undefined"){
    		/*
    		ele.style.textDecoration = "underline wavy " + ud_color_match[data.document];
    		ele.setAttribute("id", "active_element");

    		$("#active_element").hover(
	            function(event) {
	                // mouse in event handler
	                var elem = event.currentTarget;
	            },
	            function(event) {
	                // mouse out event handler
	                var elem = event.currentTarget;
	            }
	        );
	        */

	        /*
    		let new_ele = document.createElement('span');
    		new_ele.setAttribute("data-toggle", "tooltip");
    		new_ele.setAttribute("title", warning_match[data.document]);
    		new_ele.setAttribute("id", "warning");

    		
			if (data.sentences.length == 0){
    			
				new_ele.innerText = ele.innerText;
				
				new_ele.style.backgroundColor = bg_color_match[data.document];
				if (bg_color_match[data.document] != "none"){
		    			new_ele.style.textDecoration  = "underline wavy " + ud_color_match[data.document];
		    		}

		    	ele.appendChild(new_ele);
		    	empty_top_node(ele);

		    	//document.getElementById("_new_span_ele").style.display = "inline";
		    	
			}

			else{
    	
				
				for (var i=0; i<data.sentences.length; i++){
					sentence = document.createElement("span");   
		    		sentence.innerText = data.sentences[i].text;
		    		sentence.style.backgroundColor = bg_color_match[data.sentences[i].tone];
		    		if (bg_color_match[data.sentences[i].tone] != "none"){
		    			sentence.style.textDecoration  = "underline wavy" + ud_color_match[data.sentences[i].tone];
		    		}
		    		
		    		new_ele.appendChild(sentence);
				}

				ele.appendChild(new_ele);
				empty_top_node(ele);
				//console.log(ele.innerHTML);
			}
			*/

			let new_ele = document.createElement('span');
    		new_ele.setAttribute("data-toggle", "tooltip");
    		new_ele.setAttribute("title", warning_match[data.document]);
    		new_ele.setAttribute("id", "warning");

    		
			if (data.sentences.length == 0){
				new_ele.innerText =  ele.innerText;
				
				new_ele.style.backgroundColor = bg_color_match[data.document];
				if (bg_color_match[data.document] != "none"){
		    			new_ele.style.textDecoration  = "underline wavy " + ud_color_match[data.document];
		    		}

		    	ele.appendChild(new_ele);
		    	empty_top_node(ele);

		    	//document.getElementById("_new_span_ele").style.display = "inline";
		    	
			}

			else{
				
				for (var i=0; i<data.sentences.length; i++){
					sentence = document.createElement("span");   
		    		sentence.innerText = data.sentences[i].text;
		    		sentence.style.backgroundColor = bg_color_match[data.sentences[i].tone];
		    		if (bg_color_match[data.sentences[i].tone] != "none"){
		    			sentence.style.textDecoration  = "underline wavy" + ud_color_match[data.sentences[i].tone];
		    		}
		    		
		    		new_ele.appendChild(sentence);
				}

				ele.appendChild(new_ele);
				empty_top_node(ele);
				//console.log(ele.innerHTML);
			}

    	}
    }

    function general_get_active_ele(){
    	return document.activeElement;
    }

    function twitter_get_active_ele(){
    	return document.activeElement.getElementsByTagName("div")[0];
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
	  if (valid_key(e.keyCode)){
	  	var key = e.key;
	  	if (key != "Backspace"){
	  		comment += key;
	  	}
	  	else{
	  		if(comment != ""){
	  			comment = comment.substring(0, comment.length - 1);
	  		}
	  	}

	  	if (key == "."){
	  		call_api(comment);
	    }

	  }

	});

 	
 	/*
	setInterval(function() {
		var active_element = fb_get_active_ele();
		if (typeof(active_element) != "undefined"){
			
			num_period_ae = active_element.innerHTML.split(".").length;
			num_period_co = comment.split(".").length;

			end_char = active_element.innerHTML.slice(-1);
			
			if (end_char == "." || end_char == "!" || end_char == "?"){
				comment = active_element.innerHTML;
				if (num_period_ae == 1 && num_period_co == 0){
					call_api(to_send);
				}
			
				
			}
		}

	}, 500);
	*/
	
})();