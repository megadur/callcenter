$(function () {
  /*
   * Bestimmung des Autofocus. Sollte kein Hash definiert sein,
   * wird, falls ein Alert existiert, dieses fokussiert, ansonsten das erste Eingabefeld. 
   */
  var hash = window.location.hash;
  if ("" === hash) {

    var $alert = $(".alert");
    if ($alert.length > 0) {
      $alert.find("button").attr("autofocus", "autofocus").focus();
    } else {
      var $input = $("input").first();
      if ($input != null) {
        $input.attr('autofocus', 'autofocus');
        $input.focus();
      }
    }
  };
});

function fensterOeffnen(sUrl) {
  alert(sUrl);
  window.open(sUrl, 'newwindow',
    'scrollbars=1,width=800,height=800');
};


function fensterAuf(xml) {
  //alert(sUrl);
//  var wnd = window.open("about:blank", "", "_blank");
  //wnd.document.write(html);
  //window.open("data:text/xml;charset=utf-8,"+xml, "", "_blank")
  //var myElement = angular.element( document.querySelector( '#'+id ) );
  //myElement.innerHTML=xml;
};

fensterAuf('hihi');
