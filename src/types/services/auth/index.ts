export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    status: string;
    message: string;
    ok: boolean;
};

export type VerifyEmailRequest = {
    email: string;
};

export type SignupRequest = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export type BusinessSignUpRequest = {
    email: string;
    industry: string;
    firstName: string;
    password: string;
    name: string;
    description: string;
}

export type SignupResponse = {
    errors: null | string;
    message: string;
    status: string;
}

export type ForgotPasswordRequest = {
    email: string;
};

export type ForgotPasswordResponse = {
    errors: null | string;
    message: string;
    status: string;
};

export type ResetPasswordRequest = {
    reset_code: string;
    new_password: string;
    temp_token: string;
};

export type ResetPasswordResponse = {
    errors: null | string;
    message: string;
    status: string;
};
