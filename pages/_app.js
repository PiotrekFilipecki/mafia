import "@/styles/globals.scss";
import { Source_Code_Pro } from "next/font/google";
import localFont from 'next/font/local'

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
    <Component {...pageProps} />
    <style jsx global>{`
:root {
  --font-base: ${inter.style.fontFamily};
  font-family: ${inter.style.fontFamily};
}
button,
.parallax span,
.confirmSlide,
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
