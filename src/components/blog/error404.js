import laptopImg from "../../Assets/about.webp";

function Blog() {
  return (
    <div className="page-section blog-page">
      <div className="container about-intro">
        <div>
          <h1>Aguardando <strong className="purple">Novidades</strong></h1>
          <p className="blog-message">
            <span className="purple">Não fique triste</span>. Logo, logo esta página irá
            <span className="purple"> funcionar</span>,<br />
            apenas <span className="purple">aguarde um pouco</span>.<br />
            Em breve <span className="purple">NOVIDADES!!</span>
          </p>
        </div>
        <img src={laptopImg} alt="" width="720" height="496" decoding="async" />
      </div>
    </div>
  );
}

export default Blog;
