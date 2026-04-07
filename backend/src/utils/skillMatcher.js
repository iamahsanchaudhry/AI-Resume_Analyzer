export const isSimilar = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a.includes(b) || b.includes(a);
};

export const matchSkills = (resumeSkills, jobSkills) => {
  const matchedSkills = [];
  const missingSkills = [];
  const weakMatches = [];

  const resumeLower = resumeSkills.map(s => s.toLowerCase());

  jobSkills.forEach((jobSkill) => {
    const job = jobSkill.toLowerCase();

    const match = resumeLower.find(resSkill => {
      const isMatch = isSimilar(resSkill, job);

      if (isMatch) {
        // weak match if partial
        if (resSkill.length !== job.length) {
          weakMatches.push(jobSkill);
        } else {
          matchedSkills.push(jobSkill);
        }
      }

      return isMatch;
    });

    if (!match) {
      missingSkills.push(jobSkill);
    }
  });

  return {
    matchedSkills,
    missingSkills,
    weakMatches
  };
};