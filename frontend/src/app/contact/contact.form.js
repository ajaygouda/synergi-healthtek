"use client"
export const Contactform = () => {
    return (
        <form className="mx-auto">
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" id="name" name="name" className="rounded-md bg-gray-50 border border-gray-200 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div className="flex gap-6">
                <div className="mb-5 w-full">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="email" name="email" className="rounded-md bg-gray-50 border border-gray-200 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input type="text" id="phone" name="phone" className="rounded-md bg-gray-50 border border-gray-200 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                <input type="text" id="subject" name="subject" className="rounded-md bg-gray-50 border border-gray-200 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div className="mb-5">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                <textarea rows={6} type="text" id="message" name="message" className="rounded-md bg-gray-50 border border-gray-200 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white"></textarea>
            </div>
            <div className="text-right">
                <button type="button" className="cursor-pointer text-white bg-primary hover:bg-primary-600 transition font-medium rounded-full text-base px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Send Message</button>
            </div>
        </form>
    )
}