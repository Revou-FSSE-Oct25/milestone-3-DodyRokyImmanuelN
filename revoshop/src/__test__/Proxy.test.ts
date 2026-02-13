/**
 * @jest-environment node
 */
import { proxy } from "../proxy";
import { NextRequest, NextResponse } from "next/server";

jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");
  return {
    ...originalModule,
    NextResponse: {
      next: jest.fn(() => ({
        status: 200,
        headers: new Map(),
      })),
      redirect: jest.fn((url) => ({
        status: 307,
        headers: new Map([["location", url.toString()]]),
      })),
    },
  };
});

describe("Proxy Authentication Guard", () => {
  it("harus meredirect user ke /login jika mengakses /admin tanpa cookie", () => {
    const req = new NextRequest(new URL("http://localhost:3000/admin"));

    const res = proxy(req);
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = (
      NextResponse.redirect as jest.Mock
    ).mock.calls[0][0].toString();
    expect(redirectUrl).toContain("/login");
  });

  it("harus mengizinkan akses jika cookie is_admin tersedia", () => {
    const req = new NextRequest(new URL("http://localhost:3000/admin"), {
      headers: {
        cookie: "is_admin=true",
      },
    });

    const res = proxy(req);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
