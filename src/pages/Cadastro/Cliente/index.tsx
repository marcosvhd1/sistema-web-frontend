
import axios from "axios";
import { useEffect, useState } from "react";
import MainContent from "../../../components/MainContent";
import {DataTable} from "../../../components/Table/DataTable";

interface Client {
  id: number,
  name: string,
  city: string,
  state: string,
  email: string,
}



export function Cliente() {


  return (
    <MainContent>
      <DataTable/>
    </MainContent>
  )
}
