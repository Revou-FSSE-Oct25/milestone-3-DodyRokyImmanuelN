import { Product } from "@/types/product";

export const addToCart = (product: Product) => {
  const savedCart = localStorage.getItem("cart");
  let cart = savedCart ? JSON.parse(savedCart) : [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${product.title} added to the bucket!`);
  console.log("Fill the bucket:", cart);
};
