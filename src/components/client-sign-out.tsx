"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function ClientSignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    return (
        <button 
            type="button" 
            onClick={handleSignOut}
            style={{ 
                background: '#ef4444', 
                color: 'white', 
                border: 'none', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.5rem', 
                fontWeight: 600, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
            }}
        >
            Sign Out <LogOut size={16} />
        </button>
    );
}
