export function isValidCNPJ(cnpj: string): boolean {
	const cnpjDigits = cnpj.replace(/[^\d]+/g, "");

	if (cnpjDigits.length !== 14) {
		return false;
	}

	// Validate first check digit
	let length = cnpjDigits.length - 2;
	let numbers = cnpjDigits.substring(0, length);
	const digits = cnpjDigits.substring(length);
	let sum = 0;
	let pos = length - 7;

	for (let i = length; i >= 1; i--) {
		sum += parseInt(numbers.charAt(length - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result !== parseInt(digits.charAt(0))) {
		return false;
	}

	// Validate second check digit
	length = length + 1;
	numbers = cnpjDigits.substring(0, length);
	sum = 0;
	pos = length - 7;

	for (let i = length; i >= 1; i--) {
		sum += parseInt(numbers.charAt(length - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result !== parseInt(digits.charAt(1))) {
		return false;
	}

	return true;
}
