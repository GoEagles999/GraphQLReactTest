import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

const Div = styled.div`
  display: flex;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 320px;
  background: lightblue;
  color: white;
  border: 2px solid white;
  min-height: 70px;
`

const Contact = styled.div`
  display: flex;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: lightblue;
  color: white;
  border: 2px solid white;
  min-height: 40px;
`

    
class DeleteContact extends Component {

    state = {
      loading: false,
      data: []
    }
  
    componentDidMount() {
      this.fetchData()
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
            const result = res.json()
            .then(response => {
              this.setState({ data: response.data.contacts})
            })
          })
          .catch(error => console.log(error))
        })

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
            this.setState({ data: response.data.contacts})
          })
        })
        .catch(error => console.log(error))
      })
    }
  
    render() {
      return (
        <div className="App">
          {this.state.data && this.state.data.map((contact) => {
          return <Div key={contact.id}>
                  <Link key={contact.id} to={`/contact/${contact.id}`}>
                    <Contact key={contact.id}>
                      {contact.name}
                      {contact.email}
                    </Contact>
                  </Link>
                  <Button key={contact.id} onClick={() => this.deleteContact(contact.id)}>
                    Delete
                  </Button>
                </Div>
          })}
        </div>
      );
    }
  }

export default DeleteContact