import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = [
  {
    _id: "3",
    name: "Classic Leather Jacket",
    price: "$89.99",
    images: [{ url: "https://picsum.photos/300/400?random=7", altText: "Classic Leather Jacket" }],
  },
  {
    _id: "4",
    name: "Denim Jacket",
    price: "$59.99",
    images: [{ url: "https://picsum.photos/300/400?random=8", altText: "Denim Jacket" }],
  },
  {
    _id: "5",
    name: "Bomber Jacket",
    price: "$79.99",
    images: [{ url: "https://picsum.photos/300/400?random=9", altText: "Bomber Jacket" }],
  },
];

const Home = () => {
  return (
    <div className="container mx-auto px-4">

      {/* Top Rated */}
      <h2 className="text-3xl text-center font-bold mt-10 mb-4">
        Top Rated Products
      </h2>
      <ProductGrid products={placeholderProducts} />

    </div>
  );
};

export default Home;