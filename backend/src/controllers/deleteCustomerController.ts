import {FastifyRequest, FastifyReply} from "fastify"
import { DeleteCustomerService } from "../services/deleteCustomerService"

class DeleteCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        //receber o query parms com id e numero do id no cliente
        const {id} = request.query as { id: string}

        const customerService = new DeleteCustomerService();
        const customer = await customerService.execute({id})

        reply.send(customer);
    }
}

export { DeleteCustomerController }