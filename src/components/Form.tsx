import React from 'react'
import { Formik } from 'formik'
import { AntDesign, Entypo } from '@expo/vector-icons'
import styled from 'styled-components/native'

import Text from '@components/Text'

interface Props {
  signUp?: boolean
  onSubmit: (email: string, password: string) => Promise<void>
}

const Form: React.FunctionComponent<Props> = ({ signUp, onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        const { email, password } = values
        try {
          await onSubmit(email, password)
        } catch (err) {
          actions.setErrors({
            password: err.message,
          })
        }
        actions.setSubmitting(false)
      }}
    >
      {({ handleChange, isSubmitting, handleSubmit }) => (
        <FormContainer>
          <FormGroup>
            <InputIcon>
              <Entypo name="email" size={24} color="#838383" />
            </InputIcon>
            <TextInput
              onChangeText={handleChange('email')}
              placeholder="Email"
              placeholderTextColor="#838383"
            />
          </FormGroup>
          <FormGroup>
            <InputIcon>
              <AntDesign name="lock" size={24} color="#838383" />
            </InputIcon>
            <TextInput
              onChangeText={handleChange('password')}
              placeholder="Password"
              placeholderTextColor="#838383"
              secureTextEntry
            />
          </FormGroup>
          <Submit onPress={() => handleSubmit()}>
            <Text uppercase center color="#343434" medium heavy>
              Sign{isSubmitting ? 'ing' : ''} {signUp ? 'up' : 'in'}
            </Text>
          </Submit>
        </FormContainer>
      )}
    </Formik>
  )
}

const FormContainer = styled.View`
  margin: 8px 32px 20px 32px;
`

const FormGroup = styled.View`
  margin: 10px 0;
  position: relative;
  justify-content: center;
  border-width: 1px;
  border-radius: 32px;
  border-color: #838383;
`

const InputIcon = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
`

const TextInput = styled.TextInput`
  padding: 16px 62px 16px 32px;
  font-size: 16px;
  left: 18px;
`

const Submit = styled.TouchableHighlight`
  margin-bottom: 0;
  margin-top: 10px;
  border-width: 4px;
  border-color: #343434;
  border-radius: 32px;
  padding: 14px;
`

export default Form
