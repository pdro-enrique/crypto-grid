import './App.css';
import { Grid } from './pages';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainLayout } from './layouts';
import { StoreProvider } from './store';

const App = () => {
  const GridPage = () => (
    <MainLayout>
      <Grid/>
    </MainLayout>
  );

  return (
    <div className="app">
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GridPage/>} />
            <Route path="/:action" element={<GridPage/>} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
