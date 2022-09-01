import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as Switch
} from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Header from "../components/common/Header/Header";
import Home from "../components/pages/Home/Home";
import Products from "../components/pages/Products/Products";
import { Container } from "react-bootstrap";

const Routes = () => {
  return (
    <BrowserRouter>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
        
      >
        <Container fluid>
          <Header />
          <Switch>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<Products/>} />
                 <Route path="*" element={<Navigate to ="/products" />}/>
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Routes;