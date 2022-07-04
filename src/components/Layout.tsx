/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[url('/images/bg.jpg')] min-h-screen">
      <div className="mx-auto w-full max-w-7xl min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between -mb-12">
      <span className="text-4xl text-white grow basis-0 flex justify-center -mt-16">
        RANK
      </span>
      <img src="/images/title.png" width={600} className="-mt-16" />
      <div className="grow basis-0 flex justify-center -mt-16">
        <img src="/images/logo_main.png" width={100} />
      </div>
    </div>
  );
}

const ICON_SIZE = 120;

function Footer() {
  return (
    <footer className="flex items-center justify-between mx-72 mt-16 pb-12">
      <img src="/images/logo_eldorado.png" width={ICON_SIZE} />
      <img src="/images/logo_icomp.png" width={ICON_SIZE} />
      <img src="/images/logo_sidia.png" width={ICON_SIZE} />
      <img src="/images/logo_polo_digital.png" width={ICON_SIZE} />
    </footer>
  );
}
