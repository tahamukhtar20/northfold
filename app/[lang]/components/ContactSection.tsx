"use client";
import React, {useState, useRef} from "react";
import Button from "@/app/[lang]/components/Button";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection({
                                           title,
                                           nameTitle,
                                           emailTitle,
                                           phoneTitle,
                                           buttonLabel,
                                           CompanyTitle,
                                           NumberOfEmployeesTitle,
                                       }: {
    title: string;
    nameTitle: string;
    emailTitle: string;
    CompanyTitle: string;
    NumberOfEmployeesTitle: string;
    phoneTitle: string;
    buttonLabel: string;
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        employees: "",
        phone: "",
    });

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef?.current?.executeAsync();
        if (token) {
            console.log("reCAPTCHA Token:", token);
            // Handle form submission or token validation here
            // You can send the token to your backend for validation or use it as needed
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Process form submission here using formData state
        onSubmitWithReCAPTCHA();
        // Optionally, you can reset the form after submission
        setFormData({
            name: "",
            email: "",
            company: "",
            employees: "",
            phone: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="lg:px-20 border border-gray-200 bg-gray-50 m-2 rounded-2xl xs:px-10 px-4 lg:pb-20 xs:pb-10 pb-4 flex flex-col shadow dark:bg-slate-800 justify-center items-center gap-8 py-4"
        >
            <h1 className="font-semibold sm:text-5xl xs:text-3xl text-2xl p-0.5 text-start w-full my-8">
                {title}
            </h1>
            <div className="w-full flex flex-row">
                <input
                    type="text"
                    name="name"
                    placeholder={nameTitle}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"
                />
            </div>
            <div className="w-full flex flex-row">
                <input
                    type="text"
                    placeholder={emailTitle}
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"
                />
            </div>
            <div className="w-full flex flex-row">

                <input
                    type="text"
                    name="company"
                    placeholder={CompanyTitle}
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"
                />
            </div>
            <div className="w-full flex flex-row">
                <input
                    type="text"
                    name="employees"
                    required
                    placeholder={NumberOfEmployeesTitle}
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"
                />
            </div>
            <div className="w-full flex flex-row">
                <input
                    type="text"
                    placeholder={phoneTitle}
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-x-0 border-t-0 border-secondary focus:outline-0 rounded-none bg-transparent"
                />
            </div>
            <div className={"flex"}>
                <ReCAPTCHA
                    className={"static w-full"}
                    ref={recaptchaRef}
                    sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your reCAPTCHA site key
                    size="invisible" // Adjust size as needed
                    onChange={onSubmitWithReCAPTCHA}
                />
            </div>
            <Button className="self-start px-8 mt-4" type={"submit"}>{buttonLabel}</Button>
        </form>
    );
}
