
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from '../src/components/home/Home';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>}></Route>
          <Route path='/Login'  element={<Login/>}></Route>
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
