import {FastifyRequest, FastifyReply, FastifyInstance} from "fastify"
import {CreateCustomerProps, CreateCustomerService} from '../services/createCustomerService'

//Controller de rota para Cadastro de clientes
//Dentro do REQUEST tem acesso ao body, querys e headers da aplicação
class CreateCustumerController{
    async handle(request: FastifyRequest, reply: FastifyReply, fastify: FastifyInstance){

        const data = request.body as CreateCustomerProps
        // Retornar uma resposta simples
        
        const listCustomerService = new CreateCustomerService();
        const customers = await listCustomerService.execute(data);
        const token = fastify.jwt.sign({ email: customers.email, cpf: customers.cpf })
        reply.send({ token });
    }

}

export { CreateCustumerController }
