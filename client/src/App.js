import { Provider } from "./components/ui/provider";
import ProductsScreen from './screens/ProductsScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import ThemeProvider from "./components/ThemeProvider";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider>
      <ThemeProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path='/products' element={<ProductsScreen />} />
              <Route path='/' element={<LandingScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/login' element={<LoginScreen />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider> 
    </Provider>
  )
}

export default App;
