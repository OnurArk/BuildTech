import { useState } from 'react';

const CardInputChange = (companyFilter) => {
  const [numericVal, setNumericVal] = useState('');
  const [expiryVal, setExpiryVal] = useState('');
  const [securityVal, setSecurityVal] = useState('');
  const [nameVal, setNameVal] = useState('');

  //Card Number Section

  const onlyNumber = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // remove all non-digit characters
    value = value.slice(0, 16); // limit to 16 characters
    setNumericVal(value);
    companyFilter(value);
  };

  const formatCardNumber = (cardNumber) => {
    const formattedNumber = cardNumber.replace(/(.{4})/g, '$1 ');
    return formattedNumber.trim();
  };

  // Expiration (mm/yy) section

  const formatExpiry = (expiry) => {
    let formattedExpiry = expiry.replace(/\D/g, ''); // remove all non-digit characters
    if (formattedExpiry.length > 2) {
      formattedExpiry = `${formattedExpiry.slice(0, 2)}/${formattedExpiry.slice(
        2
      )}`;
    }
    return formattedExpiry;
  };

  const handleExpiryChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // remove all non-digit characters
    value = value.slice(0, 4); // limit to 4 characters
    let month = value.slice(0, 2);
    let year = value.slice(2, 4); // get the next two characters (year)
    if (month === '00') {
      value = '0';
    } else if (month > 12) {
      value = '12'; // limit the month to 12
    } else if (month.length === 2 && year.length === 2) {
      value = `${month}/${year}`; // add the slash between month and year
    }
    value = formatExpiry(value);
    setExpiryVal(value);
  };

  // Security Code Section

  const handleSecurityCodeChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    setSecurityVal(value);
  };

  // Name Section

  const nameHandlerChange = (event) => {
    const value = event.target.value;
    const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '');
    const name = onlyLetters.split(' ');

    const capitalizedWords = name.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    const formattedValue = capitalizedWords.join(' ');
    setNameVal(formattedValue);
  };

  return {
    onlyNumber,
    formatCardNumber,
    handleExpiryChange,
    handleSecurityCodeChange,
    nameHandlerChange,
    numericVal,
    expiryVal,
    securityVal,
    nameVal,
  };
};

export default CardInputChange;
