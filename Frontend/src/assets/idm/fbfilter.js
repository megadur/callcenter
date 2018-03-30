    var target;

    function initShowMatchClick(sSubject, sRegex) {
        var subject = document.getElementById(sSubject);
        var regex = document.getElementById(sRegex);
        target = regex;
        var mdregex = document.getElementById('trRegex');
        var mdsubject = document.getElementById('trText');
        if(regex) mdregex.value = regex.value;
        if(subject) mdsubject.innerText = subject.innerText;
    }

    function exitShowMatchClick(sSubject) {
        var subject = document.getElementById(sSubject);
        target.value = subject.value;
    }

    function demoShowMatchClick(sSubject, sRegex, sResult) {
        var subject = document.getElementById(sSubject);
        var regex = document.getElementById(sRegex);
        var result = document.getElementById(sResult);
        var re = new RegExp(regex.value);
        var m = re.exec(subject.innerText);
        if (m == null) {
            if (result == null) {
                alert("No match");
            } else {
                result.innerText = "No match";
            }
        } else {
            var s = "Match at position " + m.index + ":\n";
            for (i = 0; i < m.length; i++) {
                s = s + m[i] + "\n";
            }
            if (result == null) {
                alert(s);
            } else {
                result.innerText = s;
            }
        }
    }

    $(function () {
        $('.button-checkbox').each(function () {

            // Settings
            var $widget = $(this),
                $button = $widget.find('button'),
                $checkbox = $widget.find('input:checkbox'),
                color = $button.data('color'),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };

            // Event Handlers
            $button.on('click', function () {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                updateDisplay();
            });
            $checkbox.on('change', function () {
                updateDisplay();
            });

            // Actions
            function updateDisplay() {
                var isChecked = $checkbox.is(':checked');

                // Set the button's state
                $button.data('state', (isChecked) ? "on" : "off");

                // Set the button's icon
                $button.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$button.data('state')].icon);

                // Update the button's color
                if (isChecked) {
                    $button
                        .removeClass('btn-default')
                        .addClass('btn-' + color + ' active');
                } else {
                    $button
                        .removeClass('btn-' + color + ' active')
                        .addClass('btn-default');
                }
            }

            // Initialization
            function init() {

                updateDisplay();

                // Inject the icon if applicable
                if ($button.find('.state-icon').length == 0) {
                    $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon +
                        '"></i> ');
                }
            }
            init();
        });
    });
