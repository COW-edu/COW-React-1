import './App.css';
import Join from './components/Join';
import { Routes, Route } from 'react-router-dom';
import Search from './Pages/Search';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element = {<MainPage/>}/>
        <Route path='/join' element= {<Join/>}/>
        <Route path='/search' element = {<Search/>}/>
      </Routes>
    </div>
    
    
  );  
}

export default App;
