"use client"
export const Testimonial = ({ sectionTitle, testimonials }) => {
    return (
        <div className='container-1256'>
            <div className='py-10 md:py-20 px-4 md:px-0 flex flex-col md:flex-row gap-6'>
                <div className="w-[100%] md:w-[30%] h-[248px] flex flex-col relative justify-between bg-no-repeat bg-[length:auto_60%] bg-right-bottom" >
                    <h1 className="font-goodTime text-[28px] md:text-[36px] leading-[32px] md:leading-[40px]">
                        {sectionTitle}
                    </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="250"
                        height="250"
                        fill="currentColor"
                        className="fill-current absolute right-[0px] md:right-[-40px] bottom-[-60px] opacity-5 block"
                        viewBox="0 0 16 16"
                    >

                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                    </svg>


                    <div className="flex gap-6">
                        <button
                            type="button"
                            className="cursor-pointer h-10 w-10 text-primary-700 border border-primary-500 hover:bg-primary-500 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                className="fill-current text-primary-700 group-hover:text-white rotate-180"
                            >
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="h-10 w-10 cursor-pointer text-primary-700 border border-primary-500 hover:bg-primary-500 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                className="fill-current text-primary-700 group-hover:text-white"
                            >
                                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='bg-secondary-100 w-[100%] md:w-[70%] rounded-[16px] p-6 flex flex-col justify-between dark:text-gray-700'>
                    {testimonials?.map((testimonial, index) => (
                        <div className="h-[100%] flex flex-col justify-between" key={index}>
                            <p className='text-[20px] italic dark:text-gray-900 '>{testimonial.quote}</p>
                            <div className='flex gap-3'>
                                {/* <div className='bg-primary-500 rounded-[40px] h-10 w-10'></div> */}
                                <div>
                                    <h5 className='text-[18px] leading-[24px] font-semibold'>{testimonial.name}</h5>
                                    <p className='text-[14px] leading-[18px]'>{testimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}