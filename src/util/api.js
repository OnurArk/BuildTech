const api = () => {
  const requestFetch = async (requestConfig) => {
    try {
      const response = await fetch(
        `https://pcbuilder-items-default-rtdb.firebaseio.com/${requestConfig.adress}`,
        {
          merhod: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.header ? requestConfig.header : {},
        }
      );

      if (!response.ok) {
        throw new Error("Response Failed");
      }

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { requestFetch };
};

export default api;

// export async function getPosts() {
//   const response = await fetch(
//     "https://pcbuilder-items-default-rtdb.firebaseio.com/items.json"
//   );
//   if (!response.ok) {
//     throw { message: "Failed to fetch posts.", status: 500 };
//   }
//   return response.json();
// }
