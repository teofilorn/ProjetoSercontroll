import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustumerController } from "./controllers/createCustumerController";
import { ListCustomersController } from "./controllers/listCustomersController";
import { DeleteCustomerController } from "./controllers/deleteCustomerController";
import { UpdateCustomerController } from "./controllers/updateCustomerController";
import { LoginCostumerController } from "./controllers/loginCustomer";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.decorate(
    "auth",
    async function (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.decorate(
    "adminAuth",
    async function (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> {
      try {
        await request.jwtVerify();
        if (!request.user.isAdmin) {
          reply.status(401).send({ error: "You are not Admin" });
        }
      } catch (err) {
        reply.send(err);
      }
    }
  );
  fastify.get(
    "/teste",
    {
      onRequest: [fastify.auth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true };
    }
  );

  //Rota para Cadastro de Clientes
  //Chama o controller
  fastify.post(
    "/create",
    {
      onRequest: [fastify.adminAuth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustumerController().handle(request, reply, fastify);
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginCostumerController().handle(request, reply, fastify);
    }
  );

  //Rota para Listar de Clientes
  //Chama o controller
  fastify.get(
    "/clientes",
    {
      onRequest: [fastify.adminAuth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersController().handle(request, reply);
    }
  );

  //Rota para Deletar Clientes
  //Chama o controller
  fastify.delete(
    "/cliente",
    {
      onRequest: [fastify.adminAuth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );

  //Rota para Deletar Clientes
  //Chama o controller
  fastify.patch(
    "/cliente",
    {
      onRequest: [fastify.adminAuth],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateCustomerController().handle(request, reply);
    }
  );
}
