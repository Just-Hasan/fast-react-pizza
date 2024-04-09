import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../Store";
import { useState } from "react";
import { fetchAddress, getUserDetails } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const state = useNavigation();
  const formErrors = useActionData();
  const {
    username,
    position,
    status,
    error: errorAdress,
    address,
  } = useSelector(getUserDetails);
  const userDetails = useSelector(getUserDetails);
  console.log(userDetails);
  const isLoadingAdress = status === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = 0.2 * totalCartPrice;
  const totalPrice = withPriority
    ? totalCartPrice + priorityPrice
    : totalCartPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-8 md:px-0">
      <h2 className="my-8 text-xl font-semibold ">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div
          className="mb-5 flex flex-col
        gap-2 sm:flex-row sm:items-center"
        >
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            required
            defaultValue={username}
          />
        </div>

        {/* name will be the property of the value of this element,
            when it's received */}
        <div
          className={`mb-5 flex flex-col
        gap-2 sm:flex-row  ${formErrors?.phone ? "sm:items-start" : "sm:items-center"}`}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="text" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className={`relative mb-5 flex
        flex-col gap-2 sm:flex-row ${errorAdress ? "items-start" : "items-center"}`}
        >
          <label
            className={`${errorAdress && "justify-self-start"} sm:basis-40`}
          >
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAdress}
              defaultValue={address}
              className="input w-full"
            />
            {status === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {errorAdress}
              </p>
            )}
          </div>
          {/* If we already latitude & longitude then hide the btn */}
          {!position.latitude && !position.longitude && (
            <span
              className={`absolute right-[5px] z-50 ${errorAdress && "top-[5px]"}`}
            >
              <Button
                type={"small"}
                disabled={isLoadingAdress}
                onClick={(e) => {
                  /*
                  /////////////////////////////////////[Explanation]
                  1. When we click the getPosition button
                  2. The fetchAdress thunk function will be dispatch
                  */
                  e.preventDefault();
                  dispatch(
                    fetchAddress({
                      firstName: "Violet",
                      lastName: "Everagrden",
                    }),
                  );
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400
            transition-all duration-300
              ease-in-out focus:outline-none focus:ring
              focus:ring-yellow-500 focus:ring-offset-2"
            defaultValue={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="text"
            defaultValue={JSON.stringify(cart)}
            hidden
            name="cart"
          />
          <input
            type="text"
            name="position"
            hidden
            value={
              position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          ></input>
          <Button
            type="primary"
            disabled={state.state === "submitting" || isLoadingAdress}
          >
            {state.state === "submitting"
              ? "Placing Order"
              : `ORDER NOW FOR ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  // We gotta use the Object.fromEntries to get actual data from request.formData()
  const data = Object.fromEntries(formData);

  /*
  /////////////////////////////////////[Order explanation]
  1. Order is the object that we're going to send as a param
     in createOrder func
  2. Above in the hidden input text name cart, it has the value
     of JSON.stringfy(cart) 
  3. So what basically we're doing in the cart property is 
     overwriting it's value with the JSON.parse version of it's
     value
  4. Priority property will be either true / false
  */

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  /////////////////////////////////////[Handling Valid Phone Numbers]
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, we might need it to contact you";
  console.log(order);
  // Object.keys returns an array BTW
  if (Object.keys(errors).length > 0) return errors;

  //If everything is okay, create new order and redirects

  //Do NOT overuse / abuse
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
