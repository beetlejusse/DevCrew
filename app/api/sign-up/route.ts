import dbConnect from "@/lib/db";
import userModel from "@/models/User.model";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    await dbConnect()
    console.log("hello i am trying............................")
    try {
        const { userName, email, password } = await request.json()

        if (!email) {
            return Response.json(
                {
                    success: false,
                    message: 'Email is required',
                },
                { status: 400 }
            );
        }

        const existingUserVerifiedbyUsername = await userModel.findOne({ userName })

        if (existingUserVerifiedbyUsername) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, { status: 400 })
        }

        const existingUserbyEmail = await userModel.findOne({ email })

        if (existingUserbyEmail) {
            return Response.json(
                {
                    success: false,
                    message: 'Email is already registered',
                },
                { status: 400 }
            );
        } else {
            const hashpassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            //creating new user
            await userModel.create({
                userName,
                email,
                password: hashpassword
            })
            // await newUser.save()
        }
        return Response.json({
            success: true,
            message: "User registered successfull.",
            redirectUrl: '/sign-in'
        }, { status: 201 })

    } catch (error) {
        console.error('Error regestring user')
        return Response.json({
            success: false,
            message: "Error regestring user"
        }, {
            status: 500
        })
    }
}