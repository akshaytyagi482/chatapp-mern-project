import { useState } from 'react';
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
    const [inputnew,setinputnew] = useState({
        username: "",
        password: "",
    })
  const {login,loading} = useLogin()
const handlechanges = (e) =>{
        e.preventDefault()
        setinputnew({...inputnew,[e.target.name]:e.target.value})
}
const Handlesubmit = async (e) =>{
      e.preventDefault()
      await login(inputnew)
}
     	return (
     		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
     			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
     				<h1 className='text-3xl font-semibold text-center text-gray-300'>
     					Login
     					<span className='text-blue-500'> Messenger</span>
     				</h1>
    
     				<form onSubmit={Handlesubmit}>
     					<div>
     						<label className='label p-2'>
     							<span className='text-base label-text'>Username</span>
     						</label>
     						<input onChange={(e)=>handlechanges(e)} value={inputnew.username} name='username' type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
     					</div>
    
     					<div>
     						<label className='label'>
     							<span className='text-base label-text'>Password</span>
     						</label>
     						<input
     							type='password'
                                name='password'
                                onChange={(e)=>handlechanges(e)}
                                value={inputnew.password}
     							placeholder='Enter Password'
     							className='w-full input input-bordered h-10'
     						/>
     					</div>
     					<Link to={'/signup'} className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
     						{"Don't"} have an account?
     					</Link>
    
     					<div>
     						<button className='btn btn-block btn-sm mt-2'>Login</button>
     					</div>
     				</form>
     			</div>
     		</div>
     	);
     };
     export default Login;