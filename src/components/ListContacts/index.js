import React, { Component } from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const Contact = styled.div`
  display: flex;
  border-radius: 3px;
  padding: 1rem;
  width:100%;
  margin: 0.5rem 1rem;
  color: white;
  border: 2px solid white;
`

const LeftSide = styled.div`
  display: flex;
`
const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  width:400px;
`

const Div = styled.div`
  display: flex;
  border-radius: 15px;
  margin: 0.5rem 1rem;
  background: lightblue;
  color: white;
  border: 2px solid white;
  justify-content:space-around;
`

class ListContacts extends Component {

  state = {
    loading: false,
    data: []
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const query = `
      query {
        contacts {
          id
          name
          email
        }
      }
    `
    this.setState({ loading: true }, () => {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })
        .then(res => {
          const result = res.json()
            .then(response => {
              this.setState({ data: response.data.contacts })
            })
        })
        .catch(error => console.log(error))
    })
  }

  deleteContact = (id) => {
    const query = `
        mutation deleteContact($id: ID) {
            deleteContact(id: $id)
        }
    `
    this.setState({ loading: true }, () => {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables: {
            id: id
          }
        })
      })
        .then(res => {
          res.json()
            .then(response => {
              this.setState({ data: response.data.contacts })
            })
        })
        .catch(error => console.log(error))
    })

    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        {this.state.data && this.state.data.map((contact, i) => {
          return <Div key={i}>
            <LeftSide>
              <Contact >{contact.name}</Contact>
            </LeftSide>
            <RightSide>
              <Link to={`/contact/${contact.id}`}>
                <Button variant="outlined" color="secondary">View</Button>
              </Link>
              <Link to={`/contact/edit/${contact.id}`}>
                <Button variant="outlined" color="secondary">Edit</Button>
              </Link>
              <Link to={'/contact/all'}>
                <Button variant="outlined" color="secondary" onClick={() => this.deleteContact(contact.id)}>Delete</Button>
              </Link>
            </RightSide>
          </Div>

        })}
      </div>
    );
  }
}

export default ListContacts;
