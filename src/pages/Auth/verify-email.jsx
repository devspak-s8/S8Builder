import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  useEffect(() => {
    if (accessToken && refreshToken) {
      // Save tokens in sessionStorage (or localStorage if you want "remember me" behavior)
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);

      // Navigate to dashboard
      navigate("/user-dashboard", { replace: true });
    } else {
      alert("❌ Invalid or expired verification link.");
      navigate("/", { replace: true });
    }
  }, [accessToken, refreshToken, navigate]);

  return <div>Verifying your email...</div>;
}
