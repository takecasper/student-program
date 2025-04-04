import { SessionItem } from "@/types/course";

export const sessionData: SessionItem[] = [
  {
    day: "Wed",
    date: "28",
    time: "09:00 - 11:00",
    facilitator: "Allen",
    location: "Online",
    isHighlighted: true,
    attendees: 50,
  },
  {
    day: "Thur",
    date: "29",
    time: "09:00 - 11:00",
    facilitator: "Allen",
    location: "Medical Building",
    isHighlighted: false,
    attendees: 50,
  },
  // Friday sessions
  ...Array(5).fill({
    day: "Fri",
    date: "30",
    time: "09:00 - 11:00",
    facilitator: "Allen",
    location: "Online",
    isHighlighted: false,
    attendees: 50,
  }),
];
