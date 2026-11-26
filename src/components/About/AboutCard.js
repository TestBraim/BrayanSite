import { useState } from "react";

function AboutCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="about-copy">
      <p>
        Na RUUP, o sistema guarda documentos médicos. Os arquivos são criptografados com <strong className="purple">AES-256-GCM</strong> antes de serem armazenados, e a autenticação com <strong className="purple">Laravel Sanctum</strong> confere o IP da sessão a cada requisição. Se o token for usado de outro lugar, a requisição é recusada.
      </p>
      <p>
        A geração dos PEIs usa a API da <strong className="purple">OpenAI</strong>. Cada um define o papel do modelo, as regras da resposta e o formato de saída. O contexto enviado é montado a partir dos formulários de saúde e família, só com o que o plano precisa e sem dados que identifiquem o aluno.
      </p>
      <p>
        Como <strong className="purple">guardrail</strong>, a resposta da IA é validada antes de ser salva, e o que vem fora do formato esperado, é descartado. Nenhuma sugestão vai direto para o plano final: tudo aparece para revisão e edição, e o feedback de quem revisa fica registrado para ajustar os prompts.
      </p>
      <button
        type="button"
        className="action-link about-toggle"
        aria-expanded={expanded}
        aria-controls="about-more"
        onClick={() => setExpanded((previous) => !previous)}
      >
        {expanded ? "Ler menos" : "Ler mais"}
      </button>
      <div id="about-more" className="about-more" hidden={!expanded}>
        <p>
          Na Tellus, as APIs REST usavam autenticação <strong className="purple">Bearer/JWT</strong>, com validação do payload antes de qualquer dado chegar ao banco. Credenciais e URLs ficavam em arquivos <strong className="purple">.env</strong> separados para desenvolvimento, homologação e produção, fora do repositório Git.
        </p>
        <p>
          Parte do trabalho na Tellus era receber planilhas e tratar os dados à mão. Escrevi scripts em <strong className="purple">Python</strong> com <strong className="purple">Pandas</strong> que leem os arquivos, padronizam as colunas e validam os dados antes de seguirem para o sistema. Isso diminuiu o trabalho manual e os erros nessa etapa.
        </p>
        <p>
          Algumas integrações entre sistemas da Tellus foram feitas no <strong className="purple">n8n</strong>. Os workflows recebem um webhook, aplicam regras com condicionais e funções em JavaScript e enviam os dados para outra API por requisição HTTP.
        </p>
        <p>
          Na Von Allen, a API em Spring Boot e o MongoDB rodavam em contêineres orquestrados com <strong className="purple">Docker Compose</strong>. Os serviços conversavam por uma rede interna do Compose, o banco não ficava exposto para fora e as credenciais entravam por variáveis de ambiente, sem ficar no código.
        </p>
        <p>
          Para testar integrações externas sem fazer deploy, usei o <strong className="purple">Ngrok</strong>, que expõe a API local por um túnel HTTPS sem abrir portas na rede. O túnel ficava ativo só durante os testes. O código também passava pelo <strong className="purple">SonarQube</strong> a cada build no Jenkins, que aponta bugs, vulnerabilidades e trechos com risco de segurança.
        </p>
      </div>
    </div>
  );
}

export default AboutCard;
