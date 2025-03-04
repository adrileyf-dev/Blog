class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotFoundError";
      this.statusCode = 404;
    }
  }

  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
      this.statusCode = 400;
    }
  }
    
  const handleError = (res, error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Erro interno do servidor";
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = { NotFoundError, ValidationError, handleError };