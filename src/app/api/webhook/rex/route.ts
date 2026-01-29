import { NextRequest, NextResponse } from 'next/server';

// Simple webhook endpoint for REX (no database for MVP)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Webhook REX reçu:', JSON.stringify(body, null, 2));

        // For MVP: just acknowledge receipt
        // TODO: Add Supabase integration when database is needed

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
    return NextResponse.json({
        status: 'ok',
        message: 'Webhook REX actif (MVP mode)',
        timestamp: new Date().toISOString(),
    });
}

