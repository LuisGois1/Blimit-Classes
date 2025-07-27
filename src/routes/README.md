# Routes

## O que são as Routes (Rotas)?

As **Rotas** são os pontos de entrada (endpoints) da sua API. Elas são responsáveis por receber as requisições HTTP (`GET`, `POST`, `PUT`, `DELETE`, etc.), processá-las e enviar uma resposta de volta ao cliente.

### Responsabilidades de uma Rota:
1.  **Definir os Endpoints:** Estabelecer os caminhos (URLs) da sua API (ex: `/users`, `/products/:id`).
2.  **Capturar Dados da Requisição:** Extrair dados do corpo (`body`), parâmetros de rota (`params`) ou query strings (`query`).
3.  **Orquestrar a Lógica:** Chamar as camadas de serviço ou repositório para executar a lógica de negócio correspondente.
4.  **Formatar a Resposta:** Lidar com a resposta HTTP, definindo o *status code* (200, 201, 404, etc.) e o corpo da resposta (geralmente em formato JSON).
5.  **Validação de Entrada:** Realizar a validação inicial dos dados da requisição (ex: verificar se campos obrigatórios foram enviados).
