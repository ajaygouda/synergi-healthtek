import Link from 'next/link'
import Image from 'next/image';
const Hero = ({ slider }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-700">
            {slider?.map((item, index) => (
                <div key={index} className='container-1256 flex-col-reverse px-4 md:px-0 py-10 md:py-20 flex md:flex-row gap-6 items-center justify-between mx-auto '>
                    <div className="w-full flex flex-col gap-4 md:gap-6">
                        <h1 className="font-goodTime leading-[42px] text-[36px] md:leading-[72px] md:text-[56px]">{item.title}</h1>
                        <p>{item.description}</p>
                        <div className="flex gap-6 items-center">
                            <button type="button" className="cursor-pointer text-white bg-primary hover:bg-primary-600 transition font-medium rounded-full text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">{item.ctaText}</button>
                            <Link href={item.ctaSecondLink} className="transition text-gray-700 hover:text-primary-500 dark:text-gray-100 hover:underline">{item.ctaSecondText}</Link>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="relative w-full h-[250px] md:h-[384px]">
                            <Image
                                src="/hero.png"
                                alt="Hero"
                                fill
                                priority
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Hero;
