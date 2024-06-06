import {FastifyRequest, FastifyReply} from "fastify"
import { UpdateCustomerService } from "../services/updateCustomerService";



// Controller de rota para Atualização de clientes
class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Extrai o 'id' do cliente que será atualizado, além do 'name', 'email' e 'status'
    const { id } = request.query as { id: string}
    const {name, email, status} = request.body as { name: string, email: string, status: boolean };

    // Controller recebe "execute" da aplicação e repassa para o Serviço
    const updateCustomerService = new UpdateCustomerService();
    const customer = await updateCustomerService.execute({ id, name, email, status });

    // Recebe de volta do Serviço e devolve para o usuário
    console.log("deu certo")
    reply.send(customer);
  }
}

export { UpdateCustomerController }