import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho

      if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
      }

      const decoded = this.jwtService.verify(token); // Verifica o token JWT

      req.user = decoded; // Anexa as informações do usuário à requisição
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
