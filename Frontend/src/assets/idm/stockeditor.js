var formInEditMessage = "Einige Felder befinden sich noch in Bearbeitung oder sind nicht ausgefüllt";
var validateOkResponse = null;
var errorWhenLoggedOut = null;
var registerValidateStockMessages = function(_validateOkResponse,
		_errorWhenLoggedOut) {
	validateOkResponse = _validateOkResponse;
	errorWhenLoggedOut = _errorWhenLoggedOut;
};
var prdEmContainer = null;
var emSelectOptions = [];
var prdEmsRegistered = false;
var registerPrdEms = function(map) {
	prdEmContainer = map;
	if (prdEmContainer != null) {
		$.each(prdEmContainer, function(emMatno, product) {
			var option = $("<option>", {
				'value' : product.emMatno,
				'text' : product.emMatno + " " + product.caption,
				'id' : product.emMatno,
				'title' : product.caption,
				'data' : product
			})[0];
			emSelectOptions.push(option);
		})
		prdEmsRegistered = true;
	}
	emEditor.setOptionsmap(map);
	emEditor.setOptions(emSelectOptions);
};
var paramContainer = null;
var paramSelectOptions = [];
var registerParams = function(map) {
	paramContainer = map;
	if (paramContainer != null) {
		$.each(paramContainer, function(paramId, parameter) {
			var option = $("<option>", {
				'value' : paramId,
				'text' : paramId + ":" + parameter.caption,
				"id" : paramId,
				'title' : parameter.caption,
				'data' : parameter
			})[0];
			paramSelectOptions.push(option);
		});
	}
	;
	paramEditor.setOptionsmap(map);
	paramEditor.setOptions(paramSelectOptions);
};
var suspensionGroupContainer = null;
var suspensionGroupOptions = [];
var registerSuspensions = function(map) {
	suspensionGroupContainer = map;
	if (suspensionGroupContainer != null) {
		$.each(suspensionGroupContainer, function(suspGroupId, suspGroup) {
			var option = $("<option>", {
				'value' : suspGroupId,
				'text' : suspGroupId + ":" + suspGroup.caption,
				"id" : suspGroupId,
				'title' : suspGroup.caption,
				'data' : suspGroup
			})[0];
			suspensionGroupOptions.push(option);
		});
	}
	;
	suspensionEditor.setOptionsmap(map);
	suspensionEditor.setOptions(suspensionGroupOptions);
}
function createTableEditor() {
	var containerSelector = "";
	var tabButton;
	var selectBox = $("<select>");
	var table = null;
	var tableBody = null;
	var inEditMode = false;
	var addLine = null;
	var optionsMap = {};
	var exitEditModeCbs = [];

	var runExitEditModeCbs = function() {
		exitEditModeCbs.forEach(function(cb) {
			cb();
		});
	};
	/**
	 * Checks if form is submitable and tries to highlight errors
	 */
	var isFormSubmitable = function() {
		if (inEditMode) {
			return false;
		} else {
			var submitable = true;
			var requiredFields = table.find("input[required=required]");
			requiredFields.each(function() {
				el = $(this);
				if (el.val().length == 0) {
					el.addClass("has-error");
					submitable = false;
				}
			});
			return submitable;
		}
	};

	var isRowInEditMode = function(row) {
		var editButton = row.find(".edit");
		return editButton.hasClass("glyphicon-ok");
	};

	/**
	 * Toggles a row from beeing in edit Mode to nonEdit Mode and vice versa
	 */
	var toggleRow = function(row, allRows) {
		switchSelectBox(row);
		var inputs = row.find("input");
		var editButton = row.find(".edit");
		var _removeButton = row.find(".remove");

		if (inEditMode) {
			// changing to no edit mode
			inputs.prop('readonly', true);
			inputs.removeClass('has-error');
			editButton.removeClass("glyphicon-ok");
			editButton.addClass("glyphicon-pencil");
			
			_removeButton.removeClass("glyphicon-remove-sign");
			_removeButton.addClass("glyphicon-remove");
			$(_removeButton).attr("title", "Löschen");
			
			runExitEditModeCbs();
			var addButtons = $(".tab-content").find("button.add");
			$.each(addButtons, function(index, button) {
				var jButton = $(button);
				jButton.attr({
					title : "Hinzufügen"
				});
				jButton.tooltip("disable");
			});
		} else {
			// changing to edit mode
			inputs.prop('readonly', false);
			editButton.removeClass("glyphicon-pencil");
			editButton.addClass("glyphicon-ok");
			
			_removeButton.removeClass("glyphicon-remove");
			_removeButton.addClass("glyphicon-remove-sign");
			$(_removeButton).attr("title", "Bearbeitung abbrechen");

		}
		inEditMode = !inEditMode;
	};

	var fillFieldsFromSelectCb = null;
	var fillFieldsFromSelect = function(row, option) {
		if (fillFieldsFromSelectCb != null
				&& fillFieldsFromSelectCb instanceof Function) {
			return fillFieldsFromSelectCb(row, option);
		}
		;
		var selectBoxColumn = row.find("td[headers='"
				+ selectBoxColumnHeaderAttr + "']");
		if (selectBoxColumn.children().length) {
			selectBoxColumn.find(":first-child").val(option.emMatno);
		} else {
			selectBoxColumn.val(option.id);
		}
		// row.find("td[headers='"+selectBoxColumnHeaderAttr+"']").value(option.id);
		row.find("td[headers='" + captionColumn + "']:first").text(
				option.caption);
	};
	var switchSelectBox = function(row) {
		var jEmInput = row.data("inputField");
		if (jEmInput == undefined)
			return;
		var emInput = jEmInput[0];
		var emColumn = row.find("td[headers='" + selectBoxColumnHeaderAttr
				+ "']");
		var currentInput = emColumn.find(":first-child:first");
		/**
		 * Das Element das nach dem Toggle angezeigt werden soll
		 */
		var elementToDisplay = emInput;
		if (currentInput[0] == emInput) {
			elementToDisplay = selectBox[0];
		} else {
			elementToDisplay = emInput;
			jEmInput.prop("readonly", true);
		}
		currentInput.detach();
		emColumn.empty();
		emColumn.append(elementToDisplay);// TODO funzt das?
		var currentInputDomElement = currentInput[0];
		if (inEditMode) {
			var chosenOption = currentInputDomElement
					.item(currentInputDomElement.selectedIndex);

			fillFieldsFromSelect(row, jQuery.data(chosenOption));
		} else {
			var selectIndex = 0;
			var currentValue = "";
			if (currentInputDomElement != null) {
				currentValue = currentInputDomElement.value;
			} else {
				currentValue = emColumn.text();
			}
			var selectedOption = elementToDisplay.namedItem(currentValue);
			if (selectedOption != null) {
				selectIndex = selectedOption.index;
			}
			;
			elementToDisplay.selectedIndex = selectIndex;
			selectBox.select2();
		}
	};

	var setOptions = function(selectOptions) {
		selectBox.empty();
		selectBox.append(selectOptions);
	}
	var setOptionsMap = function(map) {
		optionsMap = map;
	};
	var selectBoxColumnHeaderAttr = null;
	var setSelectBoxColumn = function(selectBoxColumnHeader) {
		selectBoxColumnHeaderAttr = selectBoxColumnHeader;
	};
	var captionColumn = null;
	var setCaptionColumn = function(captionColumnHeader) {
		captionColumn = captionColumnHeader;
	};
	var makeRowEditable = function(row) {
		var jRow = $(row);
		var initialRow = jRow.clone();
		var initialValues = [];
		jRow.find("input").each(function(){
			var inputField = $(this);
			initialValues.push(inputField.val());
			console.log(inputField.val());
		});
		console.log(initialValues);
		var editColumn = jRow.first();
		var editButton = editColumn.find(".edit");
		var removeButton = editColumn.find(".remove");
		if (selectBoxColumnHeaderAttr != null) {
			var selectBoxSwitchableInput = jRow.find("td[headers='"
					+ selectBoxColumnHeaderAttr + "'] :first-child");
			jRow.data("inputField", selectBoxSwitchableInput);
		}
		;
		editButton.unbind("click");
		removeButton.unbind("click");
		removeButton.click(function() {
			if (isRowInEditMode(jRow)) {
				toggleRow(jRow);
				jRow.replaceWith(initialRow);
				makeRowEditable(initialRow);
				toggleRow(initialRow);
				toggleRow(initialRow);//dirty hack um zeile zu initialisieren
			} else {
				jRow.remove();
			}
		});
		editButton.click(function() {
			if (inEditMode && !isRowInEditMode(jRow)) {
				return;// Editieren immer nur von einer zeile erlauben
			}
			toggleRow(jRow);
		});
		editButtons.push(editButton);
		deleteButtons.push(removeButton);
	};
	/**
	 * Registriert die event Handler fuer die Buttons
	 */
	var makeEditable = function(tbody) {
		var rows = tbody.find("tr");
		editButtons = [];
		deleteButtons = [];
		$(rows).each(function(index, row) {
			makeRowEditable(row);
		});
	};

	var getTableBody = function(tableSelector) {
		if (tableSelector != null) {
			if (table == null) {
				table = $(tableSelector);
			}
			if (tableBody == null) {
				tableBody = table.find("tbody");
			}
		}
		return tableBody;
	};

	var registerAddButton = function(enclosingElement) {
		var jAddButton = enclosingElement.find("button.add");
		jAddButton.unbind("click");
		jAddButton.click(function() {
			if (!inEditMode) {
				addLine();
			} else {
				jAddButton.attr({
					title : formInEditMessage
				});
				jAddButton.tooltip("show");
			}
		});
	};
	var matchIndex = new RegExp(/\d*(?=])/);
	var resetInputIndices = function() {
		var tableBody = table.find("tbody");
		/**
		 * Ersetzt den index mit einem neuen index(die liste wird neu
		 * durchgezaehlt)
		 */
		tableBody.find("tr").each(function(index, row) {
			var inputs = $(row).find("input");
			var oldIndex = inputs.attr("name").match(matchIndex)[0];
			inputs.attr("name", function(attrIdx, oldVal) {
				return oldVal.replace(oldIndex, index);
			});
			inputs.attr("id", function(attrIdx, oldVal) {
				if (oldVal != null) {
					return oldVal.replace(oldIndex, index);
				}
			});
		});
	}
	return {
		init : function(tableDivSelector, selectOptions, selectBoxColumnHeader,
				captionColumnHeader, addLinefn, selectBoxToggleFn) {
			var tableSelector = tableDivSelector + " table";
			containerSelector = tableDivSelector;
			tabButton = $("a[href='" + tableDivSelector + "']");
			if (selectBoxToggleFn != null) {
				fillFieldsFromSelectCb = selectBoxToggleFn;
			}
			;
			addLine = function() {
				table = $(tableSelector);
				var domTable = table.find("tbody")[0];
				var newLine = domTable.insertRow(0);
				addLinefn(newLine,/* domTable.rows.length */0, makeRowEditable);
				resetInputIndices();
				toggleRow($(domTable).find("tr:first"));
			};

			setSelectBoxColumn(selectBoxColumnHeader);
			setCaptionColumn(captionColumnHeader);
			makeEditable(getTableBody(tableSelector));
			registerAddButton($(tableSelector + " thead"));
			if (selectOptions instanceof Array && selectOptions.length > 0) {
				setOptions(selectOptions);
			}
		},
		/**
		 * options: array of dom options
		 */
		setOptions : function(options) {
			setOptions(options);
		},
		setOptionsmap : function(map) {
			setOptionsMap(map);
		},
		isFormSubmitable : isFormSubmitable,
		onExitEditMode : function(cb) {
			if (typeof cb == "function") {
				exitEditModeCbs.push(cb);
			}
		},
		resetFormIndexes : resetInputIndices
	};
};
var _createInputField = function(name, value, rowNumber, required, tab,
		placeholder) {
	if (required === undefined) {
		required = false;
	}
	;
	if (tab === undefined) {
		tab = "";
	}
	;
	if (placeholder === undefined) {
		placeholder = "";
	}
	;
	return $("<input>", {
		'type' : 'text',
		'readonly' : 'readonly',
		'required' : required,
		'id' : tab + rowNumber + '.' + name,
		'name' : tab + "[" + rowNumber + "]" + "." + name,
		'value' : value,
		'placeholder' : placeholder
	});
}

