"use client"
const PORT = process.env.NEXT_PUBLIC_API_URL;
export const Experience = ({ sectionTitle, experiences }) => {
    return (
        <div className='container-1256'>
            <div className='py-10 md:py-20 px-4 md:px-0'>
                <div className='w-[100%] md:w-[40%] mx-auto text-center mb-5 md:mb-10'>
                    <h1 className='text-[28px] md:text-[36px] leading-[32px] md:leading-[40px] font-goodTime'>{sectionTitle}</h1>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-6 w-full'>
                    {experiences?.map((experience, index) => (
                        <div key={index} className={`${index === 0 ? "bg-primary-100" : index === 1 ? "bg-secondary-100" : "bg-success-100"} w-full rounded-[16px] p-6 text-center items-center flex flex-col justify-center`}>
                            <img width="96px" src={experience?.image?.url} alt="ISO Certificate" />
                            <h3 className="mt-4 text-lg font-semibold text-[24px] dark:text-gray-900">{experience.title}</h3>
                            <p className="mt-2 text-gray-700">{experience.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}