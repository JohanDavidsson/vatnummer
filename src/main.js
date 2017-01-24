let orgNumberInput, vatNumberElements;

function onOrgNumberChange(value) {
	if (isOrgNumber(value)) {
		showVatNumber(value);
	} else {
		clearVatNumber();
	}
}

function showVatNumber(value) {
	let vatNumber = 'SE' + formatOrgNumber(value) + '01';
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
	let orgNumberEntryLength = formatOrgNumber(value).length;
	return (orgNumberEntryLength === 10);
}

function clearVatNumber() {
	valueToVatNumberElements('');
}

function valueToVatNumberElements(value) {
	vatNumberElements.forEach(element => {
		element.innerHTML = value;
	});
}

function init() {
	orgNumberInput = document.querySelector('#orgNumber');
	vatNumberElements = document.querySelectorAll('.insert-vat-number');

	orgNumberInput.addEventListener('input', e => { 
		onOrgNumberChange(e.target.value); 
	});
}

init();