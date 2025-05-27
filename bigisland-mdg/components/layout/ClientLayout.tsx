"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 sec
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <>{children}</>;
}
