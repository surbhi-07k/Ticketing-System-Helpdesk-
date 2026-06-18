const calculateSLA = (priority) => {
  const now = new Date();

  let responseHours;
  let resolutionHours;

  switch (priority) {
    case "urgent":
      responseHours = 1;
      resolutionHours = 4;
      break;

    case "high":
      responseHours = 4;
      resolutionHours = 8;
      break;

    case "medium":
      responseHours = 8;
      resolutionHours = 24;
      break;

    case "low":
      responseHours = 24;
      resolutionHours = 72;
      break;

    default:
      responseHours = 8;
      resolutionHours = 24;
  }

  const responseDeadline = new Date(
    now.getTime() +
      responseHours * 60 * 60 * 1000
  );

  const resolutionDeadline = new Date(
    now.getTime() +
      resolutionHours * 60 * 60 * 1000
  );

  return {
    responseDeadline,
    resolutionDeadline,
  };
};

export default calculateSLA;