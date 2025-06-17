"use client"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const FAQ = () => {
    return (
        <div id="faq-section" className='mx-auto max-w-7xl py-24 lg:px-8 bg-faqblue rounded-2xl my-16 faq-bg'>
            <h3 className='text-xl font-normal text-black text-center mb-6'>FAQ</h3>
            <h2 className='text-4xl lg:text-6xl font-semibold text-center text-black'>Frequently asked <br /> questions.</h2>
            <div className="w-full px-4 pt-16">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-brightblue py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-white">
                                    <span>Do you ship nationwide?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-white`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-white font-normal opacity-80">
                                    Yes, we ship to all regions across Indonesia. We ensure your staghorn fern and accessories are carefully packed and delivered in fresh, healthy condition through trusted delivery partners. Wherever you are, we’ll bring a touch of green to your space.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-brightblue py-8 px-6 mb-5">
                    <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-white">
                                    <span>What accessories do I need for my simbar?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-white`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-white font-normal opacity-80">
                                    To properly care for and display your staghorn fern, you’ll need several key accessories. These include moss as a growing medium, mounting frames (wood or metal), wire or simbar thread for securing the plant, and optional items like plant vitamins and grow lights to support healthy growth. These tools not only make maintenance easier but also enhance the beauty of your simbar display.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

            </div>
        </div>
    )
}

export default FAQ;