import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustumerController } from "./controllers/createCustumerController";
import { ListCustomersController } from "./controllers/listCustomersController";
import { DeleteCustomerController } from "./controllers/deleteCustomerController";
import { UpdateCustomerController } from "./controllers/updateCustomerController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply)=> {

        return {ok: true}
    })

    //Rota para Cadastro de Clientes
    //Chama o controller
    fastify.post("/cliente", async(request: FastifyRequest, reply: FastifyReply)=> {

        return new CreateCustumerController().handle(request, reply)
    })

    //Rota para Listar de Clientes
    //Chama o controller
    fastify.get("/clientes", async(request: FastifyRequest, reply: FastifyReply)=> {

        return new ListCustomersController().handle(request, reply)
    })  
    
    //Rota para Deletar Clientes
    //Chama o controller
    fastify.delete("/cliente", async(request: FastifyRequest, reply: FastifyReply)=> {

        return new DeleteCustomerController().handle(request, reply)
    })  

    //Rota para Deletar Clientes
    //Chama o controller
    fastify.patch("/cliente", async(request: FastifyRequest, reply: FastifyReply)=> {

        return new UpdateCustomerController().handle(request, reply)
    })  
}