function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
// var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
$('#verify_otp_model').hide()
$('#errorbox').hide()

// phone auth
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('getotp', {
      'size': 'invisible',
      'callback': function(response) {
      }
    });

  recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

  var aadhaar_no_phone_no = {
    "000123456789" : "9888606428",
    "112233445566": "7973162267",
  }

  function onSignInSubmit() {
    window.signingIn = true;
    $('#errorbox').hide();
    var phoneNumber = "+91" + aadhaar_no_phone_no[$('#aadhaar_no').val()];
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));      
    var expires = "expires="+ d.toUTCString();
    document.cookie = 'aadhaar' + "=" + $('#aadhaar_no').val() + ";" + expires + ";path=/";
    $('#verifyc').text('Enter verification code send to '+phoneNumber)
     var appVerifier = window.recaptchaVerifier;
     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            window.signingIn = false;
            $('#enter_aadhaarno').hide()
            $('#verify_otp_model').show()
            console.log('otp');
            
          }).catch(function (error) {
            window.alert('error\n\n'+error);
            window.signingIn = false;
            $('.verification-code-form').hide()
          });
  }

$(verifyotp).click(function(){
		var code = $('#verify_otp').val()
      	confirmationResult.confirm(code).then(function (result) {
        var user = result.user;
        window.verifyingCode = false;
        console.log(user.uid);
        var d = new Date();
    	d.setTime(d.getTime() + (1*24*60*60*1000));      
    	var expires = "expires="+ d.toUTCString();
    	document.cookie = 'show' + "=" + user.uid + ";" + expires + ";path=/";
    	window.location = '/info'

      }).catch(function (error) {
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
           + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        $('#errorbox').show()
		$('#error').text('Enter valid OTP')
      });
});


$(getotp).click(function(){
	if ($('#aadhaar_no').val()=="") {
		$('#errorbox').show()
		$('#error').text('Please Enter Aadhaar No')
  }
    else{
    	onSignInSubmit();
    	$('#errorbox').hide()
    }
});
