import { NextResponse } from "next/server";
import { createUser } from "../../../../sanity/sanity.query";

export async function POST(request: Request) {
  // Process post request
  const formData = await request.formData();

  console.log("Form name: ", formData.get("name"));
  try {
    const result = await createUser({
      _type: "user",
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
    console.log("Result: ", result);
    return NextResponse.json({ message: "User updated sucessfully!" });
  } catch (err) {
    console.log("Failed: ", err);
    return NextResponse.json(
      { message: "Failed to upload user" },
      { status: 500 },
    );
  }
}
