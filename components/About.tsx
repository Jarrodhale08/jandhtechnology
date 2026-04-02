const techStack = [
  "React Native",
  "Expo SDK 54",
  "TypeScript",
  "Supabase",
  "iOS / StoreKit",
  "Android / Play Billing",
  "Expo Router",
  "Tailwind CSS",
  "Fastlane",
  "EAS Build",
  "PostgreSQL",
  "Node.js",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              A Dedicated
              <br />
              <span className="gradient-text">Mobile Studio</span>
            </h2>
            <div className="space-y-4 text-[#ababab] leading-relaxed">
              <p>
                J&H Technology LLC is a mobile app development studio focused exclusively on
                building high-quality iOS and Android applications. We work with entrepreneurs,
                small businesses, and startups to bring their app ideas to life.
              </p>
              <p>
                We use React Native for cross-platform development, which means your app is
                built once and runs natively on both iOS and Android — without sacrificing
                performance or user experience.
              </p>
              <p>
                Every app we build includes direct in-app purchase integration, Supabase
                backend, push notifications, and full App Store launch support.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                J
              </div>
              <div>
                <div className="text-white font-semibold">Jarrod Hale</div>
                <div className="text-[#ababab] text-sm">Founder, J&H Technology LLC</div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-6 text-lg">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-[#ababab] text-sm">Apps Shipped</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-3xl font-bold text-white mb-1">2</div>
                <div className="text-[#ababab] text-sm">Platforms</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-[#ababab] text-sm">Custom Built</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <div className="text-3xl font-bold text-white mb-1">USA</div>
                <div className="text-[#ababab] text-sm">Based</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
