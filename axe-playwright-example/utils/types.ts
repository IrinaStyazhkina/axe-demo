import AxeBuilder from "@axe-core/playwright";

export type AxeScanResult = Awaited<ReturnType<typeof AxeBuilder.prototype.analyze>>;

export type Impact = "critical" | "serious" | "moderate" | "minor";
