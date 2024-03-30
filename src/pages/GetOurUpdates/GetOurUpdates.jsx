


const GetOurUpdates = () => {
    return (
        <div className='my-16 mx-10 lg:my-32'>

            <div className="w-full bg-slate-900 bg-[url(https://i.ibb.co/qrvbS1m/bg.jpg)] bg-center bg-blend-multiply bg-cover">

                <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
                    <h1 className="text-5xl antialiased font-semibold leadi text-center text-gray-100">Get Our Updates</h1>
                    <p className="pt-2 pb-8 text-xl antialiased text-center text-gray-100">Find out about events and other news</p>
                    <div className="flex flex-row">
                        <input type="text" placeholder="your@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3 text-slate-800" />
                        <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-primary text-gray-100">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetOurUpdates;