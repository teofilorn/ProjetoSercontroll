import { useEffect, useState, useRef, FormEvent } from 'react'
import { FiTrash2 } from "react-icons/fi"
import { api } from "./services/api"


interface CustomerProps{
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}


//.TSX POR SER UM COMPONENTE REACT COM O TYPESCRIPT

//componentes sempre com letra maiuscula
//importado como default no main
export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)



  useEffect(() => {
    loadCustomer();
  }, [])


  async function loadCustomer() {
    const response = await api.get("./clientes")
    setCustomers(response.data);
  }


  async function handleSubmit(event: FormEvent){
    event.preventDefault ();

    if ( !nameRef.current?.value || !emailRef.current?.value)  return;
   
    const response = await api.post("/cliente", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    setCustomers(aLLCustomers => [...aLLCustomers, response.data])

    //limpa os valores nos input box apos cadastrar
    nameRef.current.value = ""
    emailRef.current.value = ""

  }


  async function handleDelete(id: string){
    try{
      await api.delete("/cliente",{
        params:{
          id: id,
        }
      })
      
      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)

    }catch (err){
      console.log(err)
    }
  }



  return ( 
    <div className="w-full min-h-screen bg-emerald-600 flex justify-center px-4
    ">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>


        <form className="flex flex-col my-6" onSubmit={handleSubmit}>

          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />
          
          <label className="font-medium text-white">E-mail:</label>
          <input
            type="text"
            placeholder="Digite o e-mail..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
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
          key={customer.id}
          className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
          >

            <p><span>Nome:</span>{customer.name}</p>
            <p><span>E-mail:</span>{customer.email}</p>
            <p><span>Status:</span>{customer.status ? "ATIVO" : "INATIVO"}</p>


            <button 
            className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-2 -bottom-4"
            onClick={ () => handleDelete(customer.id) }
            >

              <FiTrash2 size={18} color="#FFF"/>
            </button>

          </article>
        ))}
        </section>





      </main>
    </div>
  )
}