import { Address } from "./address";
import { Contactform } from "./contact.form";
const PORT = process.env.NEXT_PUBLIC_API_URL;

export const Contact = async () => {
    const apiData = await fetch(`${PORT}/api/contact-page?populate[address][populate][emails]=true&populate[address][populate][phones]=true`);
    const jsonData = await apiData.json();
    const contactData = jsonData.data;
    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-600">
                <div className="container-1256 py-10 px-4 md:px-0">
                    <div className="w-full md:w-[80%]">
                        <h5 className="uppercase tracking-widest text-[16px] font-medium mb-4">{contactData?.pageName}</h5>
                        <h1 className="font-goodTime w-[500px] leading-[36px] text-[28px] md:leading-[64px] md:text-[56px] mb-2">{contactData?.title}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-700">
                <div className="container-1256 py-10 px-4 md:px-0">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-20">
                            <div className="w-[70%] h-full">
                                <Contactform />
                            </div>
                            <div className="w-[30%] bg-secondary-100 rounded-lg p-6 dark:text-gray-700">
                                <Address data={contactData?.address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact;