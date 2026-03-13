import { Heart } from "lucide-react";

const Footer = () => {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About Us", "Our Team", "Blog", "Careers"] },
    { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"] },
  ];

  return (
    <footer className="border-t border-border py-14">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-foreground mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary fill-primary/20" />
              </div>
              Pulse<span className="text-primary">Fit</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built by a team that believes fitness tech should feel personal, not corporate.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          Made with ❤️ by the PulseFit team · © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
