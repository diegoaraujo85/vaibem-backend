// adicionando ao Request do Express a variavel user
// overwrite, substituição de tipos, pesquisar GOOGLE

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