var emEditor = createTableEditor();
var paramEditor = createTableEditor();
var callnumEditor = createTableEditor();
var suspensionEditor = createTableEditor();
var emAddLine = (function() {
	var createInputField = function(name, value, rowNumber, required) {
		var tab = 'modules';
		return _createInputField(name, value, rowNumber, required, tab);
	}
	var createMatnoEl = function(matno, rowNumber) {
		return $('<td>', {
			'headers' : 'em-matno-th',
			'html' : createInputField('emMatno', matno, rowNumber, true)
		});
	}
	var createCaptionEl = function(caption, rowNumber) {
		return $('<td>', {
			'headers' : 'em-caption-th',
			'html' : caption
		});
	}
	var createMpMatnoEl = function(mpMatno, rowNumber) {
		return $('<td>', {
			'headers' : 'em-mpmatno-th',
			'html' : createInputField('mpMatno', mpMatno, rowNumber)
		});
	}
	var createAssetIdEl = function(assetId, rowNumber) {
		return $('<td>', {
			'headers' : 'em-assetid-th',
			'html' : createInputField('assetId', assetId, rowNumber)
		});
	}
	var createIkEl = function(ik, rowNumber) {
		return $('<td>', {
			'headers' : 'em-ik-th',
			'html' : createInputField('instanz.ik', ik, rowNumber)
		});
	}
	var createRow = function(rowNumber, matno, caption, mpMatno, assetId, ik,
			row) {
		if (typeof row == 'undefined') {
			row = $("<tr>");
		}
		row
				.append('<td headers="em-buttons-th" class="buttons"><button title="Bearbeiten" type="button" class="glypicon glyphicon-pencil edit"></button> <button type="button" title="Löschen" class="glypicon glyphicon-remove remove"></button></td>');
		row.append(createMatnoEl(matno, rowNumber));
		row.append(createCaptionEl(caption, rowNumber));
		row.append(createMpMatnoEl(mpMatno, rowNumber));
		row.append(createAssetIdEl(assetId, rowNumber));
		row.append($("<td>", {
			'headers' : "em-inid-typ-th"
		}));
		row.append(createIkEl(ik, rowNumber));
		row.append($("<td>", {
			'headers' : "em-inid-th"
		}));
		row.append($("<td>", {
			'headers' : "em-owner-th"
		}));
		return row;
	};
	var addLine = function(newLine, rowNumber, makeRowEditable) {
		var matno = "";
		var caption = "";
		var mpMatno = "";
		var assetId = "";
		var ik = "";
		/**
		 * @type jQuery
		 */
		var newJrow = createRow(rowNumber, matno, caption, mpMatno, assetId,
				ik, $(newLine));
		makeRowEditable(newJrow);
	};
	return addLine;
})();
var callnumAddLine = (function() {
	var createInputField = function(name, value, rowNumber, required,
			placeholder) {
		var tab = 'callNumbers';
		return _createInputField(name, value, rowNumber, required, tab,
				placeholder);
	}
	var createCallnumEl = function(paramId, rowNumber) {
		return $('<td>', {
			'headers' : 'callnum-callnum-th',
			'html' : createInputField("rnStruct", paramId, rowNumber, true,
					"+49-xxxxx-xxxxxxxxx")
		});
	}
	var createThnEl = function(isThn, rowNumber) {
		if (isThn) {
			value = "on";
		} else {
			value = "off";
		}
		return $('<td>', {
			'headers' : 'callnum-thn-th',
			'html' : $("<input type='checkbox' name='callNumbers[" + rowNumber
					+ "].isThn' id='callNumbers" + rowNumber + ".isThn1'>"
					+ "<input type='hidden' name='_callNumbers[" + rowNumber
					+ "].isThn' value='" + value + "' />", {
				checked : isThn
			})
		});
	}
	var createRow = function(rowNumber, callnum, isThn, row) {
		if (typeof row == 'undefined') {
			row = $("<tr>");
		}
		row
				.append('<td headers="callnum-buttons-th" class="buttons"><button title="Bearbeiten" type="button" class="glypicon glyphicon-pencil edit"></button> <button type="button" title="Löschen" class="glypicon glyphicon-remove remove"></button></td>');
		row.append(createCallnumEl(callnum, rowNumber));
		row.append(createThnEl(isThn, rowNumber));
		return row;
	};
	var addLine = function(newLine, rowNumber, makeRowEditable) {
		var callnum = "";
		var isThn = false;

		/**
		 * @type jQuery
		 */
		var newJrow = createRow(rowNumber, callnum, isThn, $(newLine));
		makeRowEditable(newJrow);
	};
	return addLine;
})();

