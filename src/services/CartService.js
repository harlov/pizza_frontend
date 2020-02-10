import Api from "../Api";
import Events from "../events";
const CartUIDKey = "PIZZA_CART_ID";


class CartService {
    getOrCreateCartId () {
        return new Promise((resolve, reject) => {
            let cartUID = localStorage.getItem(CartUIDKey);
            if (cartUID == null) {
                Api.put("/cart", {}).then(
                (result) => {
                    localStorage.setItem(CartUIDKey, result.uid);
                    resolve(result.uid);
                }
                );
            } else {
                resolve(cartUID);
            }
        });
    }

    getActiveCart() {
        return this.getOrCreateCartId().then((cartUID) => {
           return Api.get("/cart/" + cartUID);
        });
    }

    addItemToActiveCart(menuItemUID, quantity) {
        return this.getOrCreateCartId().then((cartUID) => {
           Api.put("/cart/" + cartUID + "/items", {
               "menu_item_uid": menuItemUID,
               "quantity": quantity,
           }).then((result) => {
               console.log("item added to cart!");
               Events.EventsEmitter.dispatch(Events.EVENT_ACTIVE_CART_UPDATED);
           })
        });
    }
}

const cartService = new CartService();

export default cartService;
