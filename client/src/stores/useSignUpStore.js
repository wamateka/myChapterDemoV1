import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isEmail, isStrongPassword } from 'validator';
const BASE_URL = 'http://localhost:3000/api/members';
export const useSignUpStore = create((set, get) => ({
    loading: false,
    formData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        validated: false,
    },
    error: {
        message: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    setForm_data: (formData) => set({ formData }),
    resetform: () => set({
        formData: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            validated: false,
        },
    }),
    validateEmail: () => {
        const { formData, error } = get();
        if (!isEmail(formData.email)) {
            set(state => ({
                error: { ...state.error, email: "Invalid email" }
            }));
        } else {
            set(state => ({
                error: { ...state.error, email: '' }
            }));
        }
    },
    validatePassword: () => {
        const { formData, error } = get();
        if (!isStrongPassword(formData.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            set(state => ({
                error: {
                    ...state.error,
                    password: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                }
            }))
        } else {
            set(state => ({
                error: {
                    ...state.error,
                    password: ''
                }
            }))
        }

        if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
            set(state => ({
                error: {
                    ...state.error,
                    confirmPassword: "Passwords do not match"
                }
            }))
        } else {
            set(state => ({
                error: {
                    ...state.error,
                    confirmPassword: ''
                }
            }))
        }
    },
    validateInputs: () => {
        const { error, formData } = get();
        if (error.email || error.password || error.confirmPassword) {
            set(state => ({
                error: {
                    ...state.error,
                    message: "fixes the errors below"
                }
            }))
            set(state => ({
                formData: {
                    ...state.formData,
                    validated: false,
                }
            }))
        } else {
            set(state => ({
                formData: {
                    ...state.formData,
                    validated: true,
                }
            }))
            set(state => ({
                error: {
                    ...state.error,
                    message: ''
                }
            }))
        }
    },
    addUser: async () => {
        set({ loading: true });
        const { error } = get();
        const { formData } = get();
        try {
            await axios.post(`${BASE_URL}`, formData)
            set({ error: null });
            toast.success('sign up successful!');

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                set({ ...error, message: error.response.data.message });
                toast.error(error.response.data.message);
            } else {
                console.error('Error adding user: ', error);
                set({ ...error, message: "Error adding user" });
                toast.error("Error adding user");
            }
        } finally {
            set({ loading: false });
        }
    }
}))