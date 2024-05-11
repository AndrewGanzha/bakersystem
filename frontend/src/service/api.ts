import {supabase} from "./dataBaseConnetct";

export async function searchUserByName(name) {
   const { data, error } = await supabase
    .from('Customers')
    .select()
    .eq('CustomerName', name)

  return data;
}

