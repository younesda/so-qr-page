import { motion } from "framer-motion";
import { FaChartLine, FaQrcode } from "react-icons/fa";

interface FooterCardProps {
  visitsCount?: number;
  scansCount?: number;
}

export const FooterCard = ({ visitsCount = 0, scansCount = 0 }: FooterCardProps) => {
  return (
    <motion.footer
      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-xl shadow-black/20 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-white/65">Performance</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/10 p-3">
          <p className="mb-1 inline-flex items-center gap-2 text-xs text-white/70">
            <FaQrcode /> Scans QR
          </p>
          <p className="text-2xl font-semibold">{scansCount}</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="mb-1 inline-flex items-center gap-2 text-xs text-white/70">
            <FaChartLine /> Visites
          </p>
          <p className="text-2xl font-semibold">{visitsCount}</p>
        </div>
      </div>
    </motion.footer>
  );
};
