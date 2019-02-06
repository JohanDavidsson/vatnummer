let orgNumberInput, vatNumberElements, saveOrgNumberCheckbox;

function onOrgNumberChange(value) {
	if (isOrgNumber(value)) {
		showVatNumber(value);
	} else {
		clearVatNumber();
	}
}

const updateLocalStorage = () => {
	if (saveOrgNumberCheckbox.checked === true) {
		if (orgNumberInput.value && isOrgNumber(orgNumberInput.value)) {
			localStorage.setItem('orgNumber', orgNumberInput.value);
		}
	} else {
		localStorage.removeItem('orgNumber');
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

const setOrgNumberFromLocalStorage = () => {
	const orgNumber = localStorage.getItem('orgNumber');
	if (orgNumber && isOrgNumber(orgNumber)) {
		orgNumberInput.value = orgNumber;
		saveOrgNumberCheckbox.checked = true;
		onOrgNumberChange(orgNumber);
	}
}

function init() {
	orgNumberInput = document.querySelector('#orgNumber');
	saveOrgNumberCheckbox = document.querySelector('#saveOrgNumber');
	vatNumberElements = document.querySelectorAll('.insert-vat-number');

	orgNumberInput.addEventListener('input', e => { 
		onOrgNumberChange(e.target.value); 
		updateLocalStorage();
	});

	setOrgNumberFromLocalStorage();

	saveOrgNumberCheckbox.addEventListener('input', e => { 
		updateLocalStorage(); 
	});
}

init();