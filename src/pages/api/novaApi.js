/**
 * consulta: gr, nr04, nr05
 * type: cnpj, cnae
 * 
 * 
 * 
 * 1 - verifica método
 * 2 - verifica body
 *      a. consulta e type obrigatorios
 *      b. se consulta = nr04 ou nr05, nro trabalhadores obrigatorio
 * 3 - verifica CNPJ e atribui CNAEs
 *      a - se tem CNPJ, realiza fecth na api minha receita
 *      b - se não tem CNPJ, pula etapa e atruibui o(s) CNAE(s) fornecidos para busca
 *      c - se não tem nem CNPJ nem CNAE, retorna erro
 *  4 - realiza consulta na tabela relacao_cnae_gr
 *  >> obtem todos grau de risco
 *  >> encontra maior grau de risco
 * 
 *  SE consulta = GR:
 *  5 - retorna dados da empresa e dados dos CNAEs relacionados OU apenas dos CNAEs relacionados
 *  
 *  SE consulta = nr04:
 *  5 - consulta tabela dimensionamento_sesmt para encontrar equipe sesmt com maior grau de risco e nro de trabalhadores
 * 
 * SE consulta = nr05:
 *  5 - consulta tabela dimensionamento_cipa para encontrar equipe sesmt com maior grau de risco e nro de trabalhadores
 *  
 * 
 * 
 * */