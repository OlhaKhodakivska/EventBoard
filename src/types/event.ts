export type EventStatus = "draft" | "published" | "cancelled" | "completed";
export type EventCategory = "workshop" | "talk" | "networking" | "review" | "other";

export type Attendee = {
    id: string;
    name: string;
    email: string;
};

export type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: EventCategory;
    status: EventStatus;
    maxAttendees: number;
    attendees: Attendee[];
    createdAt: string;
}