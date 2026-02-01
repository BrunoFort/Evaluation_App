export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
          ProRef
        </h1>
        <p className="text-neutral-600 mt-2 text-lg">
          A forma moderna, ética e segura de gerenciar referências profissionais.
        </p>
      </header>

      <section className="space-y-8">
        <div className="bg-white shadow-sm border border-neutral-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Controle total dos seus dados
          </h2>
          <p className="text-neutral-600 mt-2 leading-relaxed">
            Você decide o que compartilhar, com quem compartilhar e por quanto tempo.
            Transparência e privacidade são pilares fundamentais do ProRef.
          </p>
        </div>

        <div className="bg-white shadow-sm border border-neutral-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Referências confiáveis, sem ruído
          </h2>
          <p className="text-neutral-600 mt-2 leading-relaxed">
            Criamos um ambiente seguro onde empregadores e candidatos interagem com
            clareza, autenticidade e responsabilidade.
          </p>
        </div>

        <div className="bg-white shadow-sm border border-neutral-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Construído para o mundo real
          </h2>
          <p className="text-neutral-600 mt-2 leading-relaxed">
            Fluxos simples, decisões claras e uma experiência que reduz atrito —
            tudo pensado para funcionar no dia a dia de empresas e profissionais.
          </p>
        </div>
      </section>
    </div>
  );
}
