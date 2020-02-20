import React, { Component, useState, useEffect } from "react";
import styled from 'styled-components'
import { withRouter } from "react-router";

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 40rem;
  background: lightblue;
  color: white;
  border: 2px solid white;
  min-height: 40px;
`

class ViewContact extends Component {
  state = {
    loading: false,
    data: {}
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const query = `
      query contact($id: ID) {
        contact(id: $id) {
          name
          email
          created
          modified
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
                data: response.data.contact
              })
            })
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  render() {
    const { name, email, modified, created } = this.state.data
    return (
      <div>
        <Contact>
          <div>
            Name: {name}
          </div>
          <div>
            Email: {email}
          </div>
          <div>
            Date Modified: {modified}
          </div>
          <div>
            Date Created: {created}
          </div>
        </Contact>
      </div>
    )
  }
}

export default withRouter(ViewContact);
