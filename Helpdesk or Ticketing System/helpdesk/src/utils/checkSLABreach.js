const checkSLABreach = (ticket) => {
  const now = new Date();

  const isResolved =
    ticket.status === "resolved" ||
    ticket.status === "closed";

  if (isResolved) {
    return false;
  }

  if (!ticket.resolutionDeadline) {
    return false;
  }

  return now > ticket.resolutionDeadline;
};

export default checkSLABreach;