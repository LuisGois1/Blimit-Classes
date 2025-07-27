# Repositories

## O que são os Repositories (Repositórios)?

Os **Repositórios** são uma camada de abstração para o acesso a dados. A principal função deles é isolar a lógica de negócio da forma como os dados são persistidos (salvos, buscados, atualizados, deletados).

### Responsabilidades de um Repositório:
1.  **Conter a Lógica de Acesso a Dados:** Centralizar toda a lógica para interagir com a fonte de dados (ex: banco de dados, API externa, ou, como neste caso, um simples array em memória).
2.  **Prover Métodos de CRUD:** Fornecer uma interface clara para as operações de *Create, Read, Update, Delete*.
3.  **Garantir a Isolação:** Assegurar que o resto da aplicação (como as rotas e os serviços) não precise saber *ONDE* ou *COMO* os dados estão guardados. Se amanhã você decidir trocar o array em memória por um banco de dados como o PostgreSQL, você só precisará mudar este arquivo.
