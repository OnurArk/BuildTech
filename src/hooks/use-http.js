import { useCallback } from 'react';

const useHttp = () => {
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(requestConfig.url, {
        merhod: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.header ? requestConfig.header : {},
      });

      if (!response.ok) {
        throw new Error('Response Failed');
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      console.log(err.message || 'Something Went Wrong!');
    }
  }, []);
  return { sendRequest };
};

export default useHttp;

// export async function getPosts() {
//   const response = await fetch(
//     "https://[YOUR-ADRESS]/items.json"
//   );
//   if (!response.ok) {
//     throw { message: "Failed to fetch posts.", status: 500 };
//   }
//   return response.json();
// }
