//reformat price and assign to a reactive variable
export const priceFormatter = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'EUR'
});
