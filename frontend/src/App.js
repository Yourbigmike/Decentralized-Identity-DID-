import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress, Container } from '@mui/material';
import Navbar from './components/Navbar';
import { WalletProvider } from './contexts/WalletContext'; // Assuming exists, adjust if needed
import ErrorDisplay from './components/ErrorDisplay'; // Optional

// Lazy load all pages to enable code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateDID = lazy(() => import('./pages/CreateDID'));
const ResolveDID = lazy(() => import('./pages/ResolveDID'));
const Credentials = lazy(() => import('./pages/Credentials'));
const Account = lazy(() => import('./pages/Account'));
const Contracts = lazy(() => import('./pages/Contracts'));
const Scanner = lazy(() => import('./pages/Scanner'));

// MUI Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#667eea' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="60vh"
    flexDirection="column"
    gap={2}
  >
    <CircularProgress size={40} />
    <div>Loading page...</div>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider> {/* Wrap for context */}
        <Router>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, py: 3 }} id="main-content">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-did" element={<CreateDID />} />
                  <Route path="/resolve-did" element={<ResolveDID />} />
                  <Route path="/credentials" element={<Credentials />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/contracts" element={<Contracts />} />
                  <Route path="/scanner" element={<Scanner />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Box>
          </Box>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;

