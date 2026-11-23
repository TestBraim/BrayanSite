import ProjectCard from "./ProjectCards";
import ngramas from "../../Assets/Projects/ngramas-notebook.webp";
import cadastro from "../../Assets/Projects/sistema-de-cadastro-notebook.webp";
import crud from "../../Assets/Projects/crud-js-notebook.webp";
import senhas from "../../Assets/Projects/password-generator-notebook.webp";
import cv from "../../Assets/Projects/curriculo-online-notebook.webp";
import qrcode from "../../Assets/Projects/qr-code-generator-notebook.webp";

function Projects() {
  return (
    <div className="page-section project-page">
      <div className="container">
        <h1>Meus <strong className="purple">Projetos</strong> Recentes</h1>
        <p>Aqui estão alguns projetos em que trabalhei recentemente.</p>
        <div className="project-grid">
          <ProjectCard
            imgPath={ngramas}
            title="Extrator de palavras-chaves de cauda longa com N-Gramas"
            description="Desenvolvido um sistema web em Java e Spring Boot para extrair palavras-chaves unigramas, bigramas e
            trigramas de cauda longa de páginas web. A aplicação utiliza a biblioteca Jsoup para scraping. Possui endpoints REST que permitem extrair os N-gramas mais frequentes de uma
            URL fornecida, facilitando o processamento de linguagem natural."
            ghLink="https://github.com/BrayanPletsch/Extrator-de-N-Gramas-com-Spring-Boot"
          />
          <ProjectCard
            imgPath={senhas}
            title="Gerador de Senhas Aleatórias"
            description="Desenvolvi uma ferramenta eficiente para geração de senhas aleatórias e seguras, combinando letras
            maiúsculas, minúsculas, números e símbolos, com a possibilidade de copiar diretamente para a área de transferência.
            Essa solução garante praticidade e segurança em um único clique."
            ghLink="https://github.com/BrayanPletsch/30dias30projetos"
            demoLink="https://brayan-password-generator.vercel.app/"
          />

          <ProjectCard
            imgPath={crud}
            title="CRUD de Clientes em JavaScript"
            description="Este projeto é um sistema simples de CRUD que permite adicionar, editar, excluir e visualizar clientes.
            As funções createClient, updateClient e deleteClient são responsáveis por gerenciar os dados, e a tabela é
            atualizada automaticamente para refletir as alterações feitas."
            ghLink="https://github.com/BrayanPletsch/30dias30projetos"
            demoLink="https://brayan-crud-in-js.vercel.app/"
          />

          <ProjectCard
            imgPath={cadastro}
            title="Sistema de Cadastro de Alunos"
            description="Sistema de cadastro de alunos desenvolvido em Java com MySQL para armazenar dados.
            A aplicação utiliza JFrame para a interface e permite operações de CRUD (criação, leitura, atualização e exclusão).
            Inclui recursos como painel de login, cadastro de alunos com nome, matrícula e foto, além de exibir os alunos em uma
            tabela. A conexão com o banco de dados é feita através do JDBC."
            ghLink="https://github.com/BrayanPletsch/Banco-de-dados"
          />

          <ProjectCard
            imgPath={cv}
            title="Currículo Online"
            description="Repositório do meu currículo online interativo em HTML e CSS, destacando minhas habilidades como
            Full Stack Developer. Inclui informações de contato, experiência profissional em Spring Boot e MongoDB, formação em
            Engenharia de Software e proficiência em idiomas. O layout é responsivo, utilizando CSS Grid e Flexbox. O currículo
            pode ser visualizado diretamente."
            ghLink="https://github.com/BrayanPletsch/Curriculo-Online"
            demoLink="https://brayan-curriculo-online.vercel.app/"
          />

          <ProjectCard
            imgPath={qrcode}
            title="Gerador de QR Code"
            description="Desenvolvi um gerador de QR Code que converte URLs ou textos em códigos QR personalizados de
            forma eficiente. A aplicação utiliza a API do qrserver.com para gerar e exibir o código dinamicamente,
            garantindo uma experiência otimizada"
            ghLink="https://github.com/BrayanPletsch/30dias30projetos"
            demoLink="https://brayan-qr-code-generator.vercel.app/"
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
