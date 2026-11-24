import GoogleAnalytics from "./GoogleAnalytics";
import SocialLinks from "./SocialLinks";

const measurementId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

function Footer() {
  const showAnalytics = process.env.NODE_ENV === "production" &&
    window.location.hostname === "www.brayan.blog" && /^G-[A-Z0-9]+$/.test(measurementId);

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>Desenvolvedor Web | Brayan A. Pletsch |</p>
        <p>Copyright © {new Date().getFullYear()}</p>
        <SocialLinks />
      </div>
      {showAnalytics && <GoogleAnalytics measurementId={measurementId} />}
    </footer>
  );
}

export default Footer;
