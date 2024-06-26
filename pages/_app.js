import "@/styles/globals.scss";
import { Source_Code_Pro } from "next/font/google";
import localFont from 'next/font/local'
import Script from "next/script";

const inter = Source_Code_Pro({
  subsets: ['latin'],
  weights: [400, 700],
  variable: '--font-inter',
  display: 'swap',
});

const myFont = localFont({
  src: [
    {
      path: '../public/Fantomen.woff',
      weight: '100',
    },
  ],
  fallback: ['Helvetica', 'ui-sans-serif'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-X96N9WPS1X"/>
<Script
  id='google-analytics'
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
      __html: `
      window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X96N9WPS1X', {
          page_path: window.location.pathname,
        });
      `,
    }}
  /> 
    <Component {...pageProps} />
    <style jsx global>{`
:root {
  --font-base: ${inter.style.fontFamily};
  font-family: ${inter.style.fontFamily};
}
button,
.parallax span,
.confirmSlide,
.codechecker p,
.number {
  font-family: ${myFont.style.fontFamily}
}

.prize h3 {
  font-family: ${myFont.style.fontFamily}
}


`}</style>
    </>
  );
}
