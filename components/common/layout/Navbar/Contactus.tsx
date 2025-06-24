"use client"
import { useState, Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

const Contactusform = () => {
    let [isOpen, setIsOpen] = useState(false);

    const [inputValues, setInputValues] = useState({
        input1: '',
        input2: '',
        input3: ''
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = () => {
        alert(`Name: ${inputValues.input1}, Email-address: ${inputValues.input2}, Message: ${inputValues.input3}`);
        setIsOpen(false)
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // handle form submission
    };

    const isDisabled = Object.values(inputValues).some((value) => value === '');

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <div className='lg:hidden'>
                    <button type="button" className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded' onClick={openModal}>
                        Contact Us
                    </button>
                </div>
                <div className='hidden lg:block'>
                    <button type="button" className='justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white' onClick={openModal}>
                        Contact Us
                    </button>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Link href="/" className='text-2xl sm:text-4xl font-semibold text-black'>
                                                Simbarku.co
                                            </Link>
                                        </div>
                                        <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Contact us now? Want to send us a feedback?</p>
                                        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                            <div>
                                                <input
                                                    id="text"
                                                    name="input1"
                                                    value={inputValues.input1}
                                                    onChange={handleChange}
                                                    type="text"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Name..."
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    id="email"
                                                    name="input2"
                                                    value={inputValues.input2}
                                                    onChange={handleChange}
                                                    type="email"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="xyz@email.com"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                {/* Additional form fields if needed */}
                                            </div>
                                            <button 
                                              type="button" 
                                              onClick={handleClick}
                                              className="w-full py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-[#007BFF] hover:text-white focus:ring-4 focus:outline-none transition-colors"
                                            >
                                              Submit
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Contactusform;