var paramAddLine = (function() {
	var createInputField = function(name, value, rowNumber, required) {
		var tab = 'parameter';
		return _createInputField(name, value, rowNumber, required, tab);
	}
	var createParamIdEl = function(paramId, rowNumber) {
		return $('<td>', {
			'headers' : 'param-param-id-th',
			'html' : createInputField("paramId", paramId, rowNumber, true)
		});
	}
	var createCaptionEl = function(caption, rowNumber) {
		return $('<td>', {
			'headers' : 'param-caption-th',
			'html' : caption
		});
	}
	var createValueEl = function(value, rowNumber) {
		return $('<td>', {
			'headers' : 'em-mpmatno-th',
			'html' : createInputField('value', value, rowNumber, true)
		});
	}
	var createTargetSystemEl = function(targetSystem, rowNumber) {
		return $('<td>', {
			'headers' : 'em-assetid-th',
			'html' : targetSystem
		});
	}
	var createDestinationFieldEl = function(destinationField, rowNumber) {
		return $('<td>', {
			'headers' : 'em-ik-th',
			'html' : destinationField
		});
	}
	var createRow = function(rowNumber, paramId, value, caption, targetSystem,
			destinationField, row) {
		if (typeof row == 'undefined') {
			row = $("<tr>");
		}
		row
				.append('<td headers="param-buttons-th" class="buttons"><button title="Bearbeiten" type="button" class="glypicon glyphicon-pencil edit"></button> <button type="button" title="Löschen" class="glypicon glyphicon-remove remove"></button></td>');
		row.append(createParamIdEl(paramId, rowNumber));
		row.append(createCaptionEl(caption, rowNumber));
		row.append(createValueEl(value, rowNumber));
		row.append(createTargetSystemEl(targetSystem, rowNumber));
		row.append(createDestinationFieldEl(destinationField, rowNumber));
		return row;
	};
	var addLine = function(newLine, rowNumber, makeRowEditable) {
		var paramId = "";
		var value = "";
		var caption = "";
		var targetSystem = "";
		var destinationField = "";
		/**
		 * @type jQuery
		 */
		var newJrow = createRow(rowNumber, paramId, value, caption,
				targetSystem, destinationField, $(newLine));
		makeRowEditable(newJrow);
	};
	return addLine;
})();

