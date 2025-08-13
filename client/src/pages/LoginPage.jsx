import React from "react";
import { useLoginStore } from "../stores/useLoginStore";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const { user,login, logingUser, loadingUser} = useAuth()
    const { loading, formData, loginUser, setformData } = useLoginStore();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }else{
            console.log(user)
        }
        
    },[user])

      if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-content font-bold text-2xl">N</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="mt-2 text-base-content/70">
                        Sign in to your NSBE account
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            login(formData.email, formData.password)
                            console.log(user);
                        }} className="space-y-6">
                            <div>
                                <label className="label">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                    <input
                                        type="email"
                                        className="input input-bordered w-full pl-10"
                                        placeholder="Enter your email"
                                        onChange={(e) => {
                                            setformData({
                                                ...formData,
                                                email: e.target.value
                                            })

                                        }}
                                    />
                                </div>
                                {/* {errors.email && (
                  <span className="text-error text-sm">{errors.email.message}</span>
                )} */}
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="input input-bordered w-full pl-10 pr-10"
                                        placeholder="Enter your password"
                                        onChange={(e) => {
                                            setformData({
                                                ...formData,
                                                password: e.target.value
                                            })

                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <Eye className="w-5 h-5 text-base-content/50" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-base-content/50" />
                                        )}
                                    </button>
                                </div>
                                {/* {errors.password && (
                  <span className="text-error text-sm">{errors.password.message}</span>
                )} */}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-sm" />
                                    <span className="label-text ml-2">Remember me</span>
                                </label>
                                {/* <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                  Forgot password?
                </Link> */}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !formData.email || !formData.password}
                                className="btn btn-primary w-full"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm">Loading..</span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="divider">OR</div>

                        <div className="text-center">
                            <p className="text-sm text-base-content/70">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-primary hover:underline font-semibold">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;