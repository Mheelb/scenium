"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import emailjs from "@emailjs/browser";

export default function Reserver() {
    const [form, setForm] = useState({
        type: "",
        email: "",
        tel: "",
        demande: "",
        accept: false,
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");
        setSent(false);

        if (!form.accept) {
            setError("Vous devez accepter les conditions.");
            setSending(false);
            return;
        }

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
                {
                    type: form.type,
                    email: form.email,
                    tel: form.tel,
                    demande: form.demande,
                },
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
            );
            setSent(true);
            setForm({
                type: "",
                email: "",
                tel: "",
                demande: "",
                accept: false,
            });
        } catch (err) {
            setError("Erreur lors de l'envoi. Merci de réessayer.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center h-screen pt-40">
            {!sent ? (
                <>
                    <h2 className="main-title">ON VOUS RECONTACTE BIENTÔT !</h2>
                    <div className="w-150 border border-white p-5 bg-white/10 text-white flex items-start gap-6" style={{ minHeight: '150px' }}>
                        <div>
                            <p className="text-lg font-light mb-1">Merci pour votre demande.<br />Notre équipe revient vers vous dans les plus brefs délais pour discuter des disponibilités et vous proposer un devis.</p>
                            <span>À très vite !</span>
                        </div>
                    </div>
                </>
            ) : (
                <h2 className="main-title">Contactes-nous pour réserver ta scène</h2>
            )}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 justify-center items-center mt-5">
                    <Input
                        className="w-150"
                        label="Quel type d'évènement organises-tu ?"
                        value={form.type}
                        type="select"
                        options={["Type d'évènement", "Mariage", "Anniversaire", "Baby Shower", "Baptême", "Autre"]}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    />
                    <Input
                        className="w-150"
                        label="Adresse email"
                        value={form.email}
                        type="email"
                        mandatory={true}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <Input
                        className="w-150"
                        label="Numéro de téléphone"
                        value={form.tel}
                        type="tel"
                        mandatory={true}
                        onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
                    />
                    <Input
                        className="w-150"
                        label="Une demande particulière ?"
                        value={form.demande}
                        type="textarea"
                        onChange={e => setForm(f => ({ ...f, demande: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        className="w-5 h-5 accent-black bg-white border-2 border-white rounded focus:ring-2 focus:ring-black"
                        checked={form.accept}
                        onChange={e => setForm(f => ({ ...f, accept: e.target.checked }))}
                    />
                    <p className="text-white font-light">J'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="flex justify-center my-8">
                    <Button type="submit" size="large" className="w-40" disabled={sending}>
                        {sending ? "Envoi..." : "Réserver"}
                    </Button>
                </div>
            </form>
        </div>
    );
}