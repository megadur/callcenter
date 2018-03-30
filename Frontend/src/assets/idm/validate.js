/*

alert('xxx');
*/
$(document).ready(function () {

   // add * to required field labels
  $('label.required').append('&nbsp;<strong>*</strong>&nbsp;');
  $('#FehlerDefForm').validate({
    rules: {
      inputEM: {
        minlength: 8,
        required: true,
        normalizer: function (value) {
          return $.trim(value);
        }
      },
      inputMP: {
        minlength: 8,
        required: true,
        MPMatNoStartsWith89: true
      },
      Fehlerbild: {
        required: true,
      },
      FBKATEGORIE:{
        required: true,
        FBKATEGORIE_ALLG: true
      }
    },
    highlight: function (element) {
        // element.text.addClass('bg-danger');
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
      element.text('OK!').closest('.input-group').addClass('valid')
        .closest('.form-group').removeClass('has-error').addClass('has-success');
    }
  });

});
jQuery.validator.addMethod("FBKATEGORIE_ALLG", function (inp, element) {
  inp = inp.replace(/\s+/g, "");
  return this.optional(element) || inp.match(/^Allgemein$/);
}, "FBKATEGORIE_ALLG");
jQuery.validator.addMethod("MPMatNoStartsWith89", function (inp, element) {
    inp = inp.replace(/\s+/g, "");
    return this.optional(element) || inp.match(/^89\d{6,}$/);
  }, "MPMatNoStartsWith89");
  