import './App.css';
import { Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import MyCart from './components/MyCart';
import PlaceOrder from './components/PlaceOrder';
import Wishlist from './components/Wishlist';
import { Provider } from "react-redux"
import store from './redux/store'; 
import AuthRoute from './components/Router/AuthRoute';
import ProtectedRoute from './components/Router/ProtectedRoute';

function App() {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <AuthRoute exact path="/" component={LandingPage} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute exact path="/home/mycart" component={MyCart} />
          <ProtectedRoute exact path="/home/placeorder" component={PlaceOrder} />  
          <ProtectedRoute exact path="/home/wishlist" component={Wishlist}/>
        </Switch>
      </Provider>  
    </>
  );
}

export default App;
