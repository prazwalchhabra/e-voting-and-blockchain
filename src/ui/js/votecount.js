$(document).ready(function() {
$('.modal').modal();
	$('#const').click(function(){
		$("#slct").css("visibility", "hidden");
		setTimeout(function(){ $("table").css("visibility", "visible"); }, 3000);
	})
});