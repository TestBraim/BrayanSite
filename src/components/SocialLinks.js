import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export const githubProfile = "https://github.com/BrayanPletsch";

const socialLinks = [
  { name: "GitHub", href: githubProfile, Icon: AiFillGithub },
  {
    name: "WhatsApp",
    href: "https://wa.me/5561999177159?text=Ol%C3%A1%20Brayan!%20Gostaria%20de%20entrar%20em%20contato%20com%20voc%C3%AA",
    Icon: IoLogoWhatsapp,
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/brayan-pletsch/", Icon: FaLinkedinIn },
  { name: "Instagram", href: "https://www.instagram.com/brayan_pletsch/", Icon: AiFillInstagram },
];

function SocialLinks({ className = "" }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles -- Safari drops list semantics for list-style: none.
    <ul className={`social-links ${className}`} role="list" aria-label="Redes sociais">
      {socialLinks.map(({ name, href, Icon }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} (abre em nova aba)`}>
            <Icon aria-hidden="true" focusable="false" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
