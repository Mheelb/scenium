"use client";

import React, { useState } from "react";

interface InputProps {
    label?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    options?: string[];
    type?: "text" | "select" | "number" | "date" | "time" | "email" | "tel" | "url" | "search" | "password" | "textarea";
    className?: string;
    mandatory?: boolean;
    placeholder?: string;
}

function validateValue(type: string, value: string) {
    if (!value) return "";
    switch (type) {
        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Adresse email invalide";
        case "tel":
            return /^\+?\d{7,15}$/.test(value.replace(/\s/g, "")) ? "" : "Numéro de téléphone invalide";
        case "url":
            try { new URL(value); return ""; } catch { return "URL invalide"; }
        case "number":
            return /^-?\d*(\.\d+)?$/.test(value) ? "" : "Nombre invalide";
        case "date":
            return isNaN(Date.parse(value)) ? "Date invalide" : "";
        default:
            return "";
    }
}

export default function Input({ label, value, onChange, options, type = "text", className, mandatory = false, placeholder }: InputProps) {
    const [touched, setTouched] = useState(false);
    const error = validateValue(type, value);

    const handleBlur = () => setTouched(true);

    return (
        <div className={`mb-4 ${className ?? ""}`}>
            <label className="block text-white text-lg mb-2 font-light">
                {label} {mandatory && <span className="text-red-500">*</span>}
            </label>
            <div className="bg-white bg-opacity-80 rounded-xs relative">
                {type === "select" && options ? (
                    <>
                        <select
                            className="w-full px-5 py-2 text-lg text-gray-800 bg-transparent rounded-md focus:outline-none appearance-none pr-10"
                            {...(onChange
                                ? { value, onChange: onChange as React.ChangeEventHandler<HTMLSelectElement> }
                                : { defaultValue: value })}
                            onBlur={handleBlur}
                        >
                            {options.map((option, idx) => (
                                <option
                                    key={option}
                                    value={idx === 0 ? "" : option}
                                    disabled={idx === 0}
                                    hidden={idx === 0}
                                    className={idx === 0 ? "text-gray-400" : "text-gray-800"}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </>
                ) : type === "textarea" ? (
                    <textarea
                        className="w-full px-5 py-2 h-32 text-lg text-gray-800 bg-transparent rounded-md focus:outline-none appearance-none resize-none"
                        {...(onChange
                            ? { value, onChange: onChange as React.ChangeEventHandler<HTMLTextAreaElement> }
                            : { defaultValue: value })}
                        placeholder={placeholder}
                        onBlur={handleBlur}
                    />
                ) : (
                    <input
                        type={type}
                        className="w-full px-5 py-2 text-lg text-gray-800 bg-transparent rounded-md focus:outline-none appearance-none"
                        {...(onChange
                            ? { value, onChange: onChange as React.ChangeEventHandler<HTMLInputElement> }
                            : { defaultValue: value })}
                        placeholder={placeholder}
                        onBlur={handleBlur}
                    />
                )}
            </div>
            {touched && error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
        </div>
    );
}