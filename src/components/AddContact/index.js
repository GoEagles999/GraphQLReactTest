import React, { Component } from "react";
import { Input, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  margin:0 auto;
  width:30%;
`

const Success = styled.div`

`

const Failure = styled.div`

`

class AddContact extends Component {

  state = {
    loading: false,
    name: "",
    email: "",
    success: null,
    failure: null
  }

  createContact = () => {
    const query = `
      mutation addContact($contact: InputContact) {
        addContact(contact: $contact) {
          id
          name
          email
          created
          modified
        }
      }
    `
    const { name, email } = this.state

    this.setState({ loading: true }, () => {
      const created = new Date().toString()
      const modified = new Date().toString()
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables: {
            contact: {
              name,
              email,
              modified,
              created
            }
          }
        })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ success: true })
        })
        .catch(error => {
          this.setState({ failure: true, error })
        })
    })
  }

  handleChange = (event, value) => {
    if (value == 'name') {
      this.setState({
        name: event.target.value
      })
    } else if (value == 'email') {
      this.setState({
        email: event.target.value
      })
    }
  }


  render() {
    const { success, failure } = this.state
    return (
      <Div>
        <Input
          placeholder='Contact Name'
          onChange={(e) => this.handleChange(e, 'name')}
        />
        <Input
          placeholder='Email'
          onChange={(e) => this.handleChange(e, 'email')}
        />
        <Button onClick={this.createContact}>
          Add contact
        </Button>
        {
          success && <Success>Contact successfully added.</Success>
        }
        {
          failure && <Failure>${this.state.error.message}</Failure>
        }
      </Div>
    );
  }
}

export default AddContact;

