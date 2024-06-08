import {FastifyRequest, FastifyReply} from "fastify"
import {CreateCustomerService} from '../services/createCustomerService'


//Controller de rota para Cadastro de clientes
//Dentro do REQUEST tem acesso ao body, querys e headers da aplicação
class CreateCustumerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        
        //CONST Está extraindo as propriedades name e email do objeto request.body e armazenando-as em constantes com os mesmos nomes
        //AS  Está informando ao compilador TypeScript que request.body é um objeto com as propriedades name e email, ambas do tipo String
        const { cpf, name, telefone, email, senha, confSenha} = request.body as{ cpf: String, name: String, telefone: String, email: String, senha: String, confSenha: String};
        console.log(cpf);
        console.log(name);
        console.log(telefone);
        console.log(email);
        console.log(senha);
        console.log(confSenha);

        //contorller recebe "execute" da aplicação e repassa para o Serviços
        const customerService = new CreateCustomerService()
        const customer = await customerService.execute({cpf, name, telefone, email, senha});

        //recebe de volta do Serviço e devolve pro usuário
        reply.send(customer);
    }

}

export { CreateCustumerController }
