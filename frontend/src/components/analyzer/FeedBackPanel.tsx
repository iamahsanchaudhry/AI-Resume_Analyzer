import FeedbackCard from "../shared/FeedbackCard";

interface Feedback {
  type: "success" | "warning" | "danger";
  title: string;
  description: string;
}

interface Props {
  feedback?: unknown;
}

export default function FeedbackPanel({ feedback }: Props) {
  const safeFeedback: Feedback[] = Array.isArray(feedback) ? feedback : [];

  return (
    <div className="grid md:grid-cols-3 gap-4 bg">
      {safeFeedback.length === 0 ? (
        <div className="col-span-full text-sm text-muted-foreground text-center">
          No feedback available yet.
        </div>
      ) : (
        safeFeedback.map((item, index) => (
          <FeedbackCard
            key={index}
            title={item.title}
            description={item.description}
            variant={item.type}
          />
        ))
      )}
    </div>
  );
}
