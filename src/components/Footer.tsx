import { Activity } from "lucide-react";

const Footer = () => {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
    { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"] },
  ];

  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-foreground mb-4">
              <Activity className="h-5 w-5 text-primary" />
              PULSE<span className="text-primary">FIT</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered fitness for everyone. Train smarter, eat better, live stronger.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PulseFit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
