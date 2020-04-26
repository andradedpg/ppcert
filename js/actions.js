var sendmail = function(){
    var name    = $('#inputName').val();
    var email   = $('#inputEmail').val();
    var phone   = $('#inputPhone').val();
    var msg     = $('#inputComments').val();
    var area    = $('#inputArea').val();

    if(name != '' && email != '' && phone != ''){
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "dandrade.dev@gmail.com",
            Password : "C345C040D4FF594773BFE3A97B15895B1ADF",
            port: 2525,
            To : 'info@pplecert.org',
            From : email,
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(function(message){
            alert(message)
        });
    }else{
        alert('Please, set your Name, Email and Phone number before!');
    } 
}