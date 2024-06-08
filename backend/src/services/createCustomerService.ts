import prismaClient from "../prisma";

//Criando tipagem
interface CreateCustomerProps{
    cpf: string;
    name: string;
    telefone: string;
    email: string;
    senha: string;
    confSenha: string;
}

//serviço recebe os parâmetros do Controller e faz uma tratativa, vai no banco de dados e depois devolve para o Controller
class CreateCustomerService{
    //Método execute vai receber um name e um email String (de acordo com a tipagem ts criada)
    async execute({cpf, name, telefone, email, senha, confSenha}: CreateCustomerProps) {
        //se não mandar o nome ou se não mandar email manda um erro
        //if(!cpf || !name || !telefone || !email || !senha || !confSenha){
        //    throw new Error("Preencha todos os campos");
        //}
        //if(senha !== confSenha ){
        //    throw new Error("As senhas devem ser iguais");
        //}


        //para salvar no bd cria um const AWAIT para esperar prisma (ORM}
        //chama o customer (modelo criado no prisma) e cria no banco de dados
        //propriedade data com os itens que tem que passar
        const customer = await prismaClient.customer.create({
            data:{
                cpf: cpf,
                name: name,
                telefone: telefone,
                email: email,
                senha: senha,
                status: true
            }
        })

        //devolve item cadastrado para o controller
        return customer;
    }
}

export { CreateCustomerService };