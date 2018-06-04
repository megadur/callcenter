$(function() {
    /*
     * Bestimmung des Autofocus. Sollte kein Hash definiert sein,
     * wird, falls ein Alert existiert, dieses fokussiert, ansonsten das erste Eingabefeld. 
     */
    var hash = window.location.hash;
    if("" === hash) {
        
        var $alert = $(".alert");
        if($alert.length > 0) {
            $alert.find("button").attr("autofocus", "autofocus").focus();
        } else {
            var $input = $("input").first();
            if($input != null) {
                $input.attr('autofocus', 'autofocus');
                $input.focus();
            }
        }
    };
});

$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});