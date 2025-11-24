import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Kiểm tra đầu vào trước khi gọi API
    if (!username || !password) {
      return NextResponse.json(
        { message: "Thiếu username hoặc password" },
        { status: 400 }
      );
    }

    // Gọi DummyJSON với header đầy đủ
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log("Body gửi đi:", { username, password });
    console.log("Response status:", res.status);
    console.log("Response data:", data);

    // Nếu DummyJSON trả lỗi
    if (!res.ok) {
      console.error("DummyJSON error:", data);
      return NextResponse.json(data, { status: res.status });
    }

    // Thành công → trả về token và user
return NextResponse.json(
  {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    },
  },
  { status: 200 }
);

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}