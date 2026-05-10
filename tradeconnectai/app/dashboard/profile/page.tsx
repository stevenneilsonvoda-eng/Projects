import Image from "next/image";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="mt-6 flex items-center gap-6">
        <Image
          src="/logo.png"
          width={80}
          height={80}
          alt="Profile"
          className="rounded-full"
        />

        <div>
          <p className="text-xl font-semibold">TradeConnectAI User</p>
          <p className="text-gray-600">you@example.com</p>
        </div>
      </div>
    </div>
  );
}
export const metadata = {
  title: "Profile — TradeConnectAI",
  description: "Manage your account and business details.",
};
