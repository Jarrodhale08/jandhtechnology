const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a free consultation to understand your app idea, target audience, and business goals. We help you scope the MVP and set realistic timelines.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    description:
      "We design the UI/UX, plan the database schema, and establish the tech stack. You get a clear picture of what will be built before a single line of code is written.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build your app using React Native, with a Supabase backend. Regular updates keep you in the loop at every milestone. Both iOS and Android are developed in parallel.",
  },
  {
    number: "04",
    title: "Testing & QA",
    description:
      "Thorough testing on real devices, across iOS and Android. We test every user flow, payment path, and edge case before submitting.",
  },
  {
    number: "05",
    title: "App Store Launch",
    description:
      "We handle App Store Connect and Google Play Console submissions, screenshots, metadata, and compliance review. We don't stop until your app is live.",
  },
  {
    number: "06",
    title: "Ongoing Support",
    description:
      "Post-launch support for bug fixes, OS updates, and new features. We're a long-term partner, not a one-time contractor.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Development
            <br />
            <span className="gradient-text">Process</span>
          </h2>
          <p className="text-[#ababab] text-lg max-w-2xl mx-auto">
            A proven, transparent process from idea to App Store launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card-hover p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 relative"
            >
              <div className="text-5xl font-bold text-indigo-500/20 mb-4 font-mono">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-[#ababab] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
