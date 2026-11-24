import { Icon, type IconName } from "./Icon";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const GRADS = [
  "from-amber-400 to-orange-600",
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-green-600",
  "from-fuchsia-400 to-pink-600",
  "from-violet-400 to-indigo-600",
  "from-cyan-400 to-teal-600",
  "from-rose-400 to-red-600",
  "from-lime-400 to-emerald-600",
];

/** Colourful gradient icon tile (premium look). */
export function ColorIcon({ name, i, size = "md" }: { name: IconName; i: number; size?: "sm" | "md" | "lg" }) {
  const box = size === "sm" ? "h-10 w-10 rounded-xl" : size === "lg" ? "h-16 w-16 rounded-2xl" : "h-12 w-12 rounded-2xl";
  const px = size === "sm" ? 20 : size === "lg" ? 32 : 24;
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center bg-gradient-to-br text-white shadow-[0_10px_20px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/40", GRADS[i % GRADS.length], box)}>
      <Icon name={name} size={px} strokeWidth={2.3} />
    </span>
  );
}
