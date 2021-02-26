import React, { Component } from 'react'
import axios from 'axios'

class AddModelMeters extends Component {
  state = {
    modelmeter: 'no',
    modelmeters: [],
  }

  handleChange = (event) => {
    console.log(
      'AddModelMeters.handleChange event.target.name',
      event.target.name,
    )
    console.log(
      'AddModelMeters.handleChange event.target.value',
      event.target.value,
    )

    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { barcode, modelmeter } = this.state

    console.log('AddModelMeters.handleSubmit modelmeter', modelmeter)
    console.log('AddModelMeters.handleSubmit barcode', barcode)
    if (modelmeter != 'no') {
      const data = {
        barcode,
        modelmeter: parseInt(modelmeter),
      }

      const add_stock_res = await axios({
        method: 'POST',
        url: 'http://localhost:1337/meterbarcodes',
        data,
      })

      console.log('AddModelMeters.handleSubmit add_stock_res', add_stock_res)
      if (add_stock_res.status === 200) {
        alert('Success')
        window.location = window.location
      }
    } else {
      alert('No modelmeter chosen')
      return
    }
  }

  async componentDidMount() {
    const modelmetersRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/modelmeters', //product
    })

    const modelmeters = modelmetersRes.data
    console.log('modelmeters', modelmeters)

    this.setState({ modelmeters })
  }

  render() {
    const { barcode, modelmeter, modelmeters } = this.state
    return (
      <div className="AddModelMeters">
        <form onSubmit={this.handleSubmit}>
          <select
            onChange={this.handleChange}
            name="modelmeter"
            value={modelmeter}
          >
            <option value="no">Please select a modelmeter</option>
            {modelmeters.map((modelmeter, i) => (
              <option key={i} value={modelmeter.id}>
                {modelmeter.model}
              </option>
            ))}
          </select>
          <input
            onChange={this.handleChange}
            type="text"
            name="barcode"
            value={barcode}
          />

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddModelMeters
