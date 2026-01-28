import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Build-safe Supabase client - lazy initialization
let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Build-safe guard: don't initialize if env vars are missing
    if (!supabaseUrl || !supabaseServiceKey) {
        console.warn('Supabase env vars missing - client not initialized');
        return null;
    }

    if (!_supabase) {
        _supabase = createClient(supabaseUrl, supabaseServiceKey);
    }
    return _supabase;
}

export async function POST(request: NextRequest) {
    try {
        const supabase = getSupabase();

        if (!supabase) {
            return NextResponse.json(
                { error: 'Supabase not configured. Please set environment variables.' },
                { status: 500 }
            );
        }

        const body = await request.json();
        console.log('Webhook REX reçu:', JSON.stringify(body, null, 2));

        // TODO: Add your webhook processing logic here
        // For now, just acknowledge receipt

        return NextResponse.json({
            success: true,
            message: 'Webhook reçu',
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('Erreur webhook REX:', error);
        return NextResponse.json(
            {
                error: 'Erreur lors du traitement',
                details: error instanceof Error ? error.message : 'Erreur inconnue',
            },
            { status: 500 }
        );
    }
}

// Health check GET
export async function GET() {
    const supabase = getSupabase();

    return NextResponse.json({
        status: supabase ? 'ok' : 'warning',
        supabaseConfigured: !!supabase,
        message: supabase ? 'Webhook REX actif' : 'Supabase non configuré',
        timestamp: new Date().toISOString(),
    });
}
