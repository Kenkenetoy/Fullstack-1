import LoginForm from '@/Components/LoginForm';
const Login = () => {
    return (
        <div className="relative flex justify-center overflow-hidden bg-[url('/images/loginBG.jpg')]">
            <div className="absolute -inset-4 bg-[url('/images/loginBG.jpg')] bg-cover bg-center blur-sm"></div>
            <div className="relative flex bg-base-100 shadow-2xl lg:my-12 lg:max-w-5xl lg:rounded-xl">
                <LoginForm />
                <div className="hidden h-full w-auto md:block">
                    <img
                        src="/images/loginimg.jpg"
                        className="h-full object-cover lg:rounded-r-xl"
                        alt="loginimg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
