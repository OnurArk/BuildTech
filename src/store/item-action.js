import { itemActions } from './item-slice';
export const fetchItemsData = () => {
  return async (dispatch) => {
    const url = 'https://[YOUR-ADRESS]/items.json';

    const fetchData = async () => {
      const reponse = await fetch(url);

      if (!reponse.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await reponse.json();

      return data;
    };

    try {
      const itemData = await fetchData();

      const items = [];

      for (let key in itemData) {
        items.push({
          id: key,
          img: itemData[key].img,
          name: itemData[key].name,
          price: itemData[key].price,
          type: itemData[key].type,
          images: itemData[key].images,
          features: itemData[key].features,
        });
      }

      dispatch(itemActions.replaceItem(items || []));
    } catch (err) {
      console.log(err);
    }
  };
};
