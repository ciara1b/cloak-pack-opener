import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from './components/Header.jsx';
import PackOpener from './pages/PackOpener.jsx';
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<PackOpener />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
