import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

import { FastifyJwtNamespace } from "@fastify/jwt";
import "@fastify/jwt";

interface jwtPayload {
  cpf: string;
  email: string;
  isAdmin?: boolean;
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    adminAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: jwtPayload; // payload type is used for signing and verifying
    user: jwtPayload; // user type is return type of `request.user` object
  }
}

const app = Fastify({ logger: true });

app.register(require("@fastify/jwt"), {
  secret: "supersecret2",
});

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    process.exit(1);
  }
};

start();
