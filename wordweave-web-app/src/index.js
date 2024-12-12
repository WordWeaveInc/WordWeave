import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import './styles/index.css';
import App from './App';
// import Homepage from './Homepage';
// import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ROUTER CODE (commented out for now)
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About</Link></li>
//             <li><Link to="/game">Play Game</Link></li> {/* New Link for the Game */}
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/game" element={<App />} /> {/* New Route for the Game */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   </React.StrictMode>
// );