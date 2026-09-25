export function formatPickup(iso: string) {
  const d = new Date(iso), now = new Date();
  const day = Math.round((new Date(d.toDateString()).getTime() - new Date(now.toDateString()).getTime()) / 864e5);
  const time = d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }).toUpperCase();
  const label = day === 0 ? "Today" : day === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  return `${label}, ${time}`;
}
