import exampleService from "../service/example.service"
const getHelloWorld = async (req, res) => {
  const response = exampleService.callHelloWorld()
  res.status(200).send(response)
}

export default {
  getHelloWorld
}