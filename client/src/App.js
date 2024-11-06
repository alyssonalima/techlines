import { Provider } from "./components/ui/provider";
import ProductsScreen from './screens/ProductsScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./components/Header";

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<ProductsScreen />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  )
}

export default App;
