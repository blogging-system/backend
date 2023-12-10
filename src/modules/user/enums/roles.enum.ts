export enum ROLES {
  USER = "User", // Registered users with basic access.
  MODERATOR = "Moderator", // Users responsible for moderating user-generated content and discussions.
  ADMINISTRATOR = "Administrator", // Users with administrative privileges over the platform.
  OWNER = "Owner", // Highest level of access, typically reserved for system owners or developers.

  // ### Those should be added manually by "Administrator" or "Owner"
  SUBSCRIBER = "Subscriber", // Users who subscribe to updates or newsletters.
  ANALYST = "Analyst", // Users responsible for data analysis and reporting.
  MARKETER = "Marketer", // Users responsible for marketing activities.
  SUPPORT = "Support", // Users responsible for customer support interactions.
}
