import AdminRegisterForm from './Partials/AdminRegisterForm';
import { RegisterForm } from './Partials/RegisterForm';
export default function Register() {
    return (
        <div className="relative flex justify-center overflow-hidden bg-[url('/images/loginBG.jpg')]">
            <div className="absolute -inset-4 bg-[url('/images/loginBG.jpg')] bg-cover bg-center blur-sm"></div>
            {/* <RegisterForm /> */}
            <div className="relative flex-col shadow-2xl bg-base-100 lg:max-w-7xl lg:rounded-xl">
                <RegisterForm />
                <div className="p-12">
                    <AdminRegisterForm />
                </div>
            </div>
        </div>
    );
}
