import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { fetchCartAsync } from "../../features/cart/cartSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(true);
  const paletteType = darkMode ? "dark" : "light";

  // Implemented Dark Mode using Material-UI.
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212"
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-center" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      {loading ? <LoadingComponent message="Initializing App..."/>
        : location.pathname === "/" ? <HomePage />
        : <Container sx={{mt: 4}}>
            <Outlet />
          </Container>
      }
      
    </ThemeProvider>
  );
}

export default App
