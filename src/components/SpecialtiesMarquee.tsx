import { motion } from "framer-motion";
import { Scale, Coins, Home, Rocket, BookOpen, Heart } from "lucide-react";

const specialties = [
  { name: "Droit et administratif", icon: Scale },
  { name: "Finance et fiscalité", icon: Coins },
  { name: "Immobilier", icon: Home },
  { name: "Entrepreneuriat", icon: Rocket },
  { name: "Éducation", icon: BookOpen },
  { name: "Santé et bien-être", icon: Heart },
];

// Duplicate for seamless loop
const duplicatedSpecialties = [...specialties, ...specialties, ...specialties];

const SpecialtiesMarquee = () => {
  return (
    <section className="w-full bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-8 overflow-hidden">
      <motion.div
        className="flex gap-16 items-center"
        animate={{
          x: [0, -1200],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedSpecialties.map((specialty, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <specialty.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-foreground/80 font-medium whitespace-nowrap text-sm">
              {specialty.name}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default SpecialtiesMarquee;
