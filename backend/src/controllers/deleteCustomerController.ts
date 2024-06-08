import {FastifyRequest, FastifyReply} from "fastify"
import { DeleteCustomerService } from "../services/deleteCustomerService"

class DeleteCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        //receber o query parms com id e numero do id no cliente
        const {cpf} = request.query as { cpf: string}

        const customerService = new DeleteCustomerService();
        const customer = await customerService.execute({cpf})

        reply.send(customer);
    }
}

export { DeleteCustomerController }