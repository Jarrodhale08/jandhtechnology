const apps = [
  {
    name: "SplitSmart",
    category: "Finance",
    description: "Split bills and track shared expenses with friends, roommates, and travel groups.",
    color: "from-green-500 to-emerald-600",
    icon: "💸",
    tags: ["iOS", "Android"],
  },
  {
    name: "PlantPulse",
    category: "Home & Garden",
    description: "Track watering schedules, identify plants, and keep your garden thriving.",
    color: "from-green-600 to-teal-600",
    icon: "🌿",
    tags: ["iOS", "Android"],
  },
  {
    name: "MealPrepPro",
    category: "Food & Drink",
    description: "Plan weekly meals, generate shopping lists, and track nutrition with ease.",
    color: "from-orange-500 to-rose-500",
    icon: "🥗",
    tags: ["iOS", "Android"],
  },
  {
    name: "HabitForge",
    category: "Productivity",
    description: "Build lasting habits with streak tracking, reminders, and habit insights.",
    color: "from-purple-500 to-indigo-600",
    icon: "🔥",
    tags: ["iOS", "Android"],
  },
  {
    name: "PetPal",
    category: "Pets",
    description: "Track pet health, feeding schedules, vet appointments, and cherished memories.",
    color: "from-pink-500 to-rose-600",
    icon: "🐾",
    tags: ["iOS", "Android"],
  },
  {
    name: "GigGuard",
    category: "Freelance",
    description: "Track gigs, log expenses, and generate invoices for freelancers and contractors.",
    color: "from-blue-500 to-indigo-600",
    icon: "💼",
    tags: ["iOS", "Android"],
  },
];

export default function Apps() {
  return (
    <section id="apps" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Apps We&apos;ve
            <br />
            <span className="gradient-text">Built & Launched</span>
          </h2>
          <p className="text-[#ababab] text-lg max-w-2xl mx-auto">
            A selection of mobile apps across categories — all built with React Native and
            shipped to the App Store and Google Play.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.name}
              className="card-hover rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${app.color} flex items-center justify-center text-5xl`}>
                {app.icon}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                    <span className="text-xs text-indigo-400 font-medium">{app.category}</span>
                  </div>
                  <div className="flex gap-1">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#ababab]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[#ababab] text-sm leading-relaxed">{app.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#ababab] text-sm">
            Have an app idea?{" "}
            <a href="#contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
              Let&apos;s build it together.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
