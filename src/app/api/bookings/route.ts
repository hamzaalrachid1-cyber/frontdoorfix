import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json();
    
    // Mock booking ID generation
    const bookingId = `FDF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // TODO: Integrate with real backend/mail/CRM
    console.log('New booking received:', {
      bookingId,
      model: booking.model,
      lines: booking.lines,
      total: booking.total,
      customer: booking.customer,
      datetime: booking.datetime,
      note: booking.note
    });
    
    // Mock successful response
    return NextResponse.json({
      ok: true,
      bookingId,
      message: 'Booking modtaget! Vi kontakter dig inden for 30 min.'
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { ok: false, error: 'Der opstod en fejl. Prøv igen eller ring +45 93 54 54 57.' },
      { status: 500 }
    );
  }
}
