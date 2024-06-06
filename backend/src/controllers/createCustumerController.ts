import {FastifyRequest, FastifyReply} from "fastify"
import {CreateCustomerService} from '../services/createCustomerService'


//Controller de rota para Cadastro de clientes
//Dentro do REQUEST tem acesso ao body, querys e headers da aplicação
class CreateCustumerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        
        //CONST Está extraindo as propriedades name e email do objeto request.body e armazenando-as em constantes com os mesmos nomes
        //AS  Está informando ao compilador TypeScript que request.body é um objeto com as propriedades name e email, ambas do tipo String
        const { name, email} = request.body as{ name: String, email: String};
        console.log(name);
        console.log(email);

        //contorller recebe "execute" da aplicação e repassa para o Serviços
        const customerService = new CreateCustomerService()
        const customer = await customerService.execute({name, email});

        //recebe de volta do Serviço e devolve pro usuário
        reply.send(customer);
    }

}

export { CreateCustumerController }
