import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              J
            </div>
            <span className="font-semibold text-white">J&H Technology LLC</span>
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#ababab]"
          >
            <Link href="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/#apps" className="hover:text-white transition-colors">
              Apps
            </Link>
            <Link href="/#process" className="hover:text-white transition-colors">
              Process
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span aria-hidden="true" className="hidden md:inline text-white/10">
              |
            </span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </nav>

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
