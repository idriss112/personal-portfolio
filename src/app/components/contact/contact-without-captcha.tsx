"use client";

import emailjs from "@emailjs/browser";
import React, { useEffect, useRef, useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { isValidEmail } from "@/../utils/check-email";
import { User, Mail, MessageSquare } from "lucide-react";

const ContactWithoutCaptcha = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError({ ...error, required: false });
    }
  };

  const triggerSuccessAnimation = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }

    setShowSuccessAnimation(true);
    successTimeoutRef.current = setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 2200);
  };

  const handleSendMail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const autoReplyTemplateID =
      process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

    if (!serviceID || !templateID || !publicKey) {
      toast.error(
        "EmailJS is not configured. Please set service ID, template ID, and public key.",
      );
      return;
    }

    const options = {
      publicKey,
    };

    const trimmedName = input.name.trim();
    const trimmedEmail = input.email.trim();
    const trimmedMessage = input.message.trim();

    const templateParams = {
      from_name: trimmedName,
      from_email: trimmedEmail,
      sender_name: trimmedName,
      sender_email: trimmedEmail,
      email: trimmedEmail, // backward compatibility with current EmailJS template
      reply_to: trimmedEmail,
      message: trimmedMessage,
      subject: `Portfolio message from ${trimmedName}`,
      to_name: process.env.NEXT_PUBLIC_EMAILJS_TO_NAME ?? "Driss Laaziri",
      website_name: "Driss Laaziri Portfolio",
      submitted_at: new Date().toISOString(),
    };

    try {
      setIsLoading(true);
      const res = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        options,
      );

      if (res.status === 200) {
        let autoReplySent = false;

        if (autoReplyTemplateID) {
          try {
            const autoReplyParams = {
              to_name: trimmedName,
              to_email: trimmedEmail,
              from_name:
                process.env.NEXT_PUBLIC_EMAILJS_TO_NAME ?? "Driss Laaziri",
              reply_to:
                process.env.NEXT_PUBLIC_EMAILJS_REPLY_TO ?? "no-reply@local.dev",
              subject: `Thanks for reaching out, ${trimmedName}`,
              message: trimmedMessage,
              website_name: "Driss Laaziri Portfolio",
            };

            const autoReplyRes = await emailjs.send(
              serviceID,
              autoReplyTemplateID,
              autoReplyParams,
              options,
            );

            autoReplySent = autoReplyRes.status === 200;
          } catch (autoReplyError) {
            console.error("Auto-reply send failed:", autoReplyError);
          }
        }

        if (autoReplyTemplateID && autoReplySent) {
          toast.success("Message sent! Confirmation email delivered.");
        } else if (autoReplyTemplateID && !autoReplySent) {
          toast.success(
            "Message sent! Confirmation email failed, but your message was delivered.",
          );
        } else {
          toast.success("Message sent successfully!");
        }

        triggerSuccessAnimation();
        setIsLoading(false);
        setInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative group p-8 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Send a Message
          </h3>
          <p className="text-slate-400 text-sm">
            I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-[#61DAFB] transition-colors">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-[#61DAFB]/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600"
              type="text"
              placeholder="John Doe"
              maxLength={100}
              required={true}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-[#61DAFB] transition-colors">
              <Mail className="w-4 h-4" />
              Your Email
            </label>
            <input
              className={`bg-white/5 w-full border rounded-2xl focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 ${error.email ? "border-[#61DAFB]/50" : "border-white/10 focus:border-[#61DAFB]/50"}`}
              type="email"
              placeholder="john@example.com"
              maxLength={100}
              required={true}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email && (
              <p className="text-xs text-[#61DAFB] ml-1">
                Please provide a valid email address.
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-[#61DAFB] transition-colors">
              <MessageSquare className="w-4 h-4" />
              Your Message
            </label>
            <textarea
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-[#61DAFB]/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 resize-none"
              placeholder="Tell me about your project..."
              maxLength={500}
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows={4}
              value={input.message}
            />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {error.required && (
              <p className="text-sm text-[#61DAFB] text-center font-medium">
                Oops! Looks like some fields are still empty.
              </p>
            )}

            <button
              className="relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-[#61DAFB] to-[#20232A] p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              <div className="relative flex items-center justify-center gap-2 bg-[#050505] group-hover/btn:bg-transparent transition-all rounded-[15px] px-8 py-4 text-white font-bold uppercase tracking-widest text-sm">
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Send Message
                    <TbMailForward className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute w-1 h-20 bg-gradient-to-b from-[#61DAFB] to-transparent left-0 top-20 rounded-full" />

      {/* Success Animation Overlay */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center rounded-3xl transition-all duration-500 ${showSuccessAnimation ? "opacity-100 visible" : "opacity-0 invisible"}`}
        aria-live="polite"
      >
        <div className="absolute inset-0 rounded-3xl bg-[#050505]/85 backdrop-blur-sm" />
        <div
          className={`relative flex flex-col items-center gap-3 rounded-2xl border border-[#61DAFB]/30 bg-[#0b1220]/95 px-8 py-6 shadow-[0_0_30px_rgba(97,218,251,0.2)] transition-all duration-500 ${showSuccessAnimation ? "translate-y-0 scale-100" : "translate-y-4 scale-95"}`}
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-[#61DAFB]/40 animate-ping" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#61DAFB]/40 bg-[#61DAFB]/15">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 text-[#61DAFB]"
                aria-hidden="true"
              >
                <path
                  d="M20 7L10 17L5 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="text-center text-white font-semibold tracking-wide">
            Message Sent Successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactWithoutCaptcha;
