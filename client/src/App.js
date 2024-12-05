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
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

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
              <Route path='/registration' element={<RegistrationScreen />} />
              <Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
              <Route path='/password-reset/:token' element={<PasswordResetScreen />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider> 
    </Provider>
  )
}

export default App;
