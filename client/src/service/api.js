import axios from 'axios'


const URL = 'http://localhost:8000';








export const editUser =async (user,id) => {

try {
  return await axios.put(`${URL}/${id}`,user)
} catch (error) {
  console.log('Error while calling Edit user api' ,error);
}

}
