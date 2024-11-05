import { Provider } from "./components/ui/provider";
import ProductsScreen from './screens/ProductsScreen';

function App() {
  return <Provider>
    <ProductsScreen />
  </Provider>;
}

export default App;
