export const fetchAPI = async () : Promise<string> => {
  const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resolve : string = await endpoint.json();
  return resolve;
};
