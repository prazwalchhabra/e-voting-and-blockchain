$(document).ready(function() {
$('.modal').modal();
	$('#const').click(function(){
		$("card-alert").css("visibility", "visible");
		$("#slct").css("visibility", "hidden");
		setTimeout(function(){ $("table").css("visibility", "visible"); }, 3000);
	})
});