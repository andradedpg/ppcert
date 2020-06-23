window.endpoint = "https://api.pplcert.org/api";
// window.endpoint = "http://localhost:8000/api";

var sendmail = function () {
  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var phone = $("#inputPhone").val();
  var msg = $("#inputComments").val();
  var area = $("#inputArea").val();

  var chk_mail_rec = $("input[name='check-receive-mail']");
  var chk_mail_allow = $("input[name='check-allow-pplcert']");

  if (name != "" && email != "" && phone != "") {
    var data = {
      name: name,
      email: email,
      phone: phone,
      category: area,
      message: msg,

      receive_mail: chk_mail_rec.is(":checked") ? "checked" : "non",
      help_research: chk_mail_allow.is(":checked") ? "checked" : "non",
    };
    $.ajax({
      url: window.endpoint + "/mail/send/contact-mail-site",
      type: "POST",
      data: data,
      dataType: "json",
      beforeSend: function () {
        $(".btnsendmail").html(
          'sending <i class="fas fa-spinner fa-spin"></i>'
        );
      },
      success: function (response) {
        if (response.success) {
          $(".btnsendmail").html(
            'Sent<i class="fas fa-check"></i> Thank you. '
          );

          $("#inputName").val("");
          $("#inputEmail").val("");
          $("#inputPhone").val("");
          $("#inputComments").val("");
        }
      },
      error: function (xhr, status) {
        $(".btnsendmail").html("Sent! Thank you");
      },
    });
  } else {
    alert("Please, set your Name, Email and Phone number before!");
  }
};

var clearSearchBox = function () {
  $(".result_search_table tbody").html("");
  $(".results").hide();
  $(".dealing-title").html("Are you dealing with medical supply shortages ?");
};
var searchProducts = function () {
  var txt = $("#searchProductsTxt").val();
  //we need serv side solution here :(
  $(".results").show("slow");
  $.ajax({
    // url: 'https://api.pplcert.org/api/airtable/products/search/'+txt,
    url: window.endpoint + "/airtable/products/search/" + txt,
    type: "GET",
    beforeSend: function () {
      var html =
        '<tr><td colspan="4" style="text-aligin:center">Searching <i class="fas fa-spinner fa-spin"></i></td></tr>';

      $(".result_search_table tbody").html(html);
    },
    success: function (result) {
      $(".result_search_table tbody").html("");
      $(".dealing-title").html("");
      var html = "";

      if (result.data !== null) {
        result.data.forEach(function (element) {
          var img =
            element.photo !== null
              ? element.photo
              : "https://www.everywhere.pt/images/no_image.png";
          html += "<tr>";
          html +=
            " <td style='vertical-align: middle;'>" + element.name + "</td>\n";
          html +=
            " <td style='vertical-align: middle;'>" + element.type + "</td>\n";
          html +=
            " <td style='vertical-align: middle;'>" +
            element.producer +
            "</td>\n";
          html +=
            ' <td><img src="' +
            img +
            '" class="img-fluid round" style="height:40px;max-width:80px;width: expression(this.width > 80 ? 80: true);" /></td>\n';
          html += "</tr>";
        });

        html += "<tr>";
        html +=
          ' <td colspan="3" style="text-align:center; vertical-align: middle;"><a href="#">Click here to see all results!</a> <img src="../img/favicon.png" /></td>\n';
        html +=
          "<td style='text-align:center;vertical-align: middle;font-size:9px'><a href='#' onclick=\"clearSearchBox()\">clear search</a></td>";
        html += "</tr>";
      } else {
        html += "<tr>";
        html +=
          ' <td colspan="4" style="text-align:center">Not matched records found :(</td>\n';
        html += "</tr>";
        html += "<tr>";
        html +=
          ' <td colspan="4" style="text-align:center">Maybe see <a href="#">all products</a> here help you!</td>\n';
        html += "</tr>";
      }

      $(".result_search_table tbody").append(html);
    },
    error: function (err) {
      console.error(err);
    },
  });
};

$(document).ready(function () {
  $("#searchProductsTxt").keydown(function (e) {
    if (e.keyCode == 13) searchProducts();
  });

  $(".owl-carousel").owlCarousel({
    nav: false,
    loop: true,
    margin: 20,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
        margin: 0,
      },
      600: {
        items: 3,
      },
      800: {
        items: 4,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
});
