export const formatCurrency = (number: number) => {
    const CURRENCY_FORMATTER = new Intl.NumberFormat('en-EG', {
      currency: 'EGP',
      style: 'currency',
    });
    return CURRENCY_FORMATTER.format(number);
  };