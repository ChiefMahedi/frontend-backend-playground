import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface EmailFormModal {
    email: string;
}

const EmailFormModal = (props: EmailFormModal) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        user_name: "",
        message: "",
    });
    const form = useRef<HTMLFormElement | null>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        emailjs
            .send(import.meta.env.EMAILJS_SERVICE_KEY, import.meta.env.EMAILJS_TEMPLATE_KEY, {
                user_name: formValues.user_name,
                user_email: props.email,
                message: formValues.message,
                from_name: 'SalesCRM'
            }, {
                publicKey: import.meta.env.EMAILJS_PUBLIC_KEY
            })
            .then(
                () => {
                    console.log("Email Sent");
                },
                (error) => {
                    console.log("Email could not be sent", error);
                }
            );
    };

    return (
        <div>
            {/* Button to open modal */}
            <FontAwesomeIcon onClick={openModal} className="ml-2 laptop:text-xl" icon={faEnvelope} />
            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Send Email to This Customer</h2>
                        <form onSubmit={sendEmail} ref={form} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
                            <div>
                                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter your name"
                                    value={formValues.user_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter your email"
                                    value={props.email}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Write your message here"
                                    value={formValues.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    value="Send"
                                    className="w-full bg-sidebar text-white font-medium py-2 rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mt-3 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailFormModal;
