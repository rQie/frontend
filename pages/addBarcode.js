import { useState } from 'react'
import axios from 'axios'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const AddBarcode = () => {
  const [modifiedData, setModifiedData] = useState({
    name: '',
    modelmeter: 'no',
  })
  const [errorMeterbarcodes, setErrorMeterbarcodes] = useState(null)

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
        'http://localhost:1337/meterbarcodes',
        modifiedData,
      )
      console.log(response)
    } catch (error) {
      setErrorMeterbarcodes(error)
    }
  }

  if (errorMeterbarcodes) {
    return (
      <div>An error occured (meterbarcodes): {errorMeterbarcodes.message}</div>
    )
  }

  const QUERY = gql`
    {
      modelmeters {
        id
        model
      }
    }
  `

  const { loading, error, data } = useQuery(QUERY)
  if (error) return 'Error loading restaurants'
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>
  const { modelmeters } = data
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Barcode</h3>
        <br />

        <select
          onChange={handleChange}
          name="modelmeter"
          value={modifiedData.modelmeter}
        >
          <option modelmeter="no">Please select a product</option>
          {modelmeters.map((res) => (
            <option key={res.id} value={modelmeters.id}>
              {res.model}
            </option>
          ))}
        </select>
        <label>
          Barcode:
          <input
            type="text"
            name="barcode"
            value={modifiedData.barcode}
            onChange={handleChange}
          />
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddBarcode
