// Test ID: IIDSAT

import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

export default function Order() {
  /*
  useLoaderData custom hook is used to get the returned value from
  the loader below
  */
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  function getPizzaIngredients(id) {
    const pizzaIngredients = fetcher?.data?.find((pizza) => {
      return pizza.id === id;
    });
    return pizzaIngredients?.ingredients ?? [];
  }

  /*
  Everyone can search for all orders, so for privacy reasons
  we're gonna gonna exclude names or address, these are only for
  the restaurant staff
  */

  /*
  We destructure the details of the latest order
  */
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span
              className="rounded-full bg-red-500 px-3 py-1 text-sm
            font-semibold uppercase tracking-wide text-red-50"
            >
              Priority
            </span>
          )}
          <span
            className="rounded-full bg-green-500 px-3 py-1 text-sm
            font-semibold uppercase tracking-wide text-green-50"
          >
            {status} order
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center
      justify-between gap-4 bg-stone-200 px-6 py-5"
      >
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-slate-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className=" space-y-2 divide-y divide-stone-200">
        {cart?.map((item) => {
          return (
            <OrderItem
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state}
              ingredients={() => getPizzaIngredients(item.pizzaId)}
              item={item}
            />
          );
        })}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {/*
      If the current order is not a priority, show the UpdateOrder
      component, we pass the whole order details in the order prop
       */}
      {!priority && <UpdateOrder order={order}>Make Priority</UpdateOrder>}
    </div>
  );
}

/*
/////////////////////////////////////[loader explanation]
1. The loader will be automatically executed onmount
2. The loader has access to the params through its object destruct 
   paramater
3. In the CreateOrder component, we redirects the page to the latest
   order, which makes the param has the id of the latest order
4. In the loader below, we access the params and use the getOrder
   function to get the details of the latest order and put it into
   order variable
5. getOrder function expects one param
6. Finally we return the order

*/
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  console.log(order);
  console.log(params);
  return order;
}

// loader();
