const services = [
  {
    icon: "📱",
    title: "iOS App Development",
    description:
      "Native-quality iOS apps built with React Native. Seamless App Store submission, TestFlight distribution, and in-app purchase integration.",
  },
  {
    icon: "🤖",
    title: "Android App Development",
    description:
      "Full Android support via React Native. Google Play submission, Play Billing integration, and thorough device testing.",
  },
  {
    icon: "💳",
    title: "Subscription Monetization",
    description:
      "Direct StoreKit and Google Play Billing integration. Monthly/yearly tiers, free trials, and premium feature gating — no third-party SDK required.",
  },
  {
    icon: "☁️",
    title: "Backend & Database",
    description:
      "Supabase-powered backends with real-time sync, row-level security, and multi-tenant architecture for all your app's data needs.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Clean, modern interfaces designed for conversion and retention. Custom design systems, smooth animations, and accessibility-first patterns.",
  },
  {
    icon: "🚀",
    title: "App Store Launch",
    description:
      "End-to-end store submission support. Screenshots, metadata, ASO keywords, review guidelines compliance, and expedited approval strategies.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full-Stack Mobile
            <br />
            <span className="gradient-text">Development</span>
          </h2>
          <p className="text-[#ababab] text-lg max-w-2xl mx-auto">
            From the first screen to the App Store — we handle the entire product lifecycle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-hover p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-[#ababab] text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
