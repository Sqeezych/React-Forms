import { useState, useRef } from 'react';
import * as yup from 'yup';
import Input from './Input';
import styles from './Form.module.css';

const blurSchema = yup.object({
  email: yup.string()
  .matches(/^[\w_@.]*$/, 'Ошибка ввода почты. Допустимые символы: буквы латиницей, цифры, _  @  .')
  .max(20, 'Почта не должна содержать более 20 символов')
  .min(3, 'Почта не должна содержать менее 3х символов'),
  password: yup.string()
  .max(20, "Пароль не должен содержать более 20 символов"),
})

const validateAndGetErrorMessage = (schema, value) => {
  let errorMessage = null
  
  try {
    schema.validateSync(value)
  } catch ({ errors }) {
    errorMessage = errors.join('\n')
  }

  return errorMessage
}

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

  function onChangeEmail ({ target }) {
    setFormData({...formData, 
      email: target.value,}
    )
  }

  function onBlurEmail ({ target }) {
    const newError = validateAndGetErrorMessage(blurSchema.email, target.value)
    setErrors({errors, 
      email: newError
    })
  }
  
  function onChangePassword ({ target }) {
    setFormData({...formData,
      password: target.value,}
    )
  }

  function onBlurPassword ({ target }) {
    const newError = validateAndGetErrorMessage(blurSchema.password, target.value)
    setErrors({...errors, 
      password: newError
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