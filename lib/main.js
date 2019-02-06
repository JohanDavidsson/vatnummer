'use strict';

var orgNumberInput = void 0,
    vatNumberElements = void 0,
    saveOrgNumberCheckbox = void 0;

function onOrgNumberChange(value) {
	if (isOrgNumber(value)) {
		showVatNumber(value);
	} else {
		clearVatNumber();
	}
}

var updateLocalStorage = function updateLocalStorage() {
	if (saveOrgNumberCheckbox.checked === true) {
		if (orgNumberInput.value && isOrgNumber(orgNumberInput.value)) {
			localStorage.setItem('orgNumber', orgNumberInput.value);
		}
	} else {
		localStorage.removeItem('orgNumber');
	}
};

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

var setOrgNumberFromLocalStorage = function setOrgNumberFromLocalStorage() {
	var orgNumber = localStorage.getItem('orgNumber');
	if (orgNumber && isOrgNumber(orgNumber)) {
		orgNumberInput.value = orgNumber;
		saveOrgNumberCheckbox.checked = true;
		onOrgNumberChange(orgNumber);
	}
};

function init() {
	orgNumberInput = document.querySelector('#orgNumber');
	saveOrgNumberCheckbox = document.querySelector('#saveOrgNumber');
	vatNumberElements = document.querySelectorAll('.insert-vat-number');

	orgNumberInput.addEventListener('input', function (e) {
		onOrgNumberChange(e.target.value);
		updateLocalStorage();
	});

	setOrgNumberFromLocalStorage();

	saveOrgNumberCheckbox.addEventListener('input', function (e) {
		updateLocalStorage();
	});
}

init();