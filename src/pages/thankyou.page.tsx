import React from 'react';

function ThankYouPage() {
  const image = new URL('../assets/icon.png', import.meta.url).href;

  return (
    <section className="grid place-items-center">
      <div className="w-full">
        <img src={image} alt="Logo" className="mx-auto w-48 h-48 mb-7" />
      </div>
      <div>Thank you for using our service! Please Close this window and login in your App.</div>
      <div>
        Obrigado por utilizar o nosso serviço! Por favor feche esta janela e entre na sua aplicação.
      </div>
    </section>
  );
}

export default ThankYouPage;
