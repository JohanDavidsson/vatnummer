'use strict';

var orgNumberInput = void 0,
    vatNumberElements = void 0;

function onOrgNumberChange(value) {
	if (isOrgNumber(value)) {
		showVatNumber(value);
	} else {
		clearVatNumber();
	}
}

function showVatNumber(value) {
	var vatNumber = 'SE' + formatOrgNumber(value) + '01';
	valueToVatNumberElements(vatNumber);
}

function formatOrgNumber(value) {
	if (value) {
		return value.replace(/-/g, '');
	} else {
		return '';
	}
}

function isOrgNumber(value) {
	var orgNumberEntryLength = formatOrgNumber(value).length;
	return orgNumberEntryLength === 10;
}

function clearVatNumber() {
	valueToVatNumberElements('');
}

function valueToVatNumberElements(value) {
	vatNumberElements.forEach(function (element) {
		element.innerHTML = value;
	});
}

function init() {
	orgNumberInput = document.querySelector('#orgNumber');
	vatNumberElements = document.querySelectorAll('.insert-vat-number');

	orgNumberInput.addEventListener('input', function (e) {
		onOrgNumberChange(e.target.value);
	});
}

init();