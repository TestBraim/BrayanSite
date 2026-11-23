import SocialLinks from "./SocialLinks";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>Desenvolvedor Web | Brayan A. Pletsch |</p>
        <p>Copyright © {new Date().getFullYear()}</p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
