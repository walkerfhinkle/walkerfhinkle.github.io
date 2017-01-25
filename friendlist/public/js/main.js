
var $name = $('#name');
var $ability = $('#ability');
var $city = $('#city');
var $heroes = $('#heroes');


var heroTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Ability:</strong> {{ability}}</p>" +
	"<p><strong>City:</strong> {{city}}</p>" +
	"<button id='{{id}}' class='remove' style='color: white'>X</button>" +
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
				addHeroes(hero)
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
					addHeroes(newHero);
				},

				error: function(){
					alert('Error adding new hero');
				}

			});

		});

	//.delegate allows you to remove items that were loaded by other students
	//look into the friendTemplate from above the button has the class="remove"
	//in it.
	$heroes.delegate('.remove', 'click', function(){

		//this should look a little familiar.  It is saying whatever was clicked with the
		//class of .remove then $li is the closest li to that particular button.
		var $li = $(this).closest('li');
		//AJAX DELETE Function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			//$(this).attr('id') is that button's id we set up the template.
			//it is the same thing as copying an id like we did in postman
			//and running the delete request at the API.
			url: 'http://rest.learncode.academy/api/whinkle/heroes/' + $(this).attr('id'),
			success: function(){
				//once that happens we fade out the li and then we remove
				//it from the DOM.
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});