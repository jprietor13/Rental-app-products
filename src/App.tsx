import { useProducts } from "./hooks/useProducts";

function App() {
  const { data } = useProducts();
  console.log("🚀 ~ App ~ data:", data);

  return <h1>Rental app products</h1>;
}

export default App;
