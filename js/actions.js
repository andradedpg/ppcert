var sendmail = function(){

    $('.btnsendmail').html('..sending');

    var name     = $('#inputName').val();
    var email    = $('#inputEmail').val();
    var phone    = $('#inputPhone').val();
    var msg      = $('#inputComments').val();
    var area     = $('#inputArea').val();
    
    var chk_mail_rec   = $("input[name='check-receive-mail']");
    var chk_mail_allow = $("input[name='check-allow-pplcert']");

    console.log(chk_mail_rec);
    
    if(name != '' && email != '' && phone != ''){
        var data = {
            "name":      name,
            "email":     email,
            "phone":     phone,
            "category":  area,
            "message":   msg,

            "receive_mail":  $(chk_mail_rec).is(':checked') ? 'checked' : 'non',
            "help_research": $(chk_mail_allow).is(':checked') ? 'checked' : 'non'
        }
        $.ajax({
            url: "https://api.pplcert.org/api/mail/send/contact-mail-site",
            type: "POST",
            crossDomain: true,
            data: data,
            dataType: "json",
            xhrFields: {cors: false},
            success: function (response) {
                var resp = JSON.parse(response)
                console.log(resp);
                $('.btnsendmail').html('Sent! Thankyou');
            },
            error: function (xhr, status) {
                $('.btnsendmail').html('Sent! Thankyou');
            }
        });

    }else{
        alert('Please, set your Name, Email and Phone number before!');
    } 
}

var searchProducts = function(){
    var txt = $('#searchProductsTxt').val();
    //we need serv side solution here :(
    $('.results').show('slow');
    $.ajax({
        url: "http://localhost:8000/api/airtable/products/search/"+txt,
        type: 'GET',
        beforeSend: function(){
            var html = '<tr><td colspan="4" style="text-aligin:center">Searching <i class="fas fa-spinner fa-spin"></i></td></tr>';

            $('.result_search_table tbody').append(html);
        },
        success: function(result){
            $('.result_search_table tbody').html('');
            var html = '';
        
            if(result.data !== null){
                result.data.forEach(function(element){

                    var img  = element.photo !== null ? element.photo : 'https://www.everywhere.pt/images/no_image.png';
                    html += '<tr>';
                    html += ' <td>'+element.name+'</td>\n';
                    html += ' <td>'+element.type+'</td>\n';
                    html += ' <td>'+element.producer+'</td>\n';
                    html += ' <td><img src="'+img+'" class="img-fluid round" width="80" /></td>\n';
                    html += '</tr>';    
                });
            }else{
                html += '<tr>';
                html += ' <td colspan="4" style="text-align:center">Not matched records found :(</td>\n';
                html += '</tr>';
                html += '<tr>';
                html += ' <td colspan="4" style="text-align:center">Maybe see <a href="#">all products</a> here help you!</td>\n';
                html += '</tr>';
            }

            $('.result_search_table tbody').append(html);
        },
        error: function(err){
            console.error(err);
        }
    });
}

$(document).ready(function(){
    $('#inputPhone').mask('00-0 0000 0000');   
    $('.carousel').carousel()
});
