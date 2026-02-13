import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
const mockProduct = {
  id: 1,
  title: "Industrial Jacket",
  price: 99.99,
  category: "men's clothing",
  image: "https://via.placeholder.com/150",
  description: "A very durable jacket",
};

describe("ProductCard Component", () => {
  it("harus merender judul produk dengan benar", () => {
    render(<ProductCard product={mockProduct} />);
    const titleElement = screen.getByText(/Industrial Jacket/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("harus menampilkan harga dengan format mata uang yang tepat", () => {
    render(<ProductCard product={mockProduct} />);
    const priceElement = screen.getByText(/\$99.99/);
    expect(priceElement).toBeInTheDocument();
  });

  it("harus memiliki atribut src yang benar pada gambar", () => {
    render(<ProductCard product={mockProduct} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", mockProduct.image);
  });
});
