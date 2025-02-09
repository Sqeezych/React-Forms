import { useRef, useState } from 'react';
import Input from './Input';
import styles from './Form.module.css';

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
  function onBlurEmail () {
    if(!/^[\w_@.]*$/.test(formData.email)) {
      setErrors({...errors, 
        email: 'Ошибка ввода почты. Допустимые символы: буквы латиницей, цифры, _  @  .',
      })
    } else if (formData.email.length > 20) {
      setErrors({...errors, 
        email: 'Почта не должна содержать более 20 символов',
      })
    } else {
      setErrors({...errors, 
        email: null,
      })
    }
  }
  
  function onChangePassword ({ target }) {
    setFormData({...formData,
      password: target.value,}
    )
  }

  function onBlurPassword () {
    if(formData.password.length > 20) {
      setErrors({...errors,
        password: "Пароль не должен содержать более 20 символов",
      })
    } else {
      setErrors({...errors,
        password: null,
      })
    }
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
          <form className={styles.Form} onSubmit={onSubmit}>
              {errors.email && <div>{errors.email}</div>}
              {errors.password && <div>{errors.password}</div>}
              <Input 
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
              <Input 
              type="password" 
              placeholder='Пароль' 
              value={formData.password}
              onChange={onChangePassword}
              onBlur={onBlurPassword}
              />
              <Input
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