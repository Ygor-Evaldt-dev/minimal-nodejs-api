# Minimal Node.js API

## Descrição

Este repositório contém uma API construída com Node.js sem a utilização de frameworks adicionais. O objetivo principal é fornecer uma base simples e direta para aprender a construir APIs com Node.js, utilizando apenas o módulo HTTP nativo e manipulando dados em massa através de arquivos CSV usando streams.

## Funcionalidades

- **API Sem Frameworks**: Desenvolvido com o módulo HTTP nativo do Node.js, sem frameworks externos como Express.
- **Processamento de CSV**: Recebe dados em massa via arquivos CSV e processa esses dados utilizando streams, ideal para operações com grandes volumes de dados.
- **Aprendizado**: Serve como uma ferramenta educacional para entender como construir APIs do zero e trabalhar com streams de dados.

## Estrutura do Projeto

- **`server.ts`**: Ponto de entrada da aplicação. Define a configuração do servidor HTTP e roteamento.
- **`formDataMiddleware.ts`**: Middleware para processamento de arquivos CSV, utilizando streams para leitura e processamento eficiente.
- **`taskService.ts`**: Serviço para criar e gerenciar tarefas a partir dos dados processados.

## Requisitos

- Node.js (versão 20 ou superior recomendada)

## Instalação

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/Ygor-Evaldt-dev/minimal-nodejs-api.git
cd minimal-nodejs-api
```

Instale as dependências necessárias:

```bash
npm install
```

## Uso

Para iniciar o servidor, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

### Endpoint para Upload de CSV

**POST** `/tasks/csv`

- **Descrição**: Recebe um arquivo CSV e cria tarefas a partir dos dados fornecidos.
- **Content-Type**: `multipart/form-data`
- **Corpo da Requisição**: Envie o arquivo CSV no campo `file`.

**Exemplo de requisição cURL:**

```bash
curl -X POST http://localhost:3333/tasks/csv \
     -F "file=@path/to/your/file.csv" \
     -H "Content-Type: multipart/form-data"
```

## Exemplo de Arquivo CSV

O arquivo CSV deve ter o seguinte formato:
```
title,description
Tarefa 01,Descrição da tarefa 01
Tarefa 02,Descrição da tarefa 02
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, por favor, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações (`git checkout -b minha-branch`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie suas alterações para o repositório remoto (`git push origin minha-branch`).
5. Crie um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato com [Ygor Bitencourt Evaldt](mailto:evaldtygor@gmail.com).