var suspensionAddLine = (function() {
	var createInputField = function(name, value, rowNumber, required) {
		var tab = 'suspensions';
		return _createInputField(name, value, rowNumber, required, tab);
	}
	var createSuspGroupEl = function(suspGroup, rowNumber) {
		return $('<td>', {
			'headers' : 'susp-susp-group-th',
			'html' : createInputField("sperrGrp", suspGroup, rowNumber, true)
		});
	}
	var createCaptionEl = function(caption, rowNumber) {
		return $('<td>', {
			'headers' : 'susp-caption-th',
			'html' : caption
		});
	}
	var createSuspTypeEl = function(suspType, rowNumber) {
		return $('<td>', {
			'headers' : 'susp-type-th',
			'html' : ""
		});
	}
	var createSuspScopeEl = function(suspScope, rowNumber) {
		return $('<td>', {
			'headers' : 'susp-type-th',
			'html' : ""
		});
	}
	var createRow = function(suspGroup, caption, suspType, suspScope,
			rowNumber, row) {
		if (typeof row == 'undefined') {
			row = $("<tr>");
		}
		row
				.append('<td headers="callnum-buttons-th" class="buttons"><button title="Bearbeiten" type="button" class="glypicon glyphicon-pencil edit"></button> <button type="button" title="Löschen" class="glypicon glyphicon-remove remove"></button></td>');
		row.append(createSuspGroupEl(suspGroup, rowNumber));
		row.append(createCaptionEl(caption, rowNumber));
		row.append(createSuspTypeEl(suspType, rowNumber));
		row.append(createSuspScopeEl(suspScope, rowNumber));
		return row;
	};
	var addLine = function(newLine, rowNumber, makeRowEditable) {
		console.log("new");
		var suspGroup = "";
		var suspType = "";
		var suspScope = "";
		var caption = "";

		/**
		 * @type jQuery
		 */
		var newJrow = createRow(suspGroup, caption, suspType, suspScope,
				rowNumber, $(newLine));
		makeRowEditable(newJrow);
	};
	return addLine;
})();

