


$(document).ready(function() {
$('.modal').modal();

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	var aadhaar_list = {
		"000123456789" : "Rajpura",
		"112233445566": "Hyderabad",
	}

	var aadhaar = readCookie('aadhaar');

	console.log(aadhaar);
	var address = aadhaar_list[aadhaar];
	console.log(address);
	$('#loc_info').text('Constituency based on Aadhaar : '+ address)

	function disable() {
			$('button').addClass( "disabled" );
		    //logout
		    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		    document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		    window.location = '/app';
	}

	$('button').click(function(){
		    alert('You Voted Successfully');
		    disable();
			$('#loc_info').text('You Voted Successfully')
	})
});