import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <AppRoutes /> {/* Renders defined routes */}
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </Router>
  );
}

export default App;
