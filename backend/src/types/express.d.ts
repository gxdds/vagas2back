// types/express.d.ts
import { UserAttributes } from '../src/models/user'; // ou ajuste o caminho conforme necessário

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; // Aqui você define que 'user' pode existir em 'req'
    }
  }
}
