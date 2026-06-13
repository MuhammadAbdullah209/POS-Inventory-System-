import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getUser, getToken } from "@/lib/api";

interface Props {
    allow: string[];          // roles allowed on this page
    children: React.ReactNode;
}

export function RequireRole({ allow, children }: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            navigate({ to: "/login" });
            return;
        }
        const user = getUser();
        if (!user || !allow.includes(user.role ?? "")) {
            // Staff trying to access an admin page → send them to /scan
            navigate({ to: "/scan" });
        }
    }, []);

    return <>{children}</>;
}