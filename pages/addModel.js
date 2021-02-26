import { useState } from 'react'
import axios from 'axios'

const AddModel = () => {
  const [modifiedData, setModifiedData] = useState({
    name: '',
  })
  const [errorModelmeters, setErrorModelmeters] = useState(null)

  const handleChange = ({ target: { name, value } }) => {
    setModifiedData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:1337/modelmeters',
        modifiedData,
      )
      console.log(response)
    } catch (error) {
      setErrorModelmeters(error)
    }
  }

  if (errorModelmeters) {
    return <div>An error occured (modelmeters): {errorModelmeters.message}</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Modelmeters</h3>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={modifiedData.model}
            onChange={handleChange}
          />
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddModel
