import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const mess = exception.getResponse();
    const message = Array.isArray(mess['message']) ? mess['message'][0] : mess;
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
