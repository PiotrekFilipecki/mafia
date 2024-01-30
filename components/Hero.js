import React from 'react'

export default function Hero() {
  return (
    <div className='hero'>
        <div className='hero__content'>
            <img className='hero__content--friz' src='/friz.png' alt='Żabka' />
            <img className='maflogo' src='/mafia_stamp.png' alt='Żabka' />
            <div className='hero__content--text'>
                <img src="/produkty.png" alt="Produkty" />
                <button>Dołącz do Mafii!</button>
            </div>
        </div>
    </div>
  )
}
