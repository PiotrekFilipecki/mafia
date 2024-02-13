import React, {useState, useEffect} from 'react'

export default function Hero() {
  const [showLogo, setShowLogo] = useState(false);
  const [hideCover, setHideCover] = useState(false);
  const [showFriz, setShowFriz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 100);
    const timer2 = setTimeout(() => {
      setHideCover(true);
    }, 2000);
    const timer3 = setTimeout(() => {
      setShowFriz(true);
    }, 3500);
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
    };
  }, [])
  return (
    <div className={hideCover ? 'hero hideCover': 'hero'}>
        <div className='hero__content'>
            <img className={showFriz ? 'hero__content--friz frizslide': 'hero__content--friz'} src='/friz.png' alt='Żabka' />
            <img 
              className={`maflogo ${showLogo ? 'logoslide' : ''} ${hideCover ? 'logoIndex' : ''}`} 
              src='/mafia_stamp.png' alt='Żabka' />
            <div className={showFriz ? 'hero__content--text textslide': 'hero__content--text'}>
                <img src="/slider_r.png" alt="Produkty" />
                <button>Dołącz do Mafii!</button>
            </div>
        </div>
    </div>
  )
}
