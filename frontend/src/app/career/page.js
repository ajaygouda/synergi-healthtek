const PORT = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export const Career = async () => {
    const apiData = await fetch(`${PORT}/api/career-page?populate=*`);
    const jsonData = await apiData.json();
    const careerPage = await jsonData.data;

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-600">
                <div className="container-1256 py-10 px-4 md:px-0">
                    <div className="w-full md:w-[60%]">
                        <h5 className="uppercase tracking-widest text-[16px] font-medium mb-4">{careerPage.pageName}</h5>
                        <h1 className="font-goodTime w-[500px] leading-[36px] text-[28px] md:leading-[64px] md:text-[56px] mb-2">{careerPage.title}</h1>
                        <p>{careerPage.description}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-700">
                <div className="container-1256 py-10 px-4 md:px-0">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                            {careerPage.jobs.map((job, index) => (
                                <a href="" key={job.id} className="border-b py-6 dark:border-gray-400 border-gray-200 hover:border-gray-700 hover:dark:border-gray-200">
                                    <h5 className="font-bold text-[20px] mb-4 dark:text-gray-100">{job.title}</h5>
                                    <p className="text-gray-500 dark:text-gray-200">{job.shortDescription}</p>
                                    <div className="flex justify-between mt-4">
                                        <div className="flex gap-6 text-gray-500 dark:text-gray-200">
                                            {job.experience && <span className="flex gap-2"><svg className="h-6 w-6 fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z"></path></svg> <span>{job.experience} Years</span></span>}
                                            {job.totalOpening && < span className="flex gap-2"><svg className="h-6 w-6 fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg> <span>{job.totalOpening}</span></span>}
                                            {job.location && <span className="flex gap-2"><svg className="h-6 w-6 fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2m0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"></path></svg> <span>{job.location}</span></span>}
                                        </div>
                                        <button type="button" className="cursor-pointer bg-primary-500 justify-center h-10 px-6 py-4 transition text-white  hover:bg-primary-600 font-medium rounded-full text-sm p-2 text-center inline-flex items-center group">Apply</button>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Career;