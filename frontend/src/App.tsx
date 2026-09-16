import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlacesPage from './pages/PlacesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import PlaceDetailsPage from './pages/PlaceDetailsPage';
import ExplorePage from './pages/ExplorePage';
import GraphPage from './pages/GraphPage';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/places/:id" element={<PlaceDetailsPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
