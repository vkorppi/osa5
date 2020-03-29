import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  return (await axios.get(baseUrl)).data  
}

const createNew = async (newblog,account) => {

  return (await axios.post(baseUrl, newblog,{ "headers": { "Authorization": `bearer ${account.userToken}`}  })).data
}

export default { getAll,createNew }


