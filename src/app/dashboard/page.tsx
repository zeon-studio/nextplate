'use client';
import Image from 'next/image';
import Link from 'next/link';


export default function page(){
   
    return (
        <>
             <div className="container text-center mb-10 ">
                <h1>Dashboard page</h1>
            </div>
              <div className="col-12">
                <Image
                src="/images/banner.png"
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                
                />
              </div>
            
           
            <section className="section pt-14">
                <div className="container">
                    
                    <div className="form-box dark:bg-dark dark:text-white shadow-lg rounded-lg p-8 flex flex-col gap-4">
                        <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
                        <p className="text-gray-600 dark:text-gray-400">This is your dashboard where you can manage your account and settings.</p>
                        <div className="mt-6">
                            <button className="btn btn-primary w-full">Go to Settings</button>
                            <button className="btn btn-primary w-full mt-4" ><Link href="/">Logout</Link></button>
                             {/* <button className="btn btn-primary w-full mt-4" onClick={() => signOut()}>Logout</button> */}

                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}