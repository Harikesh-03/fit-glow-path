import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Features", "Plans", "Community", "About"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-foreground">
          <Activity className="h-6 w-6 text-primary" />
          <span>PULSE<span className="text-primary">FIT</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-surface border-t border-border/50"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary py-2">
                  {l}
                </a>
              ))}
              <Button variant="ghost" size="sm" className="justify-start">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
