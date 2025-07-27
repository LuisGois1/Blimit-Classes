# Models

## O que são os Models?

Os **Models** são a representação dos dados da sua aplicação. Eles definem a "forma" ou a "estrutura" de uma entidade do seu sistema. Por exemplo, em uma rede social, você teria models para `User`, `Post`, `Comment`, etc.

### Responsabilidades de um Model:
1.  **Definir a Estrutura:** Estabelecer os campos e os tipos de dados de uma entidade (ex: `nome: string`, `idade: number`).
2.  **Conter Validações:** Incluir lógica de validação de dados que é inerente à própria entidade (ex: uma senha deve ter no mínimo 6 caracteres, um email deve ter um formato válido).
3.  **Abstrair a Persistência:** O Model não se preocupa em *COMO* os dados são salvos, apenas em *COMO* eles se parecem.
