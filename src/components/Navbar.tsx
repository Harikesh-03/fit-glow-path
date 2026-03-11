import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Features", "Workouts", "Community", "Pricing"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/30">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5 font-display font-extrabold text-xl text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary-sm">
            <Activity className="h-4.5 w-4.5 text-primary" />
          </div>
          <span>PULSE<span className="text-gradient-primary">FIT</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium">
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
            className="md:hidden overflow-hidden glass-surface border-t border-border/30"
          >
            <div className="container py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary py-2 font-medium">
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
