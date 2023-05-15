import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./helpers/protectedRoute";
import { getCurrentUser } from "./helpers/setGet";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Home from "./scenes/home";
import Invoices from "./scenes/invoices";
import Login from "./scenes/login";
import Transactions from "./scenes/transaction";
import User from "./scenes/user";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const user = getCurrentUser();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          { user ? <Sidebar isSidebar={isSidebar} /> : null }
          <main className="content">
            { user ? <Topbar setIsSidebar={setIsSidebar} /> : null }
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  !user ?
                  <Login /> :
                  <Navigate replace to={"/"} />
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute user={user}>
                    <User />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute user={user}>
                    <Invoices />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute user={user}>
                    <Transactions />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute user={user}>
                    <Home />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
