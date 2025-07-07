import { NextResponse } from 'next/server'
export async function GET() {
    const data = [
        { id: 1, lat: 13.7563, lng: 100.5018, name: 'Bangkok' },
        { id: 2, lat: 13.7367, lng: 100.5231, name: 'Grand Palace' },
    ]
    return NextResponse.json(data)
}
