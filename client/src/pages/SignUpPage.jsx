import React, { use, useEffect, useState } from 'react'
import{User, Mail, Lock, Eye, EyeOff} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUpStore } from '../stores/useSignUpStore';
import { useAuth } from '../context/AuthContext';
function SignUpPage() {
    const {formData, setForm_data, validateEmail, validatePassword, validateInputs, addUser, error,loading,resetform} = useSignUpStore();
    const {user, checkMe} = useAuth();
    const [showPword, setShowPword] = useState(false);
    const [showCPword, setShowCPword] = useState(false);
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        validateInputs();
    }
    useEffect(() => {
        if (formData.validated) {
            addUser().then(() => {
                resetform();
            });
            checkMe();
        }
        if(user){
          navigate('/dashboard')
        }else{
          console.log(user)
        }
    }, [formData.validated]);
    function onSubmit(data) {
        console.log(data);
    }
    const isLoading = false;
      if (loading) {
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
          <h2 className="text-3xl font-bold">Join NSBE Chapter</h2>
          <p className="mt-2 text-base-content/70">
            Create your account to get started
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {error?.message && ( <span className='text-error text-sm'>{error?.message}</span> )}
            <form onSubmit={(e) => {handleSubmit(e)}} className="space-y-6">
            {/* {er && ( <span className='text-error text-sm'>{error?.message}</span> )} */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      placeholder="First name"
                      onChange={(e) => setForm_data({...formData, first_name: e.target.value})}
                      value = {formData?.first_name}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      placeholder="Last name"
                      onChange={(e) => setForm_data({...formData, last_name: e.target.value})}
                      value = {formData?.last_name}
                    />
                  </div>
                  {/* {errors.lastName && (
                    <span className="text-error text-sm">{errors.lastName.message}</span>
                  )} */}
                </div>
              </div>

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
                    onChange={(e)=> {
                        setForm_data({...formData, email: e.target.value});
                        validateEmail();
                    }}
                    value = {formData?.email}
                  />
                </div>
                {error?.email && (
                  <span className="text-error text-ms"><li>{error.email}</li></span>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    type={showPword ? 'text' : 'password'}
                    className="input input-bordered w-full pl-10 pr-10"
                    placeholder="Create a password"
                    onChange={(e)=> {
                        setForm_data({...formData, password: e.target.value});
                        validatePassword();
                    }}
                    value = {formData.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPword(!showPword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPword ? (
                        <Eye className="w-5 h-5 text-base-content/50" />
                      
                    ) : (
                      <EyeOff className="w-5 h-5 text-base-content/50" />
                    )}
                  </button>
                </div>
                {error?.password && (
                  <span className="text-error text-ms"><li>{error.password}</li></span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                  <input
                    type={showCPword ? 'text' : 'password'}
                    className="input input-bordered w-full pl-10 pr-10"
                    placeholder="Confirm your password"
                    onChange={e =>{
                        setForm_data({...formData, confirmPassword: e.target.value});
                        validatePassword();
                    } }
                    value={formData.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCPword(!showCPword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showCPword ? (
                      <Eye className="w-5 h-5 text-base-content/50" />
                    ) : (
                        <EyeOff className="w-5 h-5 text-base-content/50" />
                      
                    )}
                  </button>
                </div>
                {error?.confirmPassword && (
                  <span className="text-error text-sm"><li>{error.confirmPassword}</li></span>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Create Account'
                )}
                
              </button>
            </form>

            <div className="divider">OR</div>

            <div className="text-center">
              <p className="text-sm text-base-content/70">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SignUpPage;
