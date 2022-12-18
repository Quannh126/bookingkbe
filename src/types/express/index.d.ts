declare namespace Express {
  interface Request {
    user: {
      id: string;
    };
    query: {
      keyword: string;
    };
  }
}
