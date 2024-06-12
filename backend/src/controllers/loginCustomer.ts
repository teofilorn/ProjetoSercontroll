import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LoginCustomerService } from "../services/loginCustomer";

export interface ILogin {
  email: string;
  senha: string;
}

class LoginCostumerController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
    fastify: FastifyInstance
  ) {
    try {
      const data = request.body as ILogin;
      // Retornar uma resposta simples

      const listCustomerService = new LoginCustomerService();
     return await listCustomerService.execute(data, reply, fastify);

    } catch (err) {
        reply.status(500).send({ error: 'Internal server error' });
        console.log(err, "cumm")
    }
  }
}

export {LoginCostumerController}