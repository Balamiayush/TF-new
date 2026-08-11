export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  barGradient: string;
  mobileGradient: string;
  position: "top" | "bottom";
}

export interface TimelineProps {
  timelineData: TimelineItem[];
}