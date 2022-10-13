import axios from "axios";
import { useEffect, useState } from "react";

interface Client {
  id: number,
  name: string,
  city: string,
  state: string,
  email: string,
} 
export function Data() {
  const [data, setData] = useState([])

  async function getClientes() {
    const response = await axios.get('http://192.168.15.124:3333/api/clients')

    const cliente = response.data.map((index: any): Client => {
      return (
        {
          id: index.id,
          name: index.name,
          city: index.city,
          state: index.state,
          email: index.email,
        }
      )
    })
    setData(cliente)
  }
}