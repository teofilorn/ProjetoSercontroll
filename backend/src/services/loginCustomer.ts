import { FastifyInstance, FastifyReply } from "fastify";
import { ILogin } from "../controllers/loginCustomer";
import prisma from "../prisma";
import { compare } from "bcrypt";

class LoginCustomerService {
  async execute(data: ILogin, reply: FastifyReply, fastify: FastifyInstance) {
    const user = await prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      reply.status(401).send({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await compare(data.senha, user.senha);
    if (!isPasswordValid) {
      reply.status(401).send({ error: "Invalid email or password" });
      return;
    }
    const token = fastify.jwt.sign({
      cpf: user.cpf,
      email: user.email,
      ...(user.isAdmin ? { isAdmin: true } : {}),
    });
    console.log(token, " tokn");
    reply.send({ token });
  }
}

export { LoginCustomerService };
