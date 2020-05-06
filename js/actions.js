var sendmail = function(){
    var name    = $('#inputName').val();
    var email   = $('#inputEmail').val();
    var phone   = $('#inputPhone').val();
    var msg     = $('#inputComments').val();
    var area    = $('#inputArea').val();

    if(name != '' && email != '' && phone != ''){
        Email.send({
            Host : "email-smtp.us-west-2.amazonaws.com",
            Username : "AKIAUUNGZ3BW34JJBC54",
            Password : "BEkwMnDjg1sUboSuZRqnWXCuiNGStd+2GJIVwcDklZ7t",
            port: 465,
            To : 'info@pplcert.org',
            From : 'info@pplcert.org',
            Subject : "This is the subject",
            Body : msg+' Area: '+area
        }).then(function(message){
            alert(message)
        }).catch(function(err){
            console.log(err);
        });

    }else{
        alert('Please, set your Name, Email and Phone number before!');
    } 
}

$(document).ready(function(){
    $('.carousel').carousel()
});