$(function() {
	var emSelectSwitch = function(row, option) {
		var selectBoxColumn = row.find("td[headers='em-matno-th']");
		if (selectBoxColumn.children().length) {
			selectBoxColumn.find(":first-child").val(option.emMatno);
		} else {
			selectBoxColumn.val(option.id);
		}
		row.find("td[headers='em-caption-th']:first").text(option.caption);
	}
	emEditor.init("#ems", emSelectOptions, "em-matno-th", "em-caption-th",
			emAddLine, emSelectSwitch);
	var paramSelectSwitch = function(row, option) {
		console.log(option);
		row.find("td[headers='param-param-id-th'] input").val(option.paramId);
		row.find("td[headers='param-caption-th']").text(option.caption);
		row.find("td[headers='param-target-system-th']").text(
				option.targetSystem);
		row.find("td[headers='param-destination-field-th']").text(
				option.destinationField);
	}
	paramEditor.init("#parameters", paramSelectOptions, "param-param-id-th",
			"param-caption-th", paramAddLine, paramSelectSwitch);

	callnumEditor.init("#callnums", null, null, null, callnumAddLine, null);

	var suspensionSelectSwitch = function(row, option) {
		console.log(option);
		row.find("td[headers='susp-susp-group-th'] input").val(
				option.suspGroupId);
		row.find("td[headers='susp-caption-th']").text(option.caption);
		row.find("td[headers='susp-type-th']").text(option.suspType);
		row.find("td[headers='susp-scope-th']").text(option.suspScope);
	}
	suspensionEditor.init("#suspensions", suspensionGroupOptions,
			"susp-susp-group-th", "susp-caption-th", suspensionAddLine,
			suspensionSelectSwitch);

	var form = $("form.stockCreation");
	var stockWrapper = $("#stock");
	var validateSuccesfullWrapper = $("#validateSuccess");
	var orderIdMiscInputField = $("#misc");
	var toggleForm = function() {
		stockWrapper.toggle();
		validateSuccesfullWrapper.toggle();
		var orderIdMiscFieldVisible = validateSuccesfullWrapper.is(":visible");
		orderIdMiscInputField.prop("disabled", !orderIdMiscFieldVisible);
	};

	$('#backToEdit').click(toggleForm);

	var currentMessageBox = null;
	/**
	 * possible types: success,info,warning,danger
	 */
	var showMessage = function(type, message) {
		if (currentMessageBox != null) {
			currentMessageBox.detach();
		}
		var alertType = "alert-" + type;
		var messageWrapper = $('<div aria-describedBy="message-body" class="alert alert-dismissable alert-block '
				+ alertType + '" role="alertdialog"></div>');
		var button = $('<button autofocus="autofocus" type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Schlie&szlig;en</span></button>');
		var messageBody = $('<p>', {
			html : message,
			id : "message-body"
		});
		var html = messageWrapper.append(button).append(messageBody);
		var test = $("#content").prepend(html);
		currentMessageBox = html;
		$('html, body').animate({
			scrollTop : html.offset().top
		}, 'slow');
	};
	var weiterButton = $("#submitStock");
	var jaButton = $("#saveAndPersistForm");
	var isValidationSubmission = function() {
		return !validateSuccesfullWrapper.is(":visible");
	};

	function isFormSubmitable() {
		return (emEditor.isFormSubmitable() && paramEditor.isFormSubmitable()
				&& callnumEditor.isFormSubmitable() && suspensionEditor
				.isFormSubmitable())
	}
	function normalizeIndexes() {
		emEditor.resetFormIndexes();
		paramEditor.resetFormIndexes();
		callnumEditor.resetFormIndexes();
		suspensionEditor.resetFormIndexes();
	}
	;
	var submiStockButton = $("#submitStock");
	submiStockButton.attr({
		// "data-toggle":"test",
		"data-placement" : "top",
		title : formInEditMessage
	}).tooltip({
		"trigger" : "manual"
	});
	var showFormsubmitError = function(msg) {
		submiStockButton.attr({
			title : formInEditMessage
		});
		submiStockButton.tooltip("show");
	};
	var hideFormsubmitError = function() {
		submiStockButton.tooltip("hide");
	}
	emEditor.onExitEditMode(hideFormsubmitError);
	paramEditor.onExitEditMode(hideFormsubmitError);
	callnumEditor.onExitEditMode(hideFormsubmitError);
	suspensionEditor.onExitEditMode(hideFormsubmitError);
	form.submit(function(event) {
		if (isFormSubmitable()) {
			hideFormsubmitError();
			var that = $(this);
			var formData = that.serializeArray();
			if (isValidationSubmission()) {
				$.post("/idma-callcenter/stockcreation/stockvalidation",
						formData).done(function(data, textStatus, jqXHR) {
					// test if response isn't login page or another page
					if (data == validateOkResponse) {
						toggleForm();
					} else {
						showMessage("danger", errorWhenLoggedOut);
					}
				}).fail(function(jqXHR, textStatus, errorThrown) {
					var errorMessage = jqXHR.responseText;
					showMessage("danger", errorMessage);
				});
				event.preventDefault();
			} else {
				// Wenn bereits validiert, wird nur noch die order id vom user
				// eingegeben und dann wird die form normal gesendet
			}
		} else {
			// Elemente sind noch im bearbeiten modus
			showFormsubmitError()
			event.preventDefault();
		}

		// var requiredInputs = that.find("input[required]");
		// var allRequiredSet = true;
		// requiredInputs.each(function(idx,element){
		// if(typeof element.value == "string" && element.value.length > 0){
		// }else{
		// allRequiredSet = false;
		// return false;
		// }
		// });

	});
	// init:
	// function(tableSelector,selectOptions,selectBoxColumnHeader,captionColumnHeader,addLinefn,selectBoxToggleFn){
})