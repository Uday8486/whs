import {
  BrowserRouter,
  Route,
  Routes as Switch
} from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { Container } from "react-bootstrap";
import Header from "../components/common/Header/Header";
import Home from "../components/pages/Home/Home";
import Products from "../components/pages/Products/Products";
import GlobalError from "../components/common/GlobalError/GlobalError";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Container fluid>

          <GlobalError />
          <Header />
          <Switch>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<Products/>} />
            {/** Navigate to home if */}
            <Route path="*" element={<NotFoundPage />}/>
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Routes;
