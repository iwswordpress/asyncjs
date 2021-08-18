function loadPosts() {
	var wpURL = 'https://wpjs.co.uk/wpb/wp-json/wp/v2/posts?categories=27';
	//var wpURL = "https://wpjs.co.uk/wpb/wp-json/wp/v2/posts";
	fetch(wpURL)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(function (data) {
			//console.log("JSON DATA");
			//console.log(data);
			var numberArticles = data.length;
			var post;
			console.log('number of Articles: ' + numberArticles);
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i].id);
				post = {
					id: data[i].id,
					title: data[i].title.rendered,
					body: data[i].content.rendered,
				};
				//console.log(post);
				writeData('wpPOSTS', post);
			}
		})
		.catch((err) => console.log(err));
}
