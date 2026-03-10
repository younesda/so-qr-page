import { motion } from "framer-motion";

interface SectionWrapperProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper = ({ title, subtitle, children, className = "" }: SectionWrapperProps) => {
  return (
    <motion.section
      className={`rounded-3xl border border-white/12 bg-white/10 p-5 shadow-[0_24px_80px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6 ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {subtitle && <p className="text-xs uppercase tracking-[0.18em] text-white/55">{subtitle}</p>}
          {title && <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>}
        </header>
      )}
      {children}
    </motion.section>
  );
};
