import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeedBackFormLog from './components/feedBackFormComp/FeedBackFormLog';
function App() {
  return (
    <BrowserRouter>
      <div className='desktop-web'>
        <header />
        <Routes>
          {/* <Route path='/survey' element={<FeedBackFormLog/>}></Route> */}
          <Route path='/' element={<FeedBackFormLog/>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
