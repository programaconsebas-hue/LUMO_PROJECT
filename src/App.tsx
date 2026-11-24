import React, { useState } from "react";

type View = "welcome" | "onboarding" | "login" | "register" | "home" | "search" | "listing" | "booking" | "dashboard" | "my-spots";

interface Spot {
  id: number;
  title: string;
  address: string;
  neighborhood: string;
  price: number;
  rating: number;
  reviews: number;
  host: string;
  hostAvatar: string;
  image: string;
  type: string;
  features: string[];
  available: boolean;
  lat: number;
  lng: number;
}

const spots: Spot[] = [
  {
    id: 1,
    title: "Cochera privada con portón automático",
    address: "Av. Providencia 1234",
    neighborhood: "Providencia",
    price: 4500,
    rating: 4.9,
    reviews: 87,
    host: "Valentina R.",
    hostAvatar: "VR",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop&auto=format",
    type: "Privado",
    features: ["Techado", "24/7", "CCTV", "Portón automático"],
    available: true,
    lat: -33.43,
    lng: -70.61,
  },
  {
    id: 2,
    title: "Estacionamiento subterráneo seguro",
    address: "Calle Loreto 567",
    neighborhood: "Ñuñoa",
    price: 3200,
    rating: 4.7,
    reviews: 54,
    host: "Matías F.",
    hostAvatar: "MF",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&h=400&fit=crop&auto=format",
    type: "Subterráneo",
    features: ["Techado", "Seguridad 24/7", "Acceso con tarjeta"],
    available: true,
    lat: -33.45,
    lng: -70.60,
  },
  {
    id: 3,
    title: "Espacio al aire libre en barrio tranquilo",
    address: "Los Alerces 890",
    neighborhood: "Las Condes",
    price: 2800,
    rating: 4.5,
    reviews: 31,
    host: "Camila T.",
    hostAvatar: "CT",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop&auto=format",
    type: "Exterior",
    features: ["Acceso libre", "Fácil entrada", "Barrio tranquilo"],
    available: true,
    lat: -33.41,
    lng: -70.58,
  },
  {
    id: 4,
    title: "Garage doble con almacenamiento",
    address: "Av. Apoquindo 3300",
    neighborhood: "Las Condes",
    price: 6000,
    rating: 5.0,
    reviews: 12,
    host: "Ignacio P.",
    hostAvatar: "IP",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    type: "Privado",
    features: ["Doble espacio", "Bodega incluida", "CCTV", "Techado"],
    available: false,
    lat: -33.42,
    lng: -70.57,
  },
  {
    id: 5,
    title: "Estacionamiento en edificio residencial",
    address: "Irarrázaval 2100",
    neighborhood: "Ñuñoa",
    price: 3500,
    rating: 4.6,
    reviews: 43,
    host: "Sofía M.",
    hostAvatar: "SM",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop&auto=format",
    type: "Edificio",
    features: ["Subterráneo", "Control de acceso", "Iluminado"],
    available: true,
    lat: -33.46,
    lng: -70.62,
  },
  {
    id: 6,
    title: "Cochera independiente con llave",
    address: "Pedro de Valdivia 450",
    neighborhood: "Providencia",
    price: 5100,
    rating: 4.8,
    reviews: 67,
    host: "Diego A.",
    hostAvatar: "DA",
    image: "https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?w=600&h=400&fit=crop&auto=format",
    type: "Privado",
    features: ["Llave propia", "Techado", "Muy seguro"],
    available: true,
    lat: -33.44,
    lng: -70.63,
  },
];

const myListedSpots = [
  {
    id: 10,
    title: "Mi cochera en Vitacura",
    address: "Av. Vitacura 3500",
    type: "Privado",
    price: 5500,
    status: "activo",
    bookings: 8,
    earnings: 44000,
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 11,
    title: "Espacio exterior casa",
    address: "Los Olmos 123",
    type: "Exterior",
    price: 2900,
    status: "pausado",
    bookings: 3,
    earnings: 8700,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop&auto=format",
  },
];

const bookings = [
  { id: "B001", spot: "Mi cochera en Vitacura", renter: "Carlos M.", date: "19–21 Ago 2026", amount: 11000, status: "confirmado" },
  { id: "B002", spot: "Mi cochera en Vitacura", renter: "Paula S.", date: "23 Ago 2026", amount: 5500, status: "pendiente" },
  { id: "B003", spot: "Espacio exterior casa", renter: "Jorge L.", date: "15 Ago 2026", amount: 2900, status: "completado" },
];

