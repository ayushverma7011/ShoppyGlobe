import { Provider } from "react-redux";
import store from "./utils/store";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App(){
  return(
    <Provider store= {store}>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  )
}
export default App;