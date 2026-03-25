import { Layout } from "./layout/Layout";
import { AppRouter } from "./routes/AppRouter";
import { CartRestoreDialog } from "./components/CartRestoreDialog";

function App() {
  return (
    <>
      <CartRestoreDialog />
      <Layout>
        <AppRouter />
      </Layout>
    </>
  );
}

export default App;
