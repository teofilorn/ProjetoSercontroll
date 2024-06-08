import { useEffect, useState, useRef, FormEvent } from 'react'
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa"
import { api } from "./services/api"


interface CustomerProps{
  cpf: string;
  name: string;
  telefone: string;
  email: string;
  status: boolean;
  created_at: string;
}


//.TSX POR SER UM COMPONENTE REACT COM O TYPESCRIPT

//componentes sempre com letra maiuscula
//importado como default no main
export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const cpfRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const telefoneRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const senhaRef = useRef<HTMLInputElement | null>(null)
  const confSenhaRef = useRef<HTMLInputElement | null>(null)



  useEffect(() => {
    loadCustomer();
  }, [])


  async function loadCustomer() {
    const response = await api.get("./clientes")
    setCustomers(response.data);
  }


  async function handleSubmit(event: FormEvent){
    event.preventDefault ();

    if ( !cpfRef.current?.value || !nameRef.current?.value || !telefoneRef.current?.value || !emailRef.current?.value || !senhaRef.current?.value || !confSenhaRef.current?.value )  return;
   
    const response = await api.post("/cliente", {
      cpf: cpfRef.current?.value,
      name: nameRef.current?.value,
      telefone: telefoneRef.current?.value,
      email: emailRef.current?.value,
      senha: senhaRef.current?.value,
      confSenha: confSenhaRef.current?.value
    })

    setCustomers(aLLCustomers => [...aLLCustomers, response.data])

    //limpa os valores nos input box apos cadastrar
    cpfRef.current.value = ""
    nameRef.current.value = ""
    telefoneRef.current.value = ""
    emailRef.current.value = ""
    senhaRef.current.value = ""
    confSenhaRef.current.value = ""

  }


  async function handleDelete(id: string){
    try{
      await api.delete("/cliente",{
        params:{
          cpf: id,
        }
      })
      
      const allCustomers = customers.filter((customer) => customer.cpf !== id)
      setCustomers(allCustomers)

    }catch (err){
      console.log(err)
    }
  }



  return ( 
    <div className="w-full min-h-screen bg-emerald-600 flex justify-centered px-4
    ">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Cadastro de Clientes</h1>


        <form className="flex flex-col my-6" onSubmit={handleSubmit}>

        <label className="font-medium text-white">CPF ou CNPJ:</label>
          <input
            type="text"
            placeholder="Digite o número do CPF ou CNPJ..."
            className="w-full mb-5 p-2 rounded"
            ref={cpfRef}
          />

          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">Telefone:</label>
          <input
            type="tel"
            placeholder="(__)_____-____"
            className="w-full mb-5 p-2 rounded"
            ref={telefoneRef}
          />
          
          <label className="font-medium text-white">E-mail:</label>
          <input
            type="text"
            placeholder="Digite o e-mail..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <label className="font-medium text-white">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            className="w-full mb-5 p-2 rounded"
            ref={senhaRef}
          />

          <label className="font-medium text-white">Confirme sua Senha:</label>
          <input
            type="password"
            placeholder="Confirme sua senha..."
            className="w-full mb-5 p-2 rounded"
            ref={confSenhaRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium "         
          />

        </form>


        <section className="flex flex-col gap-6">


        {customers.map( (customer) => (
          <article 
          key={customer.cpf}
          className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
          >

            <p><span>CPF: </span>{customer.cpf}</p>
            <p><span>Nome: </span>{customer.name}</p>
            <p><span>Telefone: </span>{customer.telefone}</p>
            <p><span>E-mail: </span>{customer.email}</p>
            <p><span>Status: </span>{customer.status ? "ATIVO" : "INATIVO"}</p>


            <button 
            className="bg-orange-400 w-7 h-7 flex items-center justify-center rounded-lg absolute right-11 -bottom-4"
            onClick={ () => handleDelete(customer.cpf) }
            >
              <FaUserEdit size={16} color="#FFF"/>
            </button>


            <button 
            className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-2 -bottom-4"
            onClick={ () => handleDelete(customer.cpf) }
            >
              <FaRegTrashAlt size={16} color="#FFF"/>
            </button>


          </article>
        ))}
        </section>





      </main>
    </div>
  )
}