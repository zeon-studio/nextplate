export default function page() {
    return (
        <>
            <div className="container text-center ">
                <h1>Sign up </h1>
            </div>
            <section className="section pt-14">
                <div className="container">
                    <form className="form-box dark:bg-dark dark:text-white shadow-lg rounded-lg p-8 flex flex-col gap-4">
                        <input className="text-center mb-4 border border-dark rounded p-2 w-full dark:bg-gray-800 dark:border-gray-600"
                            type='text'
                            name='username'
                            placeholder='Username'
                        />
                        <input className="text-center border border-gray-300 rounded p-2 dark:bg-gray-800 dark:border-gray-600 w-full"
                            type='email'
                            name='email'
                            placeholder='Email'
                        />
                        <input className="text-center border border-gray-300 rounded p-2 dark:bg-gray-800 dark:border-gray-600 w-full"
                            type='password'
                            name='password'
                            placeholder='Password'
                        />
                        <button className="btn btn-primary w-full">Sign up</button>
                    </form>
                </div>
            </section>
        </>
    );  
}