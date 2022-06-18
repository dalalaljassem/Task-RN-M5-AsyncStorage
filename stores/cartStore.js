import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }
  addItem = async (item) => {
    this.items.push(item);
    await AsyncStorage.setItem("item", JSON.stringify(this.items));
  };

  getItemsCount() {
    return this.items.length;
  }
  getTotalPrice() {
    if (this.items.length === 0) {
      return 0;
    }
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItems = () => {
    return this.items;
  };

  fetchItems = async () => {
    try {
      const value = await AsyncStorage.getItem("item");
      if (value !== null) {
        this.items = JSON.parse(value);
        console.log(value);
      }
    } catch (e) {}
  };

  clearCart = async () => {
    try {
      this.items = [];
      await AsyncStorage.removeItem("item");
    } catch (exception) {
      return exception;
    }
  };
}

const cartStore = new CartStore();
cartStore.getItems();
export default cartStore;
