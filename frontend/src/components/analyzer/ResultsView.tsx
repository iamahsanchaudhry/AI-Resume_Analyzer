import FeedbackPanel from "./FeedBackPanel";
import ScoreCard from "./ScoreCard";
import SkillsPanel from "./SkillsPanel";

interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
}

interface Feedback {
  type: "success" | "warning" | "danger";
  title: string;
  description: string;
}

interface Props {
  score: number;
  skills: Skill[];
  feedback: Feedback[];
}

export default function ResultsView({
  score,
  skills,
  feedback,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Top grid (Score + Skills) */}
      <div className="grid md:grid-cols-2 gap-6">
        <ScoreCard score={score} />
        <SkillsPanel skills={skills} />
      </div>

      {/* Feedback section */}
      <FeedbackPanel feedback={feedback} />
    </div>
  );
}