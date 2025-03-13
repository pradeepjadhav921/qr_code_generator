import React from 'react';
import QRCodeWithStand from './qr_code/qr'; // Import the QR code component
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QRCodeWithStand /> {/* Add the QR code component here */}
      </header>
    </div>
  );
}

export default App;
