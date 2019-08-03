/* When the user clicks on the button, 
	toggle between hiding and showing the dropdown content 
	function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
	}*/
	/* When the user clicks on the button, 
		toggle between hiding and showing the dropdown content */

$(window).on('load', function() {

	$('.menu-mobile ul li').on('click', function(event){
		$('.toggler').prop('checked', false);
	})
	/*
	$('.connexion-brand .identification').on('click', function(event){
		$('.connexion-menu').toggle();
		console.log("toggle")
	})
	$('.compte .connexion-menu ul li').on('click', function(event){
		$('.connexion-menu').hide();
		console.log("hide")
	})*/
	document.getElementById("buttonDropDown").onmouseover = function(){
		console.log("on mouse over");
		document.getElementById("myDropdown").classList.toggle("show");
	};
	// Close the dropdown menu if the user clicks outside of it
	window.onclick = function(event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
			}
		}
	}

	function openCity(evt, cityName) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(cityName).style.display = "block";
		evt.currentTarget.className += " active";
	}
	document.getElementById("buttonLondon").click();

// code here
});