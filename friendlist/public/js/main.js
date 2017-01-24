
var $name = $('#name');
var $ability = $('#ability');
var $city = $('#city');
var $heroes = $('#heroes');


var heroTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Ability:</strong> {{ability}}</p>" +
	"<p><strong>City:</strong> {{city}}</p>" +
	"</li>";
	//DRY - Don't Repeat Yourself

//Adding a friend
function addHeroes(hero){
	$heroes.append(Mustache.render(heroTemplate, hero));
}


$(document).ready(function() {
	//alert("jQuery is working!");

	//GET Data request
	$.ajax({
		type: 'Get',
		url: 'http://rest.learncode.academy/api/whinkle/heroes/',

		success: function(heroes){
			$.each(heroes, function(i, hero){
				addHero(hero)
			});
		},

		error: function(){
			alert('Error loading heroes');
		}

	});

	//POST to Add a friend
	$('#add-hero').on('click', function(){
		var hero = {
			name: $name.val(),
			ability: $ability.val(),
			city: $city.val()
			
		};

		//Clearing input fields
		$("#name").val("");
		$("#ability").val("");
		$("#city").val("");

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/whinkle/heroes/',
			data: hero,

				success: function(newHero){
					addHero(newHero);
				},

				error: function(){
					alert('Error adding new hero');
				}

			})

		})

	//DELETE to dump 'em
	$.ajax({
  		type: 'DELETE',
  		url: 'http://rest.learncode.academy/api/whinkle/heroes',
  			success: function() {
    			//no data
    			console.log('Hero deleted successfully!');
  			}
	});

});