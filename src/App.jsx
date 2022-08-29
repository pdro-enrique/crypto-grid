import './App.css';
import { Grid } from './pages';
import { MainLayout } from './layouts';

const App = () => {
  return (
    <div className="app">
      <MainLayout>
        <Grid/>
      </MainLayout>
    </div>
  );
}

export default App;
