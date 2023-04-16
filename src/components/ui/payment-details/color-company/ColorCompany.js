import { useState } from 'react';

const ColorCompany = (propfileCtx) => {
  const [logo, setLogo] = useState();
  const [background, setBackground] = useState({});

  const companyFilter = (number) => {
    if (number.startsWith('4026') || number.startsWith('417500')) {
      //Visa Electron
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254513/visaelectron-icon-md.png';
      filterProfile('#F0F4EF', '#B4CDED', 'black', 'rgba(0, 0, 0, 0.75)');
      setLogo(url);
      return;
    }

    if (number.startsWith('50') || number.startsWith('56')) {
      //Maestro
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254049/maestro-icon-md.png';
      filterProfile('#F9A03F', 'rgb(239, 108, 0)');
      setLogo(url);
      return;
    }

    if (number.startsWith('62')) {
      //Unionpay
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3197781/unionpay-icon-md.png';
      filterProfile('#1A2E40', '#D4AF37');
      setLogo(url);
      return;
    }

    if (number.startsWith('5') || number.startsWith('2')) {
      //Mastercard
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3197778/mastercard-icon-md.png';
      filterProfile('rgb(57, 27, 112)', 'black');
      setLogo(url);
      return;
    }

    if (number.startsWith('4')) {
      //Visa
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3197782/visa-icon-md.png';
      filterProfile('#05B2DC', '#21295C');
      setLogo(url);
      return;
    }
    if (number.startsWith('6')) {
      //Discover
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3253689/discover-icon-md.png';
      filterProfile('rgb(49, 62, 69)', '#536871');
      setLogo(url);
      return;
    }

    if (number.startsWith('3')) {
      //JCB
      const url =
        'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3197776/jcb-icon-md.png';
      filterProfile('#004B8D', '#a5a5a5');
      setLogo(url);
      return;
    }

    // Undifined Card
    setBackground({});
    propfileCtx.backgroundHandler({});
    setLogo();
  };

  const filterProfile = (backgoundCard, backgoundWave, color, colorText) => {
    const background = {
      backgoundCard: backgoundCard,
      backgoundWave: backgoundWave,
      colorText: colorText ? colorText : null,
    };
    const contextBackground = {
      backgroundImage: `linear-gradient(45deg, ${backgoundCard},${backgoundWave})`,
      color: color ? color : null,
    };
    propfileCtx.backgroundHandler(contextBackground);
    setBackground(background);
    return;
  };

  return { logo, background, companyFilter };
};

export default ColorCompany;
