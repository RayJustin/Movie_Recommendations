// Need to set up the TasteKid API and use .each to call
// the IMDB API for each related title, then the output 
// of the IMDB object should be output to the template.


// Fades in and fades out the overlay //
$('a#help').on('click', function(){
	$('.dim').fadeIn(1000);
	$('.overlayContainer').fadeIn(1000);
});

$('a#overlayButton').on('click', function(){
	$('.dim').fadeOut(1000);
	$('.overlayContainer').fadeOut(1000);
});
//-------------------------------------//



// Submits the form and sends it to IMBD //
//   SET UP FOR TASTEKID API INSTEAD     //
$('#searchTerm').submit(function(event){
	event.preventDefault();
	var value = $('#search').val();
	$('.entries').html('');
	getTasteKid(value);
})

function getTasteKid(value) {
	var param = {
		url: 'https://www.tastekid.com/api/similar',
		data: {
			q: value,
			type: 'movies',
			info: 0,
			k: '230403-JustinDi-K6WB5I2S'
		},
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(data){
			$.each(data.Similar.Results, function(index, value){
				getIMDBRequest(value.Name);
			});
		}
	};
	
	$.ajax(param);
}


// AJAX call for IMDB API //
function getIMDBRequest(value) {
	var param = {
		s: value,
		type: 'movie'
	}
	var url = 'https://www.omdbapi.com/?';
	$.getJSON(url, param, function(data){
		$.each(data.Search, function(index, value){
			if(index === 0){
			$('.entries').append(
				'<div class="template"><img src="'+ value.Poster +'" class="templateImg"><p class="templateTitle">' + value.Title + '</p><p class="templateLink"><a target="_blank" href="http://www.imdb.com/title/' + value.imdbID + '">WATCH THE TRAILER</a></p></div>');
			}
		});
	});
}

