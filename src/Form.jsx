import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Form.module.css';

const fieldsSchema = yup.object({
  email: yup.string()
  .email('Введите корректный email')
  .max(20, 'Почта не должна содержать более 20 символов')
  .min(3, 'Почта не должна содержать менее 3х символов'),
  password: yup.string()
  .max(20, "Пароль не должен содержать более 20 символов"),
})

export default function Form () {

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '', 
      confirmedPassword: '',
    },
    resolver: yupResolver(fieldsSchema),
  })

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  function onSubmit (formData) {
    if(formData.email && formData.password && formData.confirmedPassword) {
      if(formData.password === formData.confirmedPassword) {
        console.log(formData)
      } else {
        console.log("Пароли не совпадают")
      }
    }
  }
    
    return (
          <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
              {emailError && <div>{emailError}</div>}
              {passwordError && <div>{passwordError}</div>}

              <input 
              name='Email' 
              type='text' 
              placeholder='Email'
              {...register('email')}
              />
              <input 
              name='Password' 
              type='password' 
              placeholder='Пароль'
              {...register('password')}
              />
              <input 
              name='Confirm password' 
              type='password' 
              placeholder='Повтор пароля'
              {...register('confirmedPassword')}
              />

              <button disabled={!!emailError || !!passwordError} 
                type='submit'
              >
                Зарегистрироваться
              </button>
          </form>
    );
};
