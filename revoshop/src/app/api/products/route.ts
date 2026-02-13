import { NextResponse } from "next/server";

const EXTERNAL_API_URL = "https://fakestoreapi.com/products";

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_API_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(EXTERNAL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const newItem = await res.json();
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}
