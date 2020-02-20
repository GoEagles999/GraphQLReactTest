import React, { Component } from "react";
import { Input, Button } from '@material-ui/core'
import styled from 'styled-components'
import { withRouter } from "react-router";

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

class EditContact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      name: '',
      email: '',
      error: '',
      success: null,
      failure: null
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  updateContact = () => {
    const modified = new Date().toString()
    const query = `
      mutation updateContact($contact: InputContact) {
        updateContact(contact: $contact) {
          id: ${this.props.match.params.id},
          name
          email
          modified
        }
      }
    `
    const { name, email } = this.state
    this.setState({ loading: true }, () => {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables: {
            contact: {
              id: this.props.match.params.id,
              name,
              email,
              modified
            }
          }
        })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ success: true })
        })
        .catch(error => {
          console.log(error)
          this.setState({ failure: true, error })
        })
    })
  }

  fetchData = () => {
    const query = `
      query contact($id: ID) {
        contact(id: $id) {
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
        body: JSON.stringify({
          query,
          variables: {
            id: this.props.match.params.id
          }
        })
      })
        .then(res => {
          res.json()
            .then(response => {
              this.setState({
                name: response.data.contact.name,
                email: response.data.contact.email,
                success: true
              })
            })
        })
        .catch(error => {
          console.log(error)
          this.setState({ failure: true, error })
        })
    })
  }

  render() {
    const { success, failure, error } = this.state
    return (
      <Div>
        <Input placeholder='Name' />
        <Input placeholder='Email' />
        <Button onClick={this.updateContact}>
          Update Contact
        </Button>
        {
          success && <Success>Contact successfully updated.</Success>
        }
        {
          failure && <Failure>${error}</Failure>
        }
      </Div>
    );
  }
}


export default withRouter(EditContact);
