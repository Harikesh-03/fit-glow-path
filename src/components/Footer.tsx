import { Activity } from "lucide-react";

const Footer = () => {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
    { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"] },
  ];

  return (
    <footer className="border-t border-border/50 py-16 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2 font-display font-extrabold text-lg text-foreground mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              PULSE<span className="text-gradient-primary">FIT</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered fitness for everyone. Train smarter, eat better, live stronger.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PulseFit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
