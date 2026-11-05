import { ORG_NAME, type PortfolioApp } from "@/lib/apps";

export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function appFaq(app: PortfolioApp): { question: string; answer: string }[] {
  const native = app.platforms.filter((p) => p !== "Web");
  const where = [
    `${app.name} is available on ${joinList(native)}.`,
    app.webApp ? `It also works in a web browser at [${app.webApp.label}](${app.webApp.url}).` : "",
    app.iosStatus === "in-review" ? "The iPhone version is in App Review." : "",
    app.androidStatus === "coming-soon" ? "An Android version is coming soon; it is not on Google Play yet." : "",
  ]
    .filter(Boolean)
    .join(" ");
  const maker = app.creator
    ? `${app.name} is built and maintained by ${app.creator.name} and published on the app stores by ${ORG_NAME}.`
    : `${app.name} is developed and published by ${ORG_NAME}, a US mobile app developer.`;
  return [
    { question: `What is ${app.name}?`, answer: app.summary },
    { question: `How much does ${app.name} cost?`, answer: app.pricing },
    { question: `Which devices does ${app.name} work on?`, answer: where },
    {
      question: `Who makes ${app.name}?`,
      answer: `${maker} For help, see [${app.name} support](${app.supportUrl}).`,
    },
  ];
}
