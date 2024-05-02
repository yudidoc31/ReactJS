//===Task Jam berjalan\\
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Jam() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Membersihkan timer saat komponen di-unmount atau komponen di-renders ulang
    return () => clearInterval(timerID);
  }, []); // Tidak ada dependensi, sehingga useEffect hanya dijalankan sekali saat komponen pertama kali dirender

  return (
    <div>
      <h1>JamDigital {time.toLocaleTimeString()}</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Siaran Percobaan</h1>
      <Jam />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
