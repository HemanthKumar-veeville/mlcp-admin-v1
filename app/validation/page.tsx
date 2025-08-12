"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Menu, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ValidationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Simulate API call for OTP submission
  const simulateApiCall = (): Promise<{
    success: boolean;
    message: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        resolve({
          success: isSuccess,
          message: isSuccess
            ? "Code vérifié avec succès!"
            : "Code incorrect. Veuillez réessayer.",
        });
      }, 2000); // 2 second delay
    });
  };

  const handleContinue = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setIsSubmitting(true);
      setSubmissionMessage("");

      try {
        const result = await simulateApiCall();
        setSubmissionMessage(result.message);

        if (result.success) {
          // Clear OTP on success
          setOtp(["", "", "", "", "", ""]);
          // You can redirect here or show success state
          console.log("OTP submitted successfully:", otpString);
          router.push(`/incubator_search`);
        } else {
          // Clear OTP on failure
          setOtp(["", "", "", "", "", ""]);
          // Focus first input for retry
          inputRefs.current[0]?.focus();
        }
      } catch (error) {
        setSubmissionMessage("Une erreur s'est produite. Veuillez réessayer.");
        console.error("OTP submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Simulate API call for resend OTP
  const simulateResendApiCall = (): Promise<{
    success: boolean;
    message: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 95% success rate
        const isSuccess = Math.random() > 0.05;
        resolve({
          success: isSuccess,
          message: isSuccess
            ? "Nouveau code envoyé avec succès!"
            : "Échec de l'envoi. Veuillez réessayer.",
        });
      }, 1500); // 1.5 second delay
    });
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setSubmissionMessage("");

    try {
      const result = await simulateResendApiCall();
      setSubmissionMessage(result.message);

      if (result.success) {
        // Set 30 second cooldown
        setResendCooldown(30);
        console.log("Resend code requested successfully");
      }
    } catch (error) {
      setSubmissionMessage(
        "Une erreur s'est produite lors de l'envoi du code."
      );
      console.error("Resend code error:", error);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-8 pt-0 px-0 relative size-full bg-[#fdfaf6]">
      {/* Progress Bar */}
      <div className="h-[5px] left-0 top-16 w-80">
        <div className="bg-[#cf4326] h-[5px] w-[91.42px]" />
      </div>

      {/* Main Container */}
      <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-between min-h-[calc(100vh-200px)] min-w-px px-4 py-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {/* Back Button */}
          <Link href="/signup" className="w-full">
            <button className="box-border content-stretch cursor-pointer flex flex-col gap-4 items-start justify-center overflow-visible p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0">
                  <ArrowLeft size={24} className="text-[#2a2a2a]" />
                </div>
                <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#2a2a2a] text-[12px] text-left text-nowrap">
                  <span className="block leading-[16px] whitespace-pre">
                    Retour
                  </span>
                </div>
              </div>
            </button>
          </Link>

          {/* Content Container */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-full">
            {/* Title and Subtitle */}
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#2a2a2a] text-left w-full">
                <div className="font-bold relative shrink-0 text-[24px] w-full font-poppins">
                  <span className="block leading-[1.3]">
                    Vérifiez votre adresse mail
                  </span>
                </div>
                <div className="font-normal relative shrink-0 text-[14px] w-full">
                  <span className="leading-[20px] text-[14px]">
                    <span>Nous vous avez envoyé un code à l'adresse </span>
                    <span className="font-bold not-italic">john@gmail.com</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {submissionMessage && (
              <div
                className={`mb-6 w-full p-3 rounded-md text-sm ${
                  submissionMessage.includes("succès")
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {submissionMessage}
              </div>
            )}

            {/* OTP Input Container */}
            <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-full">
              <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0 w-72">
                <div className="relative rounded-md shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row items-start justify-center overflow-clip pl-0 pr-px py-0 relative w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="basis-0 bg-[#ffffff] grow h-10 min-h-px min-w-px mr-[-1px] relative shrink-0"
                      >
                        <input
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={otp[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-full h-full text-center text-sm bg-transparent border-none outline-none focus:outline-none focus:ring-2 focus:ring-[#cf4326] focus:ring-opacity-50"
                          style={{ caretColor: "#cf4326" }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute border border-neutral-300 border-solid inset-0 pointer-events-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute border border-neutral-300 border-solid inset-0 pointer-events-none rounded-md"
                  />
                </div>
                <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-left text-neutral-500 w-full">
                  {resendCooldown > 0 ? (
                    <span className="block leading-[20px] text-[14px]">
                      Renvoyer dans {formatTime(resendCooldown)}
                    </span>
                  ) : (
                    <button
                      onClick={handleResendCode}
                      disabled={isResending}
                      className="underline block leading-[20px] text-[14px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isResending && (
                        <Loader2 size={14} className="animate-spin" />
                      )}
                      Renvoyez le code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="bg-[#cf4326] box-border content-stretch flex flex-row gap-2 items-center justify-center min-h-10 min-w-10 px-4 py-2 relative rounded-md shrink-0 w-full">
          <div className="basis-0 font-medium grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-center">
            <button
              onClick={handleContinue}
              disabled={otp.join("").length !== 6 || isSubmitting}
              className="block leading-[20px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Vérification..." : "Continuer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
