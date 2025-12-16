export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "droit",
    name: "Droit et Administration",
    icon: "⚖️",
    subcategories: [
      { id: "avocat-affaires", name: "Avocats d'affaires" },
      { id: "avocat-familial", name: "Avocats droit familial" },
      { id: "avocat-fiscal", name: "Avocats fiscal & successions" },
      { id: "avocat-penal", name: "Avocats pénal" },
      { id: "avocat-immobilier", name: "Avocats droit immobilier" },
      { id: "notaire", name: "Notaires" },
      { id: "traducteur", name: "Traducteurs assermentés" },
      { id: "juriste", name: "Juristes / Médiateurs" },
      { id: "immigration", name: "Conseillers immigration" },
    ],
  },
  {
    id: "finance",
    name: "Finance, fiscalité et gestion",
    icon: "💰",
    subcategories: [
      { id: "expert-comptable", name: "Experts-comptables" },
      { id: "conseiller-fiscal", name: "Conseillers fiscaux" },
      { id: "gestionnaire-patrimoine", name: "Gestionnaires de patrimoine" },
      { id: "courtier", name: "Courtiers" },
    ],
  },
  {
    id: "immobilier",
    name: "Immobilier et installation",
    icon: "🏠",
    subcategories: [
      { id: "agent-immobilier", name: "Agents immobiliers" },
      { id: "chasseur", name: "Chasseurs immobiliers" },
      { id: "architecte", name: "Architectes" },
      { id: "decorateur", name: "Décorateurs d'intérieur" },
    ],
  },
  {
    id: "entrepreneuriat",
    name: "Création et gestion d'entreprise",
    icon: "🚀",
    subcategories: [
      { id: "consultant-business", name: "Consultants business" },
      { id: "coach-entrepreneur", name: "Coachs entrepreneurs" },
      { id: "expert-export", name: "Experts import/export" },
      { id: "marketing", name: "Experts marketing" },
    ],
  },
];

export const countries = [
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "maroc", name: "Maroc", flag: "🇲🇦" },
];

export const cities: Record<string, { id: string; name: string }[]> = {
  france: [
    { id: "all", name: "Peu importe" },
    { id: "paris", name: "Paris" },
    { id: "lyon", name: "Lyon" },
    { id: "marseille", name: "Marseille" },
    { id: "toulouse", name: "Toulouse" },
    { id: "bordeaux", name: "Bordeaux" },
    { id: "nice", name: "Nice" },
    { id: "lille", name: "Lille" },
  ],
  maroc: [
    { id: "all", name: "Peu importe" },
    { id: "casablanca", name: "Casablanca" },
    { id: "rabat", name: "Rabat" },
    { id: "marrakech", name: "Marrakech" },
    { id: "tanger", name: "Tanger" },
    { id: "fes", name: "Fès" },
    { id: "agadir", name: "Agadir" },
  ],
};
