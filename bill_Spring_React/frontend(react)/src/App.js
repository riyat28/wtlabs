import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './pages/home';
import { Bill } from './pages/bill'
import { Navbar } from './layout/navbar'
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<></>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/bill" element={<Bill />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
