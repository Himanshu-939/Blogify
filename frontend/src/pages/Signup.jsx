import React, { useState } from 'react'
import auth from "../assets/auth.jpg";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner'


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    })

    const handleChange = (e) => {
      console.log(e)
      //see what are the things coming with event
      const {name, value} = e.target
      setUser((prev) => ({
        ...prev,
        [name] : value
      }))
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      //console.log(user);

      try{
        const res = await axios.post('http://localhost:8000/api/v1/user/register', user, {
          headers:{
            "Content-Type" : "application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
          navigate('/login')
          toast.success(res.data.message)
        }else {
                toast.error(response.data.message)
            }

      } catch(error){
        //console.log(error);
        toast.error(error.response.data.message)
      }
    }

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block">
        <img src={auth} alt="" className="h-[700px]" />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an account
              </h1>
            </CardTitle>
            <p className=" mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value = {user.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value = {user.lastName}
                    onChange = {handleChange}
                    
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div>
                  <Label>Email</Label>
                  <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  name="email"
                  value = {user.email}
                  onChange = {handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                  />
              </div>
              <div className='relative'>
                  <Label>Password</Label>
                  <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  name="password"
                  value = {user.password}
                  onChange = {handleChange}

                  className="dark:border-gray-600 dark:bg-gray-900"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} type='button' className='absolute right-3 top-6 text-gray-500'>
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

                  </button>
              </div>
              <Button type="submit" className="w-full">Sign up</Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>Already have an account? 
                <Link to={'/login'}>
                <span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Signin</span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
