import React, { useEffect, useMemo, useState } from 'react'
import professionalsData from './data/professionals.json'
import banner from './assets/banner-impacta.png'
import logoLight from './assets/logo-light.png'
import logoDark from './assets/logo-dark.png'

function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="w-full bg-emerald-600/90 dark:bg-slate-900/80 backdrop-blur border-b border-emerald-500/40 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Impacta Carreiras"
            className="h-10 w-auto"
          />
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100 dark:text-emerald-300">
              O futuro do trabalho
            </p>
            <p className="text-sm text-emerald-50 dark:text-slate-100">
              Conectando pessoas, competências e propósito
            </p>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200/60 dark:border-slate-600 bg-emerald-50/70 dark:bg-slate-800 hover:bg-emerald-100 hover:dark:bg-slate-700 transition"
        >
          <span className="relative inline-flex h-4 w-4 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-emerald-400/60 blur-[2px]" />
            <span className="relative text-[10px]">
              {darkMode ? '🌙' : '☀️'}
            </span>
          </span>
          <span>{darkMode ? 'Modo escuro' : 'Modo claro'}</span>
        </button>
      </div>
    </header>
  )
}

function ProfessionalCard({ professional, onClick }) {
  return (
    <button
      onClick={() => onClick(professional)}
      className="group relative flex flex-col items-stretch text-left bg-white/90 dark:bg-slate-900/80 border border-emerald-100/60 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <img
            src={professional.photo}
            alt={professional.name}
            className="h-14 w-14 rounded-full object-cover border-2 border-emerald-400/80"
          />
          <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500 text-white text-[10px] border-2 border-white dark:border-slate-900">
            
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50 leading-tight">
            {professional.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {professional.role}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5">
            {professional.city} · {professional.state} · {professional.area}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
        {professional.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {professional.techs.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-100/60 dark:border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-3 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
        Ver perfil completo
        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </button>
  )
}

function ProfessionalModal({ professional, onClose }) {
  const [action, setAction] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  if (!professional) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('Preencha todos os campos para continuar.')
      return
    }
    const label =
      action === 'recommend' ? 'Recomendação registrada!' : 'Mensagem enviada!'
    alert(`${label} (simulação front-end)`)
    setForm({ name: '', email: '', message: '' })
    setAction(null)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm px-4">
      <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-emerald-400/60 dark:border-slate-700 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={professional.photo}
              alt={professional.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-400/80"
            />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {professional.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {professional.role} · {professional.area}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                {professional.city} · {professional.state}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              Sobre
            </h3>
            <p className="text-slate-700 dark:text-slate-200">
              {professional.summary}
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Formação acadêmica
              </h3>
              <p className="text-slate-700 dark:text-slate-200">
                {professional.education}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Experiências
              </h3>
              <p className="text-slate-700 dark:text-slate-200">
                {professional.experience}
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Hard skills
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {professional.hardSkills.map((skill) => (
                  <li
                    key={skill}
                    className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-100/60 dark:border-slate-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Soft skills
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {professional.softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="px-2 py-0.5 rounded-full text-[11px] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Hobbies
              </h3>
              <p className="text-slate-700 dark:text-slate-200">
                {professional.hobbies.join(' · ')}
              </p>
            </div>
          </section>

          {action && (
            <section className="mt-2">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {action === 'recommend'
                    ? 'Recomendar profissional'
                    : 'Enviar mensagem'}
                </h3>
                <button
                  type="button"
                  onClick={() => setAction(null)}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  cancelar
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="grid gap-2 text-xs md:grid-cols-2"
              >
                <label className="flex flex-col gap-1">
                  Nome
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  E-mail
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="seu@email.com"
                  />
                </label>
                <label className="flex flex-col gap-1 md:col-span-2">
                  Mensagem
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs min-h-[70px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder={
                      action === 'recommend'
                        ? 'Conte por que você recomenda este talento.'
                        : 'Escreva uma mensagem para este profissional.'
                    }
                  />
                </label>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                  >
                    {action === 'recommend'
                      ? 'Enviar recomendação'
                      : 'Enviar mensagem'}
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setAction('recommend')}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
            >
              
              <span>Recomendar profissional</span>
            </button>
            <button
              onClick={() => setAction('message')}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 border border-emerald-500/70 text-emerald-700 dark:text-emerald-300 dark:border-emerald-400/70 bg-emerald-50/40 dark:bg-slate-900 hover:bg-emerald-100/70 hover:dark:bg-slate-800 transition"
            >
              <span>✉️</span>
              <span>Enviar mensagem</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Ações simuladas apenas no front-end para o desafio da Global Solution.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [areaFilter, setAreaFilter] = useState('Todos')
  const [cityFilter, setCityFilter] = useState('Todos')
  const [techFilter, setTechFilter] = useState('Todos')
  const [selectedProfessional, setSelectedProfessional] = useState(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const areas = useMemo(
    () => ['Todos', ...Array.from(new Set(professionalsData.map((p) => p.area)))],
    [],
  )
  const cities = useMemo(
    () => ['Todos', ...Array.from(new Set(professionalsData.map((p) => p.city)))],
    [],
  )
  const techs = useMemo(() => {
    const set = new Set()
    professionalsData.forEach((p) => p.techs.forEach((t) => set.add(t)))
    return ['Todos', ...Array.from(set)]
  }, [])

  const filteredProfessionals = useMemo(() => {
    return professionalsData.filter((p) => {
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.techs.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      const matchesArea = areaFilter === 'Todos' || p.area === areaFilter
      const matchesCity = cityFilter === 'Todos' || p.city === cityFilter
      const matchesTech =
        techFilter === 'Todos' ||
        p.techs.map((t) => t.toLowerCase()).includes(techFilter.toLowerCase())

      return matchesSearch && matchesArea && matchesCity && matchesTech
    })
  }, [searchTerm, areaFilter, cityFilter, techFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-50">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="mt-6 mb-6 overflow-hidden rounded-3xl border border-emerald-400/70 dark:border-slate-700 bg-emerald-700/60 dark:bg-slate-900/80 shadow-xl">
          <div className="grid md:grid-cols-[1.2fr,1fr] items-stretch">
            <div className="relative">
              <img
                src={banner}
                alt="Impacta Carreiras"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-3 px-6 py-6">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-emerald-100">
                Global Solution · FIAP 2025
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-50 leading-snug">
                Encontre o próximo colaborador do seu negócio.
              </h1>
              <p className="text-sm text-emerald-100/90">
                Explore uma rede de profissionais preparada para o futuro do
                trabalho, com competências técnicas, humanas e alinhadas a
                propósito.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 bg-white/95 dark:bg-slate-900/90 rounded-3xl border border-emerald-100/70 dark:border-slate-700 shadow-lg px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Busque por nome, cargo, área ou tecnologia
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">
                  🔎
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex.: React, UX, dados, marketing..."
                  className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Área
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Cidade
                </label>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Tecnologia
                </label>
                <select
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                  className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {techs.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <p>
              {filteredProfessionals.length} de {professionalsData.length}{' '}
              profissionais visíveis com os filtros atuais.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setAreaFilter('Todos')
                setCityFilter('Todos')
                setTechFilter('Todos')
              }}
              className="text-[11px] text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        </section>

        <section>
          {filteredProfessionals.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 py-16 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-200 mb-1">
                Nenhum talento encontrado com esses critérios.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ajuste a busca ou remova alguns filtros para explorar mais
                perfis.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  onClick={setSelectedProfessional}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedProfessional && (
        <ProfessionalModal
          professional={selectedProfessional}
          onClose={() => setSelectedProfessional(null)}
        />
      )}
    </div>
  )
}
