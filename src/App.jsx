import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import Landing from './pages/Landing';
import EditorPage from './pages/EditorPage';
import ViewerPage from './pages/ViewerPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text flex flex-col font-sans transition-colors duration-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/viewer" element={<ViewerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
