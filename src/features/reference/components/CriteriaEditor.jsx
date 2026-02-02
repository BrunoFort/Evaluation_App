import React from "react";

const CRITERIA = [
  {
    key: "qualityProductivity",
    label: "Quality and Productivity",
    description: "Efficiency, accuracy, and volume of deliverables.",
  },
  {
    key: "knowledgeSkills",
    label: "Knowledge and Skills",
    description:
      "Mastery of the technical (hard skills) and behavioral (soft skills) required for the role.",
  },
  {
    key: "goalAchievement",
    label: "Goal Achievement",
    description: "Achieving or exceeding established objectives.",
  },
  {
    key: "teamworkCollaboration",
    label: "Teamwork and Collaboration",
    description:
      "Ability to interact and cooperate with colleagues and leaders.",
  },
  {
    key: "initiativeProactivity",
    label: "Initiative and Proactivity",
    description: "Presenting ideas, solving problems, and seeking improvements.",
  },
  {
    key: "selfManagement",
    label: "Self-Management",
    description: "Ability to self-manage with little or no supervision.",
  },
  {
    key: "communicationRelationships",
    label: "Communication and Interpersonal Relationships",
    description:
      "Clarity in communication and good relationships with the team.",
  },
];

export function CriteriaEditor({ values, onChange }) {
  function setValue(key, value) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  return (
    <div className="mt-4 space-y-6">
      {CRITERIA.map((c) => {
        const current = values?.[c.key] ?? 0;

        return (
          <div key={c.key} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-neutral-800">
                {c.label}
              </span>
              <span
                className="text-xs text-neutral-500 cursor-help"
                title={c.description}
              >
                (?)
              </span>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 text-xl select-none">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  onClick={() => setValue(c.key, n)}
                  className={`cursor-pointer transition ${
                    n <= current
                      ? "text-yellow-500"
                      : "text-neutral-300 hover:text-yellow-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
