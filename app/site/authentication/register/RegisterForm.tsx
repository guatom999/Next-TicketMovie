import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    isLoading: boolean
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    isError: boolean
    errorMessage: string
    handleSubmit: (e: React.FormEvent) => void
}

type ValidationErrors = {
    email?: string
    username?: string
    password?: string
}

const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "กรุณากรอก Email"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "รูปแบบ Email ไม่ถูกต้อง"
    return undefined
}

const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) return "กรุณากรอก Username"
    if (username.trim().length < 6) return "Username ต้องมีอย่างน้อย 6 ตัวอักษร"
    return undefined
}

const validatePassword = (password: string): string | undefined => {
    if (!password) return "กรุณากรอก Password"
    if (password.length < 8) return "Password ต้องมีอย่างน้อย 8 ตัวอักษร"
    if (!/[a-z]/.test(password)) return "Password ต้องมีตัวอักษรพิมพ์เล็ก (a-z)"
    if (!/[A-Z]/.test(password)) return "Password ต้องมีตัวอักษรพิมพ์ใหญ่ (A-Z)"
    if (!/[0-9]/.test(password)) return "Password ต้องมีตัวเลข (0-9)"
    return undefined
}

const RegisterForm = ({ isLoading, email, username, password, setEmail, setUsername, setPassword, isError, errorMessage, handleSubmit }: Props) => {
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        validateField(field)
    }

    const validateField = (field: string) => {
        setValidationErrors((prev) => {
            const newErrors = { ...prev }
            if (field === 'email') newErrors.email = validateEmail(email)
            if (field === 'username') newErrors.username = validateUsername(username)
            if (field === 'password') newErrors.password = validatePassword(password)
            return newErrors
        })
    }

    const handleValidatedSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Mark all fields as touched
        setTouched({ email: true, username: true, password: true })

        // Validate all fields
        const errors: ValidationErrors = {
            email: validateEmail(email),
            username: validateUsername(username),
            password: validatePassword(password),
        }
        setValidationErrors(errors)

        // If any errors exist, don't submit
        if (errors.email || errors.username || errors.password) return

        handleSubmit(e)
    }

    // Password strength indicator
    const getPasswordStrength = (): { label: string; color: string; width: string } => {
        if (!password) return { label: '', color: '', width: '0%' }
        let score = 0
        if (password.length >= 8) score++
        if (/[a-z]/.test(password)) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^a-zA-Z0-9]/.test(password)) score++

        if (score <= 2) return { label: 'อ่อน', color: 'bg-red-500', width: '33%' }
        if (score <= 3) return { label: 'ปานกลาง', color: 'bg-yellow-500', width: '66%' }
        return { label: 'แข็งแรง', color: 'bg-green-500', width: '100%' }
    }

    const strength = getPasswordStrength()

    return (
        <div className="flex justify-center items-center">
            <div className="w-[250px] m-10">
                <p className="flex justify-center text-4xl">Register</p>
                <form
                    onSubmit={handleValidatedSubmit}
                    noValidate
                >
                    <div className="w-full flex flex-col space-y-4 justify-center my-5">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                value={email}
                                className={`w-full border-b-2 p-2 outline-none transition-colors ${touched.email && validationErrors.email
                                    ? 'border-red-400'
                                    : 'border-gray-300 focus:border-blue-500'
                                    }`}
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value); if (touched.email) validateField('email') }}
                                onBlur={() => handleBlur('email')}
                            />
                            {touched.email && validationErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <input
                                value={username}
                                className={`w-full border-b-2 p-2 outline-none transition-colors ${touched.username && validationErrors.username
                                    ? 'border-red-400'
                                    : 'border-gray-300 focus:border-blue-500'
                                    }`}
                                placeholder="Username"
                                onChange={(e) => { setUsername(e.target.value); if (touched.username) validateField('username') }}
                                onBlur={() => handleBlur('username')}
                            />
                            {touched.username && validationErrors.username && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                value={password}
                                className={`w-full border-b-2 p-2 outline-none transition-colors ${touched.password && validationErrors.password
                                    ? 'border-red-400'
                                    : 'border-gray-300 focus:border-blue-500'
                                    }`}
                                placeholder="Password"
                                onChange={(e) => { setPassword(e.target.value); if (touched.password) validateField('password') }}
                                onBlur={() => handleBlur('password')}
                            />
                            {touched.password && validationErrors.password && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                            )}

                            {/* Password strength bar */}
                            {password && (
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                                            style={{ width: strength.width }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">ความแข็งแรง: {strength.label}</p>
                                </div>
                            )}

                            {/* Password requirements */}
                            {touched.password && password && (
                                <ul className="text-xs mt-2 space-y-0.5">
                                    <li className={password.length >= 8 ? 'text-green-600' : 'text-gray-400'}>
                                        {password.length >= 8 ? '✓' : '○'} อย่างน้อย 8 ตัวอักษร
                                    </li>
                                    <li className={/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}>
                                        {/[a-z]/.test(password) ? '✓' : '○'} ตัวอักษรพิมพ์เล็ก (a-z)
                                    </li>
                                    <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}>
                                        {/[A-Z]/.test(password) ? '✓' : '○'} ตัวอักษรพิมพ์ใหญ่ (A-Z)
                                    </li>
                                    <li className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}>
                                        {/[0-9]/.test(password) ? '✓' : '○'} ตัวเลข (0-9)
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {isError && (
                        <div className="flex justify-center">
                            <p className="text-red-500">{errorMessage}</p>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gray-300 bg-opacity-90 border rounded-md p-2 my-10 text-white hover:bg-slate-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'กำลังสมัคร...' : 'Sign Up'}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default RegisterForm