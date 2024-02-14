import React from 'react';

const CookiePolicyBox = ({ onAccept, onDecline }) => {
  return (
    <div style={{ position: 'fixed', bottom: 0, backgroundColor: 'white', padding: '10px', width: '100%', textAlign: 'center', zIndex: '5', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}>
      <p style={{ fontSize: '13px' }}>Nasza strona internetowa używa plików cookie, aby poprawić Twoje doświadczenia. Kontynuując korzystanie z naszej strony, zgadzasz się z <a href="/regulamin.pdf" target="_blank">Regulaminem</a>.</p>
      <button  onClick={onAccept} style={{ marginRight: '10px', background: 'black', color: 'white', border: 'none', padding: '5px'  }}>Akceptuję</button>
      <button style={{background: 'black', color: 'white', border: 'none', padding: '5px' }} onClick={onDecline}>Nie zgadzam się</button>
    </div>
  );
};

export default CookiePolicyBox;