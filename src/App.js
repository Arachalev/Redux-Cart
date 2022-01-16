import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products items={cart} />
      </Layout>
    </Fragment>
  );
}

export default App;

// useEffect(() => {
// const sendCartData = async () => {
// dispatch(
//   uiActions.showNotification({
//     status: "pending",
//     title: "sending...",
//     message: "sending cart data!",
//   })
// );
//   const response = await fetch(
//     "https://redux-test-project-8d041-default-rtdb.firebaseio.com/cart.json",
//     { method: "PUT", body: JSON.stringify(cart) }
//   );
//   if (!response.ok) {
//     throw new Error("Error in sending cart data");
//   }
//   dispatch(
//     uiActions.showNotification({
//       status: "success",
//       title: "success",
//       message: "sent cart data successfuly!",
//     })
//   );
// };

// if(isInitial)
// {
//   isInitial = false
//   return
// }

// sendCartData().catch((error) => {
//   dispatch(
//     uiActions.showNotification({
//       status: "error",
//       title: "Error",
//       message: "Error in sending cart data",
//     })
//   );
// });
// },[]);
