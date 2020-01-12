import React, { Component } from 'react';
import { Formik } from 'formik';
import { Container, Header, Form, Button, Message, Icon, Label } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';
class App extends Component {
  state = {
    success: false,
    error: false
  }
  
  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  render() {
    const { error, success } = this.state;
    return (
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ email: '', name: '',textArea:'' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Please enter your name';
          }
          if (!values.email) {
            errors.email = 'Please enter your email';
          } else if (!this.emailRegex.test(values.email)) {
            errors.email = 'Please enter a valid email';
          }
          return errors;
        }}
        isInitialValid={({ validate, initialValues }) => {
          const errors = validate(initialValues);
          if (Object.keys(errors).length > 0) {
            return false;
          }
          return true;
        }}
        onSubmit={({
          name, email, textArea
        }, {
          setSubmitting
        }) => {
          axios.post('/api/coming-soon/subscribe', { name, email,textArea })
            .then(() => this.setState({ success: true, error: false }))
            .catch(() => this.setState({ success: false, error: true }))
            .finally(() => setSubmitting(false));
          }}
        render={({
          handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting,
        }) => (
          <Container textAlign="center" text>
            <Header>Lensman</Header>
            <p>
              Our website is under construction,
              follow us for update now!
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  size="huge"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Label pointing="left" basic color="red">
                    {errors.name}
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
                <input
                  size="huge"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Label pointing="left" basic color="red">
                    {errors.email}
                  </Label>
                )}
              </Form.Field>
              <Form.Field>
              <Form.TextArea
                 size="huge"
                 name='textArea'
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.textArea}
                 placeholder='We would love to hear more about why you are so excited about us...' />
              </Form.Field>
              <Button
                loading={isSubmitting}
                size="huge"
                type="submit"
                inverted
              >
                Subscribe
              </Button>
            </Form>
            <Container textAlign="left">
              <Message positive hidden={!success}>
                <Icon name="check" />
                Thank you. You'll be first to know when we are live 
              </Message>
            </Container>
            <Container textAlign="left">
              <Message error hidden={!error}>
                <Icon name="warning" />
                Something went wrong! Please try again later.
              </Message>
            </Container>
          </Container>
        )}
      />
    );
  }
}

export default App;
                
