export default class HandleError extends Error {
  code: number;
  data?: { reason: string };
  
  constructor(code: number, message: string, data?: { reason: string }) {
    super(`[${code}]: ${message}`);
    this.name = 'SERVER_ERROR';
    this.code = code;
    this.data = data;
  }
}

export interface IError {
  code: number;
  message: string;
  data?: { reason: string };
  error: string;
}
  