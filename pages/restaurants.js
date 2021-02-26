/* /pages/restaurants.js */
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { gql } from 'apollo-boost'

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    modelmeter(id: $id) {
      id
      model
      meterbarcodes {
        id
        barcode
      }
    }
  }
`
console.log(GET_RESTAURANT_DISHES)

function Restaurants(props) {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  })

  if (error) return 'Error Loading Dishes'
  if (loading) return <h1>Loading ...</h1>
  if (data.modelmeter) {
    const { modelmeter } = data
    return (
      <>
        <h1>{modelmeter.model}</h1>
        <Row>
          {modelmeter.meterbarcodes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: '10px 10px' }}>
                <CardBody>
                  <CardTitle>{res.barcode}</CardTitle>
                </CardBody>
                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )
  }
  return <h1>Add Dishes</h1>
}
export default Restaurants
