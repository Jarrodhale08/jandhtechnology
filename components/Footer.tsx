export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              J
            </div>
            <span className="font-semibold text-white">J&H Technology LLC</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-[#ababab]">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#apps" className="hover:text-white transition-colors">Apps</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-sm text-[#ababab]">
            <a
              href="mailto:jarrod@jandhtechnology.com"
              className="hover:text-white transition-colors"
            >
              jarrod@jandhtechnology.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.04] text-center text-sm text-[#555]">
          Copyright &copy; {new Date().getFullYear()} J&H Technology LLC — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
