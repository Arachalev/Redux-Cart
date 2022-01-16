import  {uiActions}  from "./ui-slice";
import { cartActions } from "./cart-slice";
// import { useDispatch } from "react-redux";

export const sendCartData = (cart) => {
    // const dispatch = useDispatch()
    // console.log('helloooooooooooooooo' )


  return async (dispatch) => {
    // const dispatch = useDispatch()
    // console.log('helloooooooooooooooo' )
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-test-project-8d041-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error in sending cart data");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "sent cart data successfuly!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error in sending cart data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
    // console.log('helloooooooooooooooo' )

  return async (dispatch) => {
    // console.log('helloooooooooooooooo' )

    const fetchData = async () => {
      const response = await fetch(
        "https://redux-test-project-8d041-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Couldn't fetch cart data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Error in fetching cart data",
        })
      );
    }
  };
};
