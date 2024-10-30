import './App.css';
import ImageUploader from './components/ImageUploader';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Recommendation from './components/Recommendation';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<ImageUploader/>}/>
        <Route path='/recommendations' element={<Recommendation/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
