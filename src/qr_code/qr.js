import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import './qr.css';

const QRCodeWithStand = () => {
  const [qrurl, setQrurl] = useState(''); // State to store user input URL
  const [generatedUrl, setGeneratedUrl] = useState(''); // State to store the URL for the QR code
  const qrphoto = process.env.PUBLIC_URL + 'assets/Menu.png';
  const qrCodeRef = useRef(null);

  const handleGenerate = () => {
    if (qrurl.trim() === '') {
      alert('Please enter a valid URL.');
      return;
    }
    setGeneratedUrl(qrurl); // Set the URL for the QR code
  };

  const handleDownload = () => {
    if (qrCodeRef.current === null || generatedUrl === '') {
      alert('Please generate the QR code first.');
      return;
    }

    toPng(qrCodeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'qr-with-stand.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <div className="qr-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter URL for QR Code"
          value={qrurl}
          onChange={(e) => setQrurl(e.target.value)}
          className="url-input"
        />
        <button onClick={handleGenerate} className="generate-button">
          Generate QR Code
        </button>
      </div>

      {generatedUrl && (
        <div
          ref={qrCodeRef}
          className="qr-code-stand"
        >
          {/* QR Code */}
          <div className="qr-code">
            <QRCodeSVG value={generatedUrl} size={325} /> {/* Use QRCodeSVG */}
          </div>

          {/* Stand Image */}
          <img
            src={qrphoto}
            alt="QR Stand"
            className="stand-image"
          />
        </div>
      )}

      {generatedUrl && (
        <button onClick={handleDownload} className="download-button">
          Download QR Code with Stand
        </button>
      )}
    </div>
  );
};

export default QRCodeWithStand;