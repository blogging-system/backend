export enum ROLES {
  GUEST = "Guest", // Default role for users with read-only access to view blog content.
  USER = "User", // Registered users with basic access.
  CONTRIBUTOR = "Contributor", // Users who can create and submit their own content.
  MODERATOR = "Moderator", // Users responsible for moderating user-generated content and discussions.
  ADMINISTRATOR = "Administrator", // Users with administrative privileges over the platform.
  OWNER = "Owner", // Highest level of access, typically reserved for system owners or developers.
}
