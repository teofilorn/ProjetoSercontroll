import prismaClient from "../prisma";

//interface UpdateCustomerProps{
//  name?: string;
//  email?: string;
//  status?: boolean;
//}


  class UpdateCustomerService {
    async execute(id: string, updateData: { name?: string; email?: string; status?: boolean }) {

    
      const customer = await prismaClient.customer.update({
          where: { id },
          data: updateData,
      });
      return customer;
    }
  }


export { UpdateCustomerService }