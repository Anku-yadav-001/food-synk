import { ArrowRight, BarChart3, Bell, Check, ChefHat, ChevronRight, ClipboardList, Clock, ConciergeBell, Eye, EyeOff, HandHeart, Heart, Home, Info, Leaf, ListChecks, Lock, Mail, MapPin, Plus, User, Users, Utensils, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  mail: Mail, lock: Lock, eye: Eye, eyeoff: EyeOff, arrow: ArrowRight, bell: Bell, user: User, utensils: Utensils, leaf: Leaf,
  users: Users, cloche: ConciergeBell, plus: Plus, clipboard: ClipboardList, chart: BarChart3, info: Info, home: Home, pin: MapPin,
  clock: Clock, chevron: ChevronRight, heart: Heart, chef: ChefHat, list: ListChecks, check: Check, handheart: HandHeart,
};

export default function Icon({ name, className = "h-6 w-6", filled = false }: { name: string; className?: string; filled?: boolean }) {
  const C = ICONS[name] ?? Info;
  return <C strokeWidth={1.7} className={`${className} ${filled ? "fill-current" : ""}`} aria-hidden="true" />;
}
