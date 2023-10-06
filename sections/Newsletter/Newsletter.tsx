export default function Newsletter() {
  return (
    <div class="max-sm:p-3 mt-2">
      <div class="bg-[#004abe] md:container rounded-lg flex flex-col rounded p-4 gap-6 sm:py-10 lg:p-16 lg:gap-12">
        <div  class="w-11/12 xl:w-9/12 mx-auto">
          <p class="text-center text-xl md:text-lg xl:text-xl text-white font-semibold mb-4">
            Receba as melhores ofertas e descontos exclusivos! Cadastre seu nome e
            e-mail aqui.
          </p>
          <form action="/" class="flex flex-col justify-center gap-4 px-6">
            <div class="flex flex-col lg:flex-row gap-3">
              <label htmlFor="newsletter-name" class="hidden">Name</label>
              <input
                id="newsletter-name"
                class="rounded-sm px-3 py-2 bg-white w-full md:w-full lg:w-8/12"
                type="text"
                placeholder="Digite o seu nome"
              />
              <label htmlFor="newsletter-email" class="hidden">Email</label>
              <input
              id="newsletter-email"
                class="rounded-sm px-3 py-2 bg-white w-full md:w-full lg:w-full"
                type="text"
                placeholder="Digite o seu email"
              />
              <button
                class="rounded-sm bg-[#f58220] py-2 px-6 font-bold text-white"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
            {/* {form?.helpText && (
              <div
                class="text-sm"
                dangerouslySetInnerHTML={{ __html: form?.helpText }}
              />
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
}
