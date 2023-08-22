import './App.css';
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/navbar';
import Post from './pages/post/post';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/post' element={<Post />}/>
        {/* <Route path='/' element/>
        <Route path='/' element/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
