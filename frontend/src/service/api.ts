import {supabase} from "./dataBaseConnetct";

export async function searchUserByName(name) {
   const { data, error } = await supabase
    .from('Customers')
    .select()
    .eq('CustomerName', name)

  return data;
}

// Получение свободных автомобилей и работников

export async function getAllFreeTransport(): Promise<any[]> {
  try {
    let { data: Transport, error } = await supabase
      .from('Transport')
      .select('*')

    let TransportNumbers = Transport.filter((t) => t.TransportIsBusy === false).map(transport => transport.TransportNumber);
    return TransportNumbers;
  } catch  {
    console.error('Something went wrong');
  }
}

export async function getAllFreeEmployeers(): Promise<any[]> {
  try {
    let { data: Employeers, error } = await supabase
      .from('Employeers')
      .select('*')

    let EmployeersNames = Employeers.filter((e) => e.EmployeeIsBusy === false).map(employee => employee.EmployeeName);

    return EmployeersNames;
  } catch  {
    console.error('Something went wrong');
  }
}

export async function getAllOrdersInQueue(): Promise<any[]> {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('OrderInWork', 'false')

  return Orders;
}

export async function getAllOrdersInWork(): Promise<any[]> {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('OrderInWork', 'true')

  return Orders;
}
