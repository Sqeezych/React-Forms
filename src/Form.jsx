import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';
import styles from './Form.module.css';

const formScheme = yup.object({
  email: yup
  .string()
  .matches(
    /^[\w_@.]*$/,
    'Ошибка ввода почты. Допустимые символы: буквы латиницей, цифры, _  @  .'
  )
  .max(
    20,
    'Почта не должна содержать более 20 символов'
  ),
  password: yup
  .string()
  .max(20, "Пароль не должен содержать более 20 символов")
})
.required()

export default function Form () {
  const submitButtonRef = useRef(null)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmedPassword: '',
  })
  
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })

  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    resolver: yupResolver(formScheme),
  })

  // const emailBlurScheme = yup
  // .string()
  // .matches(
  //   /^[\w_@.]*$/,
  //   'Ошибка ввода почты. Допустимые символы: буквы латиницей, цифры, _  @  .'
  // )
  // .max(
  //   20,
  //   'Почта не должна содержать более 20 символов'
  // )

  // const passwordBlurScheme = yup
  // .string()
  // .max(20, "Пароль не должен содержать более 20 символов")

  function validateAndGetErrorMessage (sheme, value) {
    let errorMessage = null

    try{ 
      sheme.validateSync(value)
    } catch({ errors }) {
      errorMessage = errors
    }
    return errorMessage
  }


  function onChangeEmail ({ target }) {
    setFormData({...formData, 
      email: target.value,}
    )
  }
  function onBlurEmail ({ target }) {
    const error = validateAndGetErrorMessage(emailBlurScheme, target.value)
    setErrors({...errors,
      email: error
    })
  }
  
  function onChangePassword ({ target }) {
    setFormData({...formData,
      password: target.value,}
    )
  }

  function onBlurPassword ({ target }) {
    const error = validateAndGetErrorMessage(passwordBlurScheme, target.value)
    setErrors({...errors,
      password: error
    })
  }

  function onChangeConfirmedPassword ({ target }) {
    setFormData({...formData,
      confirmedPassword: target.value,}
    )
    if(target.value === formData.password) {
      submitButtonRef.current.focus()
    }
  }

  function onSubmit (event) {
    event.preventDefault();
    if(formData.email && formData.password && formData.confirmedPassword) {
      if(formData.password === formData.confirmedPassword) {
        console.log(formData)
      } else {
          console.log("Пароли не совпадают")
      }
    }
  }

  function isEmptyForm() {
    if(formData.email && formData.password && formData.confirmedPassword) {
      return false 
    } else {
      return true
    }
  }
    
    return (
          <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
              {errors.email && <div>{errors.email}</div>}
              {errors.password && <div>{errors.password}</div>}
              <Input 
                name='Email'
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
              <Input 
              name='Password'
              type="password" 
              placeholder='Пароль' 
              value={formData.password}
              onChange={onChangePassword}
              onBlur={onBlurPassword}
              />
              <Input
              name='Confirm password'
              type="password" 
              placeholder='Повтор пароля' 
              value={formData.confirmedPassword}
              onChange={onChangeConfirmedPassword}
              />
              <button disabled={isEmptyForm() || errors.email || errors.password} 
              type='submit'
              ref={submitButtonRef}>
              Зарегистрироваться
              </button>
          </form>
    );
};