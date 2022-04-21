import connection from "./connection"
import { Expertise } from "./types/types"


  export const getExpertiseId = async(expertise:Expertise):Promise<any>=>{
       const expertiseId = await connection("Especialidade").select(
        "especialidade_id"
      ).where("especialidade_nome".toLowerCase(), expertise.toLowerCase())
        return expertiseId[0].especialidade_id
  }
