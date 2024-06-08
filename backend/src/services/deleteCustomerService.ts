import prismaClient from "../prisma"

interface DeleteCustomerProps{
    cpf: string;
}

class DeleteCustomerService{
    async execute({cpf}: DeleteCustomerProps){

        if(!cpf){
            throw new Error("Solicitação inválida")
        }
        
        const findCustomer = await prismaClient.customer.findFirst({
            where: {
                cpf: cpf
            }
        })

        if(!findCustomer){
            throw new Error("Cliente não existe!")
        }
        await prismaClient.customer.delete({
            where: {
                cpf: findCustomer.cpf
            }
        })

        return {message:`Deletado com sucesso!`}
    }
}

export { DeleteCustomerService }