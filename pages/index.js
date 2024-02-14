import { useRef, useState, useEffect } from 'react';
import Head from "next/head";
import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import SmoothScroll from "@/components/ScrollContainer";
import Hero from "@/components/Hero";
import { ParallaxText } from "@/components/ParallaxText";
import CookiePolicyBox from '@/components/CookiePolicy';


const inter = Source_Code_Pro({
  subsets: ['latin'],
  weights: [400, 700],
  variable: '--font-inter',
  display: 'swap',
});

function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/check')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      {console.log(data)}
    </div>
  )
}

export default function Home() {
  const offerForm = useRef();
  const [error, setError] = useState();
  const formRef = useRef()
  const [message, setMessage] = useState(false)

  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [formProcessing, setFormProcessing] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [showForm, setShowForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [codesData, setCodesData] = useState();
  const [data, setData] = useState(null)
const [isLoading, setLoading] = useState(true)
const [checkLoading, setCheckLoading] = useState(false)
const [validCode, setValidCode] = useState(false)
const [invalidCode, setInvalidCode] = useState(false)
const [codeMessage, setCodeMessage] = useState(false)
const [showCookieBox, setShowCookieBox] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
};

// const handleCodeChange = (event) => {
//   // setCodeValue(event.target.value);
//   console.log(codeValue)
//   // console.log(codesData.find((item) => item.codes === event.target.value))
// };

// Validate checkbox on state change
useEffect(() => {
    if (isChecked) {
        setIsSubmitDisabled(false);
    } else {
        setIsSubmitDisabled(true);
    }
}, [isChecked]);





useEffect(() => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (cookieConsent === null) {
    setShowCookieBox(true);
  }
  fetch('/api/check')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
}, [])

// useEffect(() => {
//   {data && data.find((item) => {
//     if (codeValue === item.codes) {
//       console.log(item.codes)

     
//     } else {
//       console.log('nope')
//       setCodeValue('')
//     }
//   })}
// }, [codeValue])

useEffect(() => {
  
  if (data) {
    const foundItem = data.find((item) => codeValue === item.codes);
    if (foundItem) {
      console.log(foundItem.codes);
      setCodeMessage(true)
      setTimeout(() => {
        setCodeMessage(false)
        setValidCode(true);
        setInvalidCode(false);

        setTimeout(() => {
          setCheckLoading(false)
        }, 2000)
      }, 3000);
    } else {
      console.log('nope');
      setTimeout(() => {
        setCodeMessage(false)
        setValidCode(false);
        setInvalidCode(true);
        setTimeout(() => {
          setCheckLoading(false)
        }, 2000)
      }, 3000);
      if (codeValue !== '') {
        setCodeValue('');
      }
    }
  }
}, [codeValue, data]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formProcessing) return;
  setError(null);
  setFormProcessing(true);
  const form = new FormData(offerForm.current);
  const payload = {
    firstName: form.get('name'),
    email: form.get('email'),
    message: form.get('message'),
    phone: form.get('phone'),
    code: form.get('code'),

  };




  
  const response = await fetch('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    // router.push('/thankyou');

    setMessage(true)
    document.body.classList.add("hideoverflow")
    setFormProcessing(false);
    setShowConfirm(true)
    
    
  } else {
    const payload = await response.json();
    setFormProcessing(false);
    // setError(payload.error?.details[0]?.message);
  }
};

const handleAccept = () => {
  localStorage.setItem('cookieConsent', 'accepted');
  setShowCookieBox(false);
};

