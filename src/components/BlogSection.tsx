import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { blogArticles } from "@/data/blogArticles";

export const BlogSection = () => {
  // Show only first 3 articles on homepage
  const featuredArticles = blogArticles.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
              Blog & Actualités
            </h2>
            <p className="text-muted-foreground text-lg">
              Conseils, guides et témoignages pour la diaspora
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Voir tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
