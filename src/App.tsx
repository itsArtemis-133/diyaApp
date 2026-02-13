import Landing from "./components/Landing";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-white flex items-center justify-center">

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 text-pink-400 text-4xl animate-pulse">💖</div>
        <div className="absolute bottom-20 right-20 text-rose-300 text-5xl animate-bounce">💕</div>
        <div className="absolute top-1/2 left-10 text-pink-300 text-3xl animate-ping">💗</div>
        <div className="absolute top-20 right-1/3 text-rose-400 text-4xl animate-pulse">💘</div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full">
        <Landing />
      </div>

    </div>
  );
}
