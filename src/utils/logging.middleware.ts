import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now(); // Marca o início do tempo da requisição
    const { method, originalUrl } = req;

    console.log(`[Request] ${method} ${originalUrl}`);
    
    // Sobrescreve o método res.send para capturar o corpo da resposta
    const originalSend = res.send;
    let responseBody: any;

    res.send = (body: any) => {
      responseBody = body; // Captura o corpo da resposta
      return originalSend.call(res, body); // Continua com o envio da resposta
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;

      console.log(`[Response] ${method} ${originalUrl} ${statusCode} - ${elapsedTime}ms`);
      console.log(`[Response Headers] ${JSON.stringify(res.getHeaders())}`);
      console.log(`[Response Body] ${JSON.stringify(responseBody)}`); // Aqui imprime o corpo capturado
      console.log(`[Request Headers] ${JSON.stringify(req.headers)}`);
      console.log(`[Request Body] ${JSON.stringify(req.body)}`);
    });

    next(); // Passa o controle para o próximo middleware/handler
  }
}
