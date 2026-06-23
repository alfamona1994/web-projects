import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import User from "../../models/UserSchema";
import { connect } from "../../lib/connect";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add WEBHOOK_SECRET to your .env.local file");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing svix headers", { status: 400 });
    }

    // Get the raw body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify the webhook
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error: Verification failed", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        const data = evt.data as {
            id: string;
            email_addresses: { email_address: string }[];
            first_name: string;
            last_name: string;
            image_url: string;
        };

        await connect();

        const newUser = new User({
            clerkUserId: data.id,
            email: data.email_addresses[0]?.email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            imageUrl: data.image_url,
        });

        await newUser.save();
        console.log("User created:", newUser);
    }

    if (eventType === "user.updated") {
        const data = evt.data as {
            id: string;
            email_addresses: { email_address: string }[];
            first_name: string;
            last_name: string;
            image_url: string;
        };

        await connect();

        await User.findOneAndUpdate(
            { clerkUserId: data.id },
            {
                email: data.email_addresses[0]?.email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                imageUrl: data.image_url,
            }
        );
        console.log("User updated:", data.id);
    }

    if (eventType === "user.deleted") {
        const data = evt.data as { id: string };

        await connect();

        await User.findOneAndDelete({ clerkUserId: data.id });
        console.log("User deleted:", data.id);
    }

    return new Response("Webhook received", { status: 200 });
}