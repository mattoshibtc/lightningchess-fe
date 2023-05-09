import './App.css';

import React, { useContext } from 'react'

import Dashboard from './components/Dashboard'
import Faq from './components/Faq'
import Welcome from './components/Welcome'
import Games from './components/Games'
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header'
import Wallet from './components/wallet/Wallet'
import { AuthProvider, AuthContext } from './contexts/Auth'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#4c8ec2',
        main: '#006191',
        dark: '#003763',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffff70',
        main: '#f7de3a',
        dark: '#c0ad00',
        contrastText: '#000',
      },
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Header/>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>} 
            />
            <Route path="/money" element={
              <RequireAuth>
                <Wallet />
              </RequireAuth>}
            />
            <Route path="/games" element={
              <RequireAuth>
                <Games />
              </RequireAuth>}
            />
            <Route path="/faq" element={<Faq />}/>
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

function RequireAuth({ children }) {
  const userProfile = useContext(AuthContext)

  if (!userProfile || !userProfile.username) {
    return <Navigate to="/"/>
  }

  return children;
}

export default App;