export default function App() {
  const [view, setView] = useState<View>("welcome");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regRole, setRegRole] = useState<"renter" | "host" | "both" | "">("");
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("Todos");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingDays, setBookingDays] = useState(1);
  const [booked, setBooked] = useState(false);
  const [userMode, setUserMode] = useState<"renter" | "host">("renter");

  const types = ["Todos", "Privado", "Subterráneo", "Exterior", "Edificio"];
  const filtered = spots.filter((s) => {
    const matchType = filterType === "Todos" || s.type === filterType;
    const matchQuery = s.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchQuery;
  });

  const openSpot = (spot: Spot) => {
    setSelectedSpot(spot);
    setBooked(false);
    setView("listing");
  };

  const StarIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1l1.4 2.8L10.5 4.3l-2.25 2.2.53 3.1L6 8l-2.78 1.6.53-3.1L1.5 4.3l3.1-.5z" />
    </svg>
  );

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)", backgroundColor: "var(--background)" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
      >
        <button
          onClick={() => { setView("home"); setUserMode("renter"); }}
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          LUMO
        </button>

        <div className="flex items-center gap-3">
          {view === "home" || view === "search" ? (
            <>
              <button
                onClick={() => { setView("my-spots"); setUserMode("host"); }}
                className="text-sm font-medium px-4 py-2 rounded-full transition-all"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--foreground)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--muted-foreground)"; }}
              >
                Publicar espacio
              </button>
              <button
                onClick={() => setView("dashboard")}
                className="text-sm font-medium px-4 py-2 rounded-full transition-all"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--foreground)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--muted-foreground)"; }}
              >
                Mis reservas
              </button>
            </>
          ) : (
            <button
              onClick={() => setView("search")}
              className="text-sm font-medium px-3 py-2 flex items-center gap-1.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Volver
            </button>
          )}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            JD
          </div>
        </div>
      </nav>

      {/* MOBILE SHELL — welcome, onboarding, login */}
      {(view === "welcome" || view === "onboarding" || view === "login" || view === "register") && (
        <MobileShell
          view={view}
          onboardingStep={onboardingStep}
          setOnboardingStep={setOnboardingStep}
          setView={setView}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailFocused={emailFocused}
          setEmailFocused={setEmailFocused}
          passFocused={passFocused}
          setPassFocused={setPassFocused}
          regName={regName}
          setRegName={setRegName}
          regPhone={regPhone}
          setRegPhone={setRegPhone}
          regConfirm={regConfirm}
          setRegConfirm={setRegConfirm}
          regRole={regRole}
          setRegRole={setRegRole}
        />
      )}

      {/* HOME */}
      {view === "home" && (
        <div>
          {/* Hero */}
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--primary)", minHeight: "520px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1619083382819-b42f28dd3699?w=1600&h=700&fit=crop&auto=format"
              alt="Ciudad con estacionamientos"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
              <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
                El mercado de estacionamiento
              </p>
              <h1
                className="text-5xl md:text-7xl font-light leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)", color: "#f7f5f0" }}
              >
                Tu cochera,
                <br />
                <em>su solución.</em>
              </h1>
              <p className="text-lg mb-10 max-w-xl" style={{ color: "#c4bfb8" }}>
                Encuentra o arrienda espacios de estacionamiento de personas reales en tu ciudad. Rápido, seguro y sin complicaciones.
              </p>

              {/* Search box */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ backgroundColor: "#f7f5f0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="¿Dónde necesitas estacionar?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--foreground)" }}
                    onKeyDown={(e) => e.key === "Enter" && setView("search")}
                  />
                </div>
                <button
                  onClick={() => setView("search")}
                  className="px-6 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-b" style={{ borderColor: "var(--border)" }}>
            <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-8 text-center">
              {[
                { value: "2.400+", label: "Espacios disponibles" },
                { value: "18.000+", label: "Usuarios registrados" },
                { value: "4.8 ★", label: "Calificación promedio" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-light mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>{s.value}</p>
                  <p className="text-xs tracking-wide uppercase" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)" }}>
                Espacios destacados
              </h2>
              <button
                onClick={() => setView("search")}
                className="text-sm font-medium flex items-center gap-1.5 transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                Ver todos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {spots.slice(0, 3).map((spot) => (
                <SpotCard key={spot.id} spot={spot} onClick={() => openSpot(spot)} StarIcon={StarIcon} />
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="py-16 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-light mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>
                ¿Cómo funciona?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-6" style={{ color: "var(--accent)" }}>Para arrendatarios</p>
                  {[
                    { n: "01", title: "Busca", desc: "Ingresa tu destino y filtra por tipo, precio y disponibilidad." },
                    { n: "02", title: "Reserva", desc: "Elige el espacio y confirma tu reserva al instante." },
                    { n: "03", title: "Estaciona", desc: "Recibe instrucciones del anfitrión y llega sin preocupaciones." },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-5 mb-8">
                      <span className="text-2xl font-light shrink-0 w-8" style={{ fontFamily: "var(--font-display)", color: "var(--muted-foreground)" }}>{step.n}</span>
                      <div>
                        <p className="font-semibold mb-1">{step.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-6" style={{ color: "var(--accent)" }}>Para anfitriones</p>
                  {[
                    { n: "01", title: "Publica", desc: "Agrega fotos, precio y disponibilidad de tu espacio en minutos." },
                    { n: "02", title: "Acepta", desc: "Recibe solicitudes y confirma las reservas que prefieras." },
                    { n: "03", title: "Gana", desc: "Recibe pagos directamente en tu cuenta cada semana." },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-5 mb-8">
                      <span className="text-2xl font-light shrink-0 w-8" style={{ fontFamily: "var(--font-display)", color: "var(--muted-foreground)" }}>{step.n}</span>
                      <div>
                        <p className="font-semibold mb-1">{step.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Host */}
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "var(--font-display)" }}>
              ¿Tienes un espacio libre?
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Convierte tu cochera o estacionamiento en ingresos extra. Tú decides cuándo y a quién.
            </p>
            <button
              onClick={() => setView("my-spots")}
              className="px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Publicar mi espacio
            </button>
          </div>
        </div>
      )}

      {/* SEARCH */}
      {view === "search" && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1 min-w-[200px]"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Barrio, dirección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: filterType === t ? "var(--primary)" : "var(--card)",
                    color: filterType === t ? "var(--primary-foreground)" : "var(--foreground)",
                    border: `1px solid ${filterType === t ? "var(--primary)" : "var(--border)"}`,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              <strong style={{ color: "var(--foreground)" }}>{filtered.length}</strong> espacios encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((spot) => (
              <SpotCard key={spot.id} spot={spot} onClick={() => openSpot(spot)} StarIcon={StarIcon} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 py-20 text-center" style={{ color: "var(--muted-foreground)" }}>
                <p className="text-4xl mb-3">🅿️</p>
                <p className="font-medium">Sin resultados</p>
                <p className="text-sm mt-1">Prueba con otro barrio o tipo de espacio</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LISTING DETAIL */}
      {view === "listing" && selectedSpot && (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: "var(--muted)" }}>
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.title}
                  className="w-full object-cover"
                  style={{ height: "320px" }}
                />
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full mr-2"
                    style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
                  >
                    {selectedSpot.type}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: selectedSpot.available ? "#d1fae5" : "#fee2e2",
                      color: selectedSpot.available ? "#065f46" : "#991b1b",
                    }}
                  >
                    {selectedSpot.available ? "Disponible" : "Ocupado"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <StarIcon />
                  {selectedSpot.rating} · <span style={{ color: "var(--muted-foreground)" }}>{selectedSpot.reviews} reseñas</span>
                </div>
              </div>

              <h1 className="text-2xl font-light mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {selectedSpot.title}
              </h1>
              <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
                {selectedSpot.address}, {selectedSpot.neighborhood}
              </p>

              <div className="border-t pt-6 mb-6" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ backgroundColor: "var(--secondary)", color: "var(--foreground)" }}
                  >
                    {selectedSpot.hostAvatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedSpot.host}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Anfitrión verificado</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mb-6" style={{ borderColor: "var(--border)" }}>
                <p className="font-medium mb-4">Características</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSpot.features.map((f) => (
                    <span
                      key={f}
                      className="text-sm px-4 py-2 rounded-xl"
                      style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
                <p className="font-medium mb-3">Ubicación</p>
                <div
                  className="rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ height: "180px", backgroundColor: "var(--secondary)" }}
                >
                  <div className="text-center" style={{ color: "var(--muted-foreground)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="text-sm">{selectedSpot.neighborhood}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking panel */}
            <div className="lg:col-span-2">
              <div
                className="sticky top-24 rounded-2xl p-6"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                {booked ? (
                  <div className="text-center py-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: "#d1fae5" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>¡Reserva confirmada!</p>
                    <p className="text-sm mb-1" style={{ color: "var(--muted-foreground)" }}>{selectedSpot.title}</p>
                    <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>{bookingDate} · {bookingDays} día{bookingDays > 1 ? "s" : ""}</p>
                    <p className="text-2xl font-semibold mb-5" style={{ fontFamily: "var(--font-display)" }}>
                      ${(selectedSpot.price * bookingDays).toLocaleString("es-CL")}
                    </p>
                    <button
                      onClick={() => setView("dashboard")}
                      className="w-full py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                      style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      Ver mis reservas
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                        ${selectedSpot.price.toLocaleString("es-CL")}
                      </span>
                      <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>/día</span>
                    </div>

                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Fecha de inicio</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{
                            backgroundColor: "var(--secondary)",
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Días</label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setBookingDays(Math.max(1, bookingDays - 1))}
                            className="w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center transition-all hover:opacity-70"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--foreground)" }}
                          >−</button>
                          <span className="flex-1 text-center font-semibold">{bookingDays}</span>
                          <button
                            onClick={() => setBookingDays(bookingDays + 1)}
                            className="w-10 h-10 rounded-xl font-bold text-lg flex items-center justify-center transition-all hover:opacity-70"
                            style={{ backgroundColor: "var(--secondary)", color: "var(--foreground)" }}
                          >+</button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex justify-between text-sm py-4 border-t border-b mb-5"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                    >
                      <span>${selectedSpot.price.toLocaleString("es-CL")} × {bookingDays} día{bookingDays > 1 ? "s" : ""}</span>
                      <span style={{ color: "var(--foreground)", fontWeight: 600 }}>${(selectedSpot.price * bookingDays).toLocaleString("es-CL")}</span>
                    </div>

                    <button
                      onClick={() => { if (selectedSpot.available && bookingDate) setBooked(true); }}
                      disabled={!selectedSpot.available || !bookingDate}
                      className="w-full py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                    >
                      {selectedSpot.available ? "Reservar ahora" : "No disponible"}
                    </button>
                    {!bookingDate && selectedSpot.available && (
                      <p className="text-xs text-center mt-2" style={{ color: "var(--muted-foreground)" }}>Selecciona una fecha para continuar</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD (Renter bookings) */}
      {view === "dashboard" && (
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Mis reservas</h1>
          <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>Historial de estacionamientos reservados</p>

          <div className="space-y-4">
            {[
              { spot: "Cochera privada · Providencia", date: "19–21 Ago 2026", amount: 13500, status: "confirmado", host: "Valentina R." },
              { spot: "Estacionamiento subterráneo · Ñuñoa", date: "10 Ago 2026", amount: 3200, status: "completado", host: "Matías F." },
              { spot: "Espacio al aire libre · Las Condes", date: "5 Ago 2026", amount: 2800, status: "completado", host: "Camila T." },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{b.spot}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{b.date} · {b.host}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm">${b.amount.toLocaleString("es-CL")}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: b.status === "confirmado" ? "#dbeafe" : "#d1fae5",
                      color: b.status === "confirmado" ? "#1d4ed8" : "#065f46",
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setView("search")}
            className="mt-8 w-full py-4 rounded-2xl font-medium text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--secondary)", color: "var(--foreground)" }}
          >
            Buscar nuevo estacionamiento
          </button>
        </div>
      )}

      {/* HOST DASHBOARD */}
      {view === "my-spots" && (
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light mb-1" style={{ fontFamily: "var(--font-display)" }}>Mi panel de anfitrión</h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Administra tus espacios y reservas</p>
            </div>
            <button
              className="px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              + Nuevo espacio
            </button>
          </div>

          {/* Earnings summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Ingresos este mes", value: "$52.700" },
              { label: "Reservas activas", value: "3" },
              { label: "Calificación", value: "4.9 ★" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-5 rounded-2xl"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                <p className="text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* My spots */}
          <h2 className="font-medium mb-4">Mis espacios</h2>
          <div className="space-y-4 mb-10">
            {myListedSpots.map((spot) => (
              <div
                key={spot.id}
                className="flex gap-4 p-4 rounded-2xl"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                <img src={spot.image} alt={spot.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm">{spot.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{spot.address} · {spot.type}</p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full shrink-0 font-medium"
                      style={{
                        backgroundColor: spot.status === "activo" ? "#d1fae5" : "#fef3c7",
                        color: spot.status === "activo" ? "#065f46" : "#92400e",
                      }}
                    >
                      {spot.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <span>${spot.price.toLocaleString("es-CL")}/día</span>
                    <span>{spot.bookings} reservas</span>
                    <span>Total: ${spot.earnings.toLocaleString("es-CL")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bookings */}
          <h2 className="font-medium mb-4">Solicitudes de reserva</h2>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{b.renter}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{b.spot} · {b.date}</p>
                </div>
                <p className="text-sm font-semibold shrink-0">${b.amount.toLocaleString("es-CL")}</p>
                <span
                  className="text-xs px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    backgroundColor: b.status === "confirmado" ? "#dbeafe" : b.status === "pendiente" ? "#fef3c7" : "#d1fae5",
                    color: b.status === "confirmado" ? "#1d4ed8" : b.status === "pendiente" ? "#92400e" : "#065f46",
                  }}
                >
                  {b.status}
                </span>
                {b.status === "pendiente" && (
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>Aceptar</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: "var(--secondary)", color: "var(--muted-foreground)" }}>Declinar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface MobileShellProps {
  view: string;
  onboardingStep: number;
  setOnboardingStep: (n: number) => void;
  setView: (v: any) => void;
  showPassword: boolean;
  setShowPassword: (b: boolean) => void;
  email: string;
  setEmail: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  emailFocused: boolean;
  setEmailFocused: (b: boolean) => void;
  passFocused: boolean;
  setPassFocused: (b: boolean) => void;
  regName: string;
  setRegName: (s: string) => void;
  regPhone: string;
  setRegPhone: (s: string) => void;
  regConfirm: string;
  setRegConfirm: (s: string) => void;
  regRole: string;
  setRegRole: (r: any) => void;
}

const ONBOARDING_SLIDES = [
  {
    icon: (
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        {/* Rings */}
        <circle cx="110" cy="110" r="95" stroke="#38D9D9" strokeWidth="1" strokeDasharray="3 5" opacity="0.2" />
        <circle cx="110" cy="110" r="70" stroke="#38D9D9" strokeWidth="1" strokeDasharray="3 5" opacity="0.15" />
        {/* Road */}
        <ellipse cx="110" cy="175" rx="78" ry="13" fill="#e2ddd5" />
        <rect x="96" y="173" width="28" height="3" rx="1.5" fill="#f7f5f0" opacity="0.7" />
        {/* Car */}
        <rect x="54" y="148" width="112" height="30" rx="7" fill="#1c1917" />
        <path d="M72 148 C76 132 83 126 97 124 L123 124 C137 124 144 132 148 148 Z" fill="#2a2724" />
        <path d="M77 148 C80 136 86 130 97 128 L110 128 L110 148 Z" fill="#38D9D9" opacity="0.3" />
        <path d="M143 148 C140 136 134 130 123 128 L110 128 L110 148 Z" fill="#38D9D9" opacity="0.3" />
        <rect x="110" y="127" width="2" height="21" rx="1" fill="#1c1917" opacity="0.5" />
        <rect x="158" y="155" width="10" height="5" rx="2.5" fill="#38D9D9" opacity="0.9" />
        <rect x="52" y="155" width="8" height="5" rx="2.5" fill="#ff8080" opacity="0.7" />
        <circle cx="80" cy="178" r="12" fill="#111" /><circle cx="80" cy="178" r="7" fill="#2a2724" /><circle cx="80" cy="178" r="3" fill="#444" />
        <circle cx="140" cy="178" r="12" fill="#111" /><circle cx="140" cy="178" r="7" fill="#2a2724" /><circle cx="140" cy="178" r="3" fill="#444" />
        {/* Pin */}
        <path d="M110 20 C96 20 84 32 84 46 C84 64 110 92 110 92 C110 92 136 64 136 46 C136 32 124 20 110 20 Z" fill="#38D9D9" />
        <circle cx="110" cy="46" r="11" fill="#f7f5f0" />
        <text x="110" y="51" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill="#38D9D9">P</text>
        {/* Pulse */}
        <circle cx="110" cy="46" r="22" stroke="#38D9D9" strokeWidth="1" opacity="0.2" fill="none" />
        <circle cx="110" cy="46" r="32" stroke="#38D9D9" strokeWidth="0.75" opacity="0.1" fill="none" />
        {/* Mini pins */}
        <circle cx="44" cy="100" r="5" fill="#38D9D9" opacity="0.4" />
        <line x1="44" y1="105" x2="44" y2="113" stroke="#38D9D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <circle cx="178" cy="118" r="4" fill="#38D9D9" opacity="0.3" />
        <line x1="178" y1="122" x2="178" y2="129" stroke="#38D9D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    label: "Paso 1 de 3",
    title: "Encuentra espacios\ncerca de ti",
    body: "Descubre lugares disponibles para estacionar sin perder tiempo buscando en el mapa.",
  },
  {
    icon: (
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        {/* Phone */}
        <rect x="68" y="28" width="84" height="152" rx="18" fill="#1c1917" />
        <rect x="74" y="38" width="72" height="132" rx="12" fill="#2a2724" />
        {/* Screen content */}
        <rect x="82" y="50" width="56" height="8" rx="4" fill="#38D9D9" opacity="0.8" />
        <rect x="82" y="64" width="38" height="5" rx="2.5" fill="#444" opacity="0.6" />
        {/* Card */}
        <rect x="82" y="78" width="56" height="44" rx="8" fill="#1c1917" />
        <rect x="88" y="85" width="32" height="5" rx="2.5" fill="#38D9D9" opacity="0.7" />
        <rect x="88" y="95" width="22" height="4" rx="2" fill="#555" opacity="0.5" />
        <rect x="88" y="105" width="40" height="10" rx="5" fill="#38D9D9" />
        <text x="108" y="114" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#1c1917">RESERVAR</text>
        {/* Checkmark animation */}
        <circle cx="110" cy="148" r="18" fill="#38D9D9" opacity="0.15" />
        <circle cx="110" cy="148" r="12" fill="#38D9D9" />
        <path d="M104 148 L108 152 L117 143" stroke="#f7f5f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Notch */}
        <rect x="96" y="32" width="28" height="6" rx="3" fill="#111" />
        {/* Sparkles */}
        <path d="M52 70 L54 64 L56 70 L62 72 L56 74 L54 80 L52 74 L46 72 Z" fill="#38D9D9" opacity="0.5" />
        <path d="M162 110 L163.5 106 L165 110 L169 111.5 L165 113 L163.5 117 L162 113 L158 111.5 Z" fill="#38D9D9" opacity="0.35" />
        <path d="M56 140 L57 138 L58 140 L60 141 L58 142 L57 144 L56 142 L54 141 Z" fill="#38D9D9" opacity="0.3" />
      </svg>
    ),
    label: "Paso 2 de 3",
    title: "Reserva en\nsegundos",
    body: "Elige tu espacio, confirma la reserva y recibe instrucciones al instante. Todo desde tu teléfono.",
  },
  {
    icon: (
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        {/* House */}
        <path d="M110 38 L162 78 L162 172 L58 172 L58 78 Z" fill="#2a2724" />
        <path d="M50 82 L110 34 L170 82" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Garage door */}
        <rect x="78" y="120" width="64" height="52" rx="4" fill="#1c1917" />
        <rect x="80" y="122" width="60" height="48" rx="3" fill="#38D9D9" opacity="0.12" />
        {/* Door lines */}
        <line x1="80" y1="138" x2="140" y2="138" stroke="#38D9D9" strokeWidth="1" opacity="0.35" />
        <line x1="80" y1="152" x2="140" y2="152" stroke="#38D9D9" strokeWidth="1" opacity="0.35" />
        <line x1="80" y1="166" x2="140" y2="166" stroke="#38D9D9" strokeWidth="1" opacity="0.35" />
        <circle cx="110" cy="147" r="3" fill="#38D9D9" opacity="0.6" />
        {/* Window */}
        <rect x="84" y="88" width="22" height="22" rx="4" fill="#38D9D9" opacity="0.2" />
        <rect x="114" y="88" width="22" height="22" rx="4" fill="#38D9D9" opacity="0.2" />
        {/* Coin stack */}
        <ellipse cx="168" cy="146" rx="18" ry="6" fill="#38D9D9" opacity="0.9" />
        <rect x="150" y="132" width="36" height="14" rx="2" fill="#38D9D9" opacity="0.7" />
        <ellipse cx="168" cy="132" rx="18" ry="6" fill="#38D9D9" />
        <ellipse cx="168" cy="120" rx="18" ry="6" fill="#38D9D9" opacity="0.9" />
        <rect x="150" y="106" width="36" height="14" rx="2" fill="#38D9D9" opacity="0.7" />
        <ellipse cx="168" cy="106" rx="18" ry="6" fill="#38D9D9" />
        {/* Dollar sign */}
        <text x="168" y="112" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#1c1917">$</text>
        {/* Arrow up */}
        <path d="M168 85 L168 68" stroke="#38D9D9" strokeWidth="2" strokeLinecap="round" />
        <path d="M162 75 L168 68 L174 75" stroke="#38D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Sparkles */}
        <path d="M46 100 L47.5 96 L49 100 L53 101.5 L49 103 L47.5 107 L46 103 L42 101.5 Z" fill="#38D9D9" opacity="0.45" />
        <path d="M52 60 L53 58 L54 60 L56 61 L54 62 L53 64 L52 62 L50 61 Z" fill="#38D9D9" opacity="0.3" />
      </svg>
    ),
    label: "Paso 3 de 3",
    title: "Gana con tu\nespacio libre",
    body: "Publica tu cochera o garaje y empieza a generar ingresos extra cuando no la estés usando.",
  },
];

function MobileShell({
  view, onboardingStep, setOnboardingStep, setView,
  showPassword, setShowPassword, email, setEmail,
  password, setPassword, emailFocused, setEmailFocused,
  passFocused, setPassFocused,
  regName, setRegName, regPhone, setRegPhone,
  regConfirm, setRegConfirm, regRole, setRegRole,
}: MobileShellProps) {
  const slide = ONBOARDING_SLIDES[onboardingStep];

  const frameStyle: React.CSSProperties = {
    width: "390px",
    height: "844px",
    backgroundColor: "#f7f5f0",
    boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.07)",
    borderRadius: "48px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  };

  const LogoMark = ({ size = 36 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="26" stroke="#38D9D9" strokeWidth="1.5" opacity="0.25" />
      <circle cx="28" cy="28" r="18" stroke="#38D9D9" strokeWidth="1.5" opacity="0.45" />
      <circle cx="28" cy="28" r="9" fill="#38D9D9" />
      <circle cx="28" cy="28" r="4" fill="#f7f5f0" />
    </svg>
  );

  const Glow = () => (
    <div style={{
      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
      width: "340px", height: "260px",
      background: "radial-gradient(ellipse at 50% 0%, rgba(56,217,217,0.16) 0%, transparent 68%)",
      pointerEvents: "none",
    }} />
  );

  const PrimaryBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      style={{
        width: "100%", padding: "18px 0", borderRadius: "20px",
        backgroundColor: "#38D9D9", color: "#1c1917",
        fontSize: "15px", fontWeight: 600, border: "none",
        cursor: "pointer", letterSpacing: "0.01em",
        fontFamily: "var(--font-body)",
        transition: "opacity 0.15s, transform 0.15s",
      }}
    >
      {label}
    </button>
  );

  /* ── WELCOME ── */
  if (view === "welcome") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div style={frameStyle}>
        <Glow />
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", padding: "64px 40px 48px" }}>
          {/* Center block */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, justifyContent: "center", gap: "0" }}>
            <LogoMark size={52} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "58px", fontWeight: 300, letterSpacing: "-0.045em", color: "var(--foreground)", lineHeight: 1, margin: "20px 0 48px" }}>
              LUMO
            </h1>
            <div style={{ width: "28px", height: "1.5px", backgroundColor: "#38D9D9", marginBottom: "36px", opacity: 0.65 }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 300, lineHeight: 1.25, color: "var(--foreground)", textAlign: "center", marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Encuentra tu espacio.{" "}
              <em style={{ fontStyle: "italic", color: "#38D9D9" }}>Muévete con Lumo.</em>
            </p>
            <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "var(--muted-foreground)", textAlign: "center", maxWidth: "260px" }}>
              Encuentra, reserva y disfruta de un espacio para estacionar de forma rápida y segura.
            </p>
          </div>
          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <PrimaryBtn label="Comenzar" onClick={() => { setOnboardingStep(0); setView("onboarding"); }} />
            <button
              onClick={() => setView("login")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}
            >
              ¿Ya tienes una cuenta?{" "}
              <span style={{ color: "#38D9D9", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>Inicia sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── ONBOARDING ── */
  if (view === "onboarding") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div style={frameStyle}>
        <Glow />
        {/* Top bar */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 36px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LogoMark size={24} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 300, color: "#38D9D9", letterSpacing: "-0.02em" }}>LUMO</span>
          </div>
          <button
            onClick={() => setView("login")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}
          >
            Omitir
          </button>
        </div>

        {/* Illustration */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", flex: "1 0 auto", maxHeight: "340px" }}>
          <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,217,217,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
          {slide.icon}
        </div>

        {/* Text + controls */}
        <div style={{ position: "relative", zIndex: 10, padding: "0 36px 44px" }}>
          {/* Step label */}
          <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#38D9D9", marginBottom: "10px" }}>
            {slide.label}
          </p>

          {/* Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "18px" }}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setOnboardingStep(i)}
                style={{
                  width: i === onboardingStep ? "28px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  backgroundColor: "#38D9D9",
                  opacity: i === onboardingStep ? 1 : 0.22,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s, opacity 0.3s",
                }}
              />
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.025em", color: "var(--foreground)", marginBottom: "12px", whiteSpace: "pre-line" }}>
            {slide.title}
          </h2>
          <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "var(--muted-foreground)", marginBottom: "28px", maxWidth: "290px" }}>
            {slide.body}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {onboardingStep > 0 && (
              <button
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                style={{
                  width: "54px", height: "54px", borderRadius: "16px", border: "1.5px solid var(--border)",
                  backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#38D9D9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
            )}
            <div style={{ flex: 1 }}>
              <PrimaryBtn
                label={onboardingStep === 2 ? "Empezar ahora" : "Siguiente"}
                onClick={() => onboardingStep === 2 ? setView("login") : setOnboardingStep(onboardingStep + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── REGISTER ── */
  if (view === "register") {
    const Field = ({
      label, value, onChange, type = "text", placeholder, icon,
    }: { label: string; value: string; onChange: (s: string) => void; type?: string; placeholder: string; icon: React.ReactNode }) => {
      const [focused, setFocused] = React.useState(false);
      return (
        <div>
          <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase" as const, color: focused ? "#38D9D9" : "var(--muted-foreground)", marginBottom: "6px", transition: "color 0.15s" }}>
            {label}
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderRadius: "16px", border: `1.5px solid ${focused ? "#38D9D9" : "var(--border)"}`, backgroundColor: focused ? "rgba(56,217,217,0.04)" : "#fff", transition: "border-color 0.15s, background-color 0.15s" }}>
            <span style={{ color: focused ? "#38D9D9" : "#a8a29e", flexShrink: 0, display: "flex", transition: "color 0.15s" }}>{icon}</span>
            <input
              type={type} placeholder={placeholder} value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "var(--foreground)", fontFamily: "var(--font-body)", letterSpacing: type === "password" ? "0.08em" : "normal" }}
            />
          </div>
        </div>
      );
    };

    const roles: { id: "renter" | "host" | "both"; emoji: string; label: string; sub: string }[] = [
      { id: "renter", emoji: "🚗", label: "Buscar un espacio", sub: "Encuentra dónde estacionar" },
      { id: "host",   emoji: "🏠", label: "Publicar un espacio", sub: "Arrienda tu cochera" },
      { id: "both",   emoji: "🔄", label: "Ambas opciones", sub: "Lo mejor de los dos mundos" },
    ];

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <div style={frameStyle}>
          <Glow />
          {/* Scrollable inner */}
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", padding: "52px 36px 40px" }}>

            {/* Back + Logo */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
              <button onClick={() => setView("login")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)", fontFamily: "var(--font-body)", fontSize: "13px", padding: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Volver
              </button>
              <LogoMark size={28} />
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--foreground)", marginBottom: "8px" }}>
              Crea tu cuenta
            </h1>
            <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--muted-foreground)", marginBottom: "26px", maxWidth: "260px" }}>
              Empieza a disfrutar de una forma más fácil de estacionar.
            </p>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              <Field label="Nombre completo" value={regName} onChange={setRegName} placeholder="Juan Pérez"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>} />
              <Field label="Correo electrónico" value={email} onChange={setEmail} type="email" placeholder="tu@correo.com"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>} />
              <Field label="Número de teléfono" value={regPhone} onChange={setRegPhone} type="tel" placeholder="+56 9 1234 5678"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} />
              <Field label="Contraseña" value={password} onChange={setPassword} type="password" placeholder="Mínimo 8 caracteres"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} />
              <Field label="Confirmar contraseña" value={regConfirm} onChange={setRegConfirm} type="password" placeholder="Repite tu contraseña"
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>} />
            </div>

            {/* Role selector */}
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "var(--muted-foreground)", marginBottom: "12px" }}>
              ¿Cómo quieres utilizar Lumo?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "26px" }}>
              {roles.map((r) => {
                const active = regRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setRegRole(r.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 16px", borderRadius: "16px", cursor: "pointer",
                      border: `1.5px solid ${active ? "#38D9D9" : "var(--border)"}`,
                      backgroundColor: active ? "rgba(56,217,217,0.07)" : "#fff",
                      transition: "border-color 0.15s, background-color 0.15s",
                      textAlign: "left" as const,
                    }}
                  >
                    <span style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>{r.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13.5px", fontWeight: 600, color: active ? "#1c1917" : "var(--foreground)", margin: 0, lineHeight: 1.2 }}>{r.label}</p>
                      <p style={{ fontSize: "11.5px", color: "var(--muted-foreground)", margin: "2px 0 0", lineHeight: 1.3 }}>{r.sub}</p>
                    </div>
                    {/* Check */}
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${active ? "#38D9D9" : "var(--border)"}`, backgroundColor: active ? "#38D9D9" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {active && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <PrimaryBtn label="Crear cuenta" onClick={() => setView("home")} />

            <div style={{ textAlign: "center", marginTop: "18px" }}>
              <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>¿Ya tienes una cuenta? </span>
              <button onClick={() => setView("login")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: "#38D9D9", fontFamily: "var(--font-body)", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0 }}>
                Inicia sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── LOGIN ── */
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <div style={frameStyle}>
        <Glow />
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", padding: "56px 36px 36px" }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
            <LogoMark size={34} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, letterSpacing: "-0.04em", color: "var(--foreground)", marginTop: "10px", lineHeight: 1 }}>LUMO</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--foreground)", marginBottom: "8px" }}>
              Bienvenido<br />de nuevo
            </h1>
            <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--muted-foreground)", maxWidth: "240px" }}>
              Ingresa a tu cuenta y encuentra tu próximo espacio.
            </p>
          </div>

          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "10px" }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: emailFocused ? "#38D9D9" : "var(--muted-foreground)", marginBottom: "7px", transition: "color 0.15s" }}>
                Correo electrónico
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px 16px", borderRadius: "16px", border: `1.5px solid ${emailFocused ? "#38D9D9" : "var(--border)"}`, backgroundColor: emailFocused ? "rgba(56,217,217,0.04)" : "#fff", transition: "border-color 0.15s, background-color 0.15s" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={emailFocused ? "#38D9D9" : "#a8a29e"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "stroke 0.15s" }}>
                  <rect width="20" height="16" x="2" y="4" rx="3" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "var(--foreground)", fontFamily: "var(--font-body)" }} />
              </div>
            </div>
            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: passFocused ? "#38D9D9" : "var(--muted-foreground)", marginBottom: "7px", transition: "color 0.15s" }}>
                Contraseña
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px 16px", borderRadius: "16px", border: `1.5px solid ${passFocused ? "#38D9D9" : "var(--border)"}`, backgroundColor: passFocused ? "rgba(56,217,217,0.04)" : "#fff", transition: "border-color 0.15s, background-color 0.15s" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={passFocused ? "#38D9D9" : "#a8a29e"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "stroke 0.15s" }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setPassFocused(true)} onBlur={() => setPassFocused(false)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "var(--foreground)", fontFamily: "var(--font-body)", letterSpacing: showPassword ? "normal" : "0.08em" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#a8a29e", display: "flex", flexShrink: 0 }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "22px" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12.5px", color: "#38D9D9", fontWeight: 500, fontFamily: "var(--font-body)" }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <PrimaryBtn label="Iniciar sesión" onClick={() => setView("home")} />

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "18px 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>o continúa con</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "auto" }}>
            {[
              { label: "Google", icon: <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { label: "Apple", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            ].map((s) => (
              <button key={s.label}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#38D9D9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "13px", borderRadius: "14px", border: "1.5px solid var(--border)", backgroundColor: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 500, color: "var(--foreground)", fontFamily: "var(--font-body)", transition: "border-color 0.15s" }}>
                {s.icon}{s.label}
              </button>
            ))}
          </div>

          {/* Sign up */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>¿No tienes una cuenta? </span>
            <button onClick={() => setView("register")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: "#38D9D9", fontFamily: "var(--font-body)", textDecoration: "underline", textUnderlineOffset: "3px", padding: 0 }}>
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotCard({ spot, onClick, StarIcon }: { spot: Spot; onClick: () => void; StarIcon: () => React.ReactElement }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] group w-full"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="relative overflow-hidden" style={{ height: "200px", backgroundColor: "var(--muted)" }}>
        <img
          src={spot.image}
          alt={spot.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!spot.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">No disponible</span>
          </div>
        )}
        <span
          className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(247,245,240,0.9)", color: "var(--foreground)" }}
        >
          {spot.type}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-medium text-sm leading-tight">{spot.title}</p>
          <div className="flex items-center gap-1 text-xs shrink-0 font-medium">
            <StarIcon />
            {spot.rating}
          </div>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{spot.neighborhood}</p>
        <p className="text-sm font-semibold">
          ${spot.price.toLocaleString("es-CL")}
          <span className="font-normal text-xs" style={{ color: "var(--muted-foreground)" }}> /día</span>
        </p>
      </div>
    </button>
  );
}
