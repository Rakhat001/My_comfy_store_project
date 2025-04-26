import { FormInput} from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import {SubmitButton} from '../components';



export const action = (store) => async({request}) =>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('auth/local',data);
    toast.success('logged successfully');
    store.dispatch(loginUser(response.data))
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'please check you data';
    toast.error(errorMessage);
    return null
  }
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async() =>{
    try {
      const response = await customFetch.post('/auth/local',{
        identifier: 'test@test.com',
        password: 'secret'
      });
      dispatch(loginUser(response.data));
      toast.success('welcome guest user');
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error('guest user login error. please try again')
      
    }
  }


  return (
    <section className="h-screen place-items-center grid">
      <Form method="POST" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type='email' label='email' name='identifier'/>
        <FormInput type='password' label='password' name='password'/>

        <div className="mt-4">
          <SubmitButton text='login' />
          <button className="mt-2 btn btn-secondary btn-block" type="button" onClick={loginAsGuestUser}>guest user</button>
        </div>
        <p className="text-center">Not member yet? <Link to='/register' className="ml-2 link link-hover link-primary capitalize">go register</Link></p>
      </Form>
    </section>
  )
}

export default Login
