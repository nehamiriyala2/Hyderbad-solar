import {
  Sun, Zap, House, Building2, Store, School, Tractor, Plane, BatteryCharging, ShieldCheck, IndianRupee,
  Leaf, TrendingUp, FileText, Wrench, Gauge, CircleCheck, CircleX, MessageCircle, Phone, MapPin, ArrowRight,
  Calculator, Cloud, CloudRain, Snowflake, Fan, Lightbulb, Refrigerator, Tv, AirVent, Droplets, Monitor, Clock,
  Users, Stethoscope, UtensilsCrossed, Scissors, Dumbbell, Smartphone, Printer, Factory, Milk, ShoppingCart, Pill,
  Camera, KeyRound, CircleHelp, Sparkles, Hammer, Landmark, Banknote, Receipt, ClipboardCheck, Ruler, PlugZap,
  UtilityPole, Award, HeartHandshake, TreePine, BookOpen, Search, Mail, CloudSun, Sunrise, Wallet, CalendarClock,
  FileCheck, BadgeCheck, TriangleAlert, Info, Globe, HandCoins, Percent, Scale, Warehouse, Ban, Cable, Moon, Battery, LayoutGrid,
  type LucideProps,
} from "lucide-react";

const MAP = {
  Sun, Zap, House, Building2, Store, School, Tractor, Plane, BatteryCharging, ShieldCheck, IndianRupee,
  Leaf, TrendingUp, FileText, Wrench, Gauge, CircleCheck, CircleX, MessageCircle, Phone, MapPin, ArrowRight,
  Calculator, Cloud, CloudRain, Snowflake, Fan, Lightbulb, Refrigerator, Tv, AirVent, Droplets, Monitor, Clock,
  Users, Stethoscope, UtensilsCrossed, Scissors, Dumbbell, Smartphone, Printer, Factory, Milk, ShoppingCart, Pill,
  Camera, KeyRound, CircleHelp, Sparkles, Hammer, Landmark, Banknote, Receipt, ClipboardCheck, Ruler, PlugZap,
  UtilityPole, Award, HeartHandshake, TreePine, BookOpen, Search, Mail, CloudSun, Sunrise, Wallet, CalendarClock,
  FileCheck, BadgeCheck, TriangleAlert, Info, Globe, HandCoins, Percent, Scale, Warehouse, Ban, Cable, Moon, Battery, LayoutGrid,
};

export type IconName = keyof typeof MAP;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = MAP[name];
  return <C aria-hidden="true" strokeWidth={2.1} {...props} />;
}
