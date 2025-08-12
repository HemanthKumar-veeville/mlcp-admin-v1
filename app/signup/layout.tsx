import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyLittleCockpit - Inscription",
  description: "Inscription à la plateforme MyLittleCockpit",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