const handleDecline = () => {
  localStorage.setItem('cookieConsent', 'declined');
  setShowCookieBox(false);
  // You might want to handle the decline differently, e.g., redirecting the user or disabling certain features.
};

  return (
    <>
      <Head>
        <title>MAFIA IRL x Żabka</title>
        <meta name="description" content="MAFIA IRL x Żabka" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
          <Image
          alt='Żabka'
          src="/zab.svg"
          width={121}
          height={47}
          />
          <a className='mobileterms' href="/regulamin.pdf" target="_blank">Regulamin</a>
          <nav>
            <a href="#nagrody">Nagrody</a>
            <a href="#zasady">Zasady</a>
            <a href="#wez-udzial">Weź udział</a>
            <a href="#kontakt">Kontakt</a>
            <a className="termslink" href="/regulamin.pdf" target="_blank">Regulamin</a>
            <a className="termslink" href="https://www.instagram.com/norush_nosprobuj?igsh=NHFqM283ZjI5bGNp" target="_blank">
              <img src="instagram.svg" alt="Instagram" />
            </a>
          </nav>
        </header>
      <main className="main">
      {showCookieBox && <CookiePolicyBox onAccept={handleAccept} onDecline={handleDecline} />}

        <Hero />
        <ParallaxText>Dołącz do mafii!</ParallaxText>

        <div id="nagrody" className="prizes">
          <h2 className="sectionHeader">Nagrody</h2>
          {/* <p className="sectionClaim">subtitle</p> */}
          <div className="prizes-grid">
            <div className="prize">
              <img src="/gold_1g.png" alt="Nagroda" />
              <h3 className="prizeHeader">10 <span>x</span></h3>
              <p className="prizeClaim">Sztabka złota 1g</p>
            </div>
            <div className="prize">
            <img src="/gold_3g.png" alt="Nagroda" />
              <h3 className="prizeHeader">3 <span>x</span></h3>
              <p className="prizeClaim">Sztabka złota 3g</p>
            </div>
            <div className="prize">
            <img src="/gold_10g.png" alt="Nagroda" />
              <h3 className="prizeHeader">2 <span>x</span></h3>
              <p className="prizeClaim">Sztabka złota 10g</p>
            </div>
            <div className="prize">
            <img src="/ticket.png" alt="Nagroda" />
              <h3 className="prizeHeader">2 <span>x</span></h3>
              <p className="prizeClaim">Udział na planie zdjęciowym Mafia IRL</p>
            </div>
          </div>
        </div>
        <div id="zasady" className="rules">
          <h2 className="sectionHeader">Zasady</h2>
          {/* <p className="sectionClaim">subtitle</p> */}
          <div className="rules-grid">
            <div className="rule">
              <img src="/produkty.png" alt="Zasada" />
              <span className='number'>01</span>
              <p className="ruleClaim">
              KUP 2 DOWOLNE PRODUKTY RUSH / noRUSH W ŻABCE
              </p>
            </div>
            <div className="rule">
              <img src="/zaapka.png" alt="Zasada" />
              <span className='number'>02</span>
              <p className="ruleClaim">
              ZESKANUJ APLIKACJĘ ŻAPPKA<br/><span>PODCZAS ZAKUPU I ODBIERZ KOD, KTÓRY POJAWI SIĘ W APLIKACJI</span>
              </p>
            </div>
            <div className="rule">
              <img src="/rekrut.png" alt="Zasada" />
              <span className='number'>03</span>
              <p className="ruleClaim">
              ZAREJESTRUJ (WPISZ) KOD I ODPOWIEDZ NA PYTANIE <br/><span>DLACZEGO CHCESZ DOŁĄCZYĆ DO MAFII IRL?</span>
              </p>
            </div>
          </div>
        </div>
        <div id="wez-udzial" className="formSection">
          <img src="/rekrr.png" alt="Rekrutacja" />

          <div className="form-container">
            <div className={checkLoading ? 'codechecker codechecking': 'codechecker'}>
              <p>{codeMessage ? 'Sprawdzam kod...': ''}
              {validCode && !invalidCode && !codeMessage ? 'Kod prawidłowy' : ''}
              {invalidCode && !validCode && !codeMessage ? 'Kod nieprawidłowy' : ''}</p>
              <p>{invalidCode && !validCode && !codeMessage ? 'Spróbuj ponownie' : ''}</p>

           
            </div>
            <div className={showConfirm ? 'confirmSlide show': 'confirmSlide'}>
            <img 
              className={`maflogoconfirm ${showConfirm ? 'logoslideconfirm' : ''}`} 
              src='/mafia_stamp.png' alt='Żabka' />
              <h2
              className={`confirmtext ${showConfirm ? 'showconfirmtext' : ''}`} 
              >Twoje zgłoszenie zostało przyjęte</h2>
            </div>
  <form className="form" ref={offerForm} onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="text" id="name" name="name" className="form-field" placeholder=" " required />
      <label htmlFor="firstName" className="label-as-placeholder">IMIĘ</label>
    </div>
    <div className="form-group">
      <input type="email" id="email" name="email" className="form-field" placeholder=" " required />
      <label htmlFor="email" className="label-as-placeholder">E-MAIL</label>
    </div>
    <div className="form-group">
      <input type="text" id="phone" name="phone" className="form-field" placeholder=" " required />
      <label htmlFor="phone" className="label-as-placeholder">TELEFON</label></div>
    <div className="form-group">
      <input 
      onChange={e => {
        
        
        if (e.target.value.length === 8) {
          
       
          setCheckLoading(true)
          setCodeMessage(true)
          setCodeValue(e.target.value)


          
         
        }
      }}
      type="text" id="code" name="code" className="form-field" placeholder=" " required />
      <label htmlFor="code" className="label-as-placeholder">KOD ZAKUPU</label>
    </div>
    <div className="form-group">
      <textarea id="message" name="message" className="form-field" placeholder=" " required></textarea>
      <label htmlFor="message" name="message" className="label-as-placeholder">DLACZEGO CHCESZ DOŁĄCZYĆ DO MAFII IRL?</label>
    </div>
    <div className="fieldWrapper">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label className="terms"> Akceptuję <a href="/regulamin.pdf" target="_blank">regulamin</a> i wyrażam zgodę na przetwarzanie moich danych.</label>
            </div>

<div className="fieldWrapper">
  <button
    // disabled={formProcessing}
    disabled={isSubmitDisabled}
    className="submit sendform">

    {formProcessing ? <span className="loading">Wysyłam</span> : <span>Dołącz do Mafii!</span>}
  </button>
  {error && (
    <div className="errorWrapper">
      <span className="errorWrapper-inner">
        Offer not added: {error}
      </span>
    </div>
  )}
</div>
  </form>
</div>

        </div>
        <div id="kontakt" className="contact">
        <h2 className="sectionHeader">Kontakt</h2>

  <p className="sectionClaim">ul. Pod Sikornikiem 27A</p>
  <p className="sectionClaim">30-216 Kraków</p>
  <a className="sectionClaim" href="mailto:hello@theessa.pl">hello@theessa.pl</a>
  <img className='essalogo' src='/esslogo.svg' alt='The Essa' />
  <p className="sectionClaim">© 2024 · THE ESSA CO</p>
  <img className='footerStamp' src="/mafia_stamp.png" alt="Mafia" />
          </div>
      </main>
    </>
  );
}
