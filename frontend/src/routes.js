import { Routes, Route } from 'react-router-dom'
import App from './App.js';

function MyRoute() {

  return (
    <Routes>
      <Route path='/:idWallet' element={<App />} />
    </Routes>
  )
}

export default MyRoute;
