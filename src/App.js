import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Header } from "./components/header";
import { HomePage } from "./pages/home-page";
import { GamePage } from "./pages/game-page";
import { OrderPage } from "./pages/order-page";
import { AuthPage } from "./pages/auth-page";
import { AdminPage } from "./pages/admin-page/admin-page";
import { EditPage } from "./pages/edit-page";
import { ProfilePage } from "./pages/profile-page";
import { MainPage } from "./pages/main-page/main-page";
import { BalancePage } from "./pages/balance-page/balance-page";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/order">
                <Header />
                <OrderPage />
              </Route>
              <Route exact path="/admin/:title">
                <Header />
                <EditPage />
              </Route>
              <Route exact path="/app/:title">
                <Header />
                <GamePage />
              </Route>
              <Route exact path="/home">
                <Header />
                <HomePage />
              </Route>
              <Route exact path="/auth">
                <Header />
                <AuthPage />
              </Route>
              <Route exact path="/admin">
                <Header />
                <AdminPage />
              </Route>
              <Route exact path="/profile">
                <Header />
                <ProfilePage />
              </Route>
              <Route exact path="/balance">
                <Header />
                <BalancePage />
              </Route>
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
