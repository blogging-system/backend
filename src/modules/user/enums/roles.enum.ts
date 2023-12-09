export enum ROLES {
  VISITOR = "Visitor", // Default role for users with read-only access to view blog content.
  READER = "Reader", // Registered users with the ability to read blog content.
  SUBSCRIBER = "Subscriber", // Users who have opted to subscribe to specific blogs or content.
  CONTRIBUTOR = "Contributor", // Users who can create and submit their own blog posts.
  AUTHOR = "Author", // Users with the ability to create, edit, and manage their own blog posts.
  EDITOR = "Editor", // Users responsible for editing and moderating blog posts, including those of other users.
  MODERATOR = "Moderator", // Users with the role of moderating user-generated content and discussions.
  REVIEWER = "Reviewer", // Users responsible for reviewing and approving blog posts before publication.
  CRITIC = "Critic", // Users who provide feedback and reviews on blog posts.
  TRANSLATOR = "Translator", // Users who can translate blog content into different languages.
  REPORTER = "Reporter", // Users with the ability to report inappropriate content or behavior.
  ORGANIZER = "Organizer", // Users responsible for organizing content on the platform.
  COMMUNITY_MANAGER = "CommunityManager", // Users tasked with managing and engaging with the blogging community.
  SOCIAL_MEDIA_MANAGER = "SocialMediaManager", // Users responsible for sharing and promoting blog content on social media.
  ANALYST = "Analyst", // Users with access to analytics and insights about blog performance.
  SUBSCRIBER_MANAGER = "SubscriberManager", // Users who manage subscriptions and email notifications.
  AD_MODERATOR = "AdModerator", // Users responsible for moderating and managing advertisements on the platform.
  TECH_SUPPORT = "TechSupport", // Users designated to provide technical support to other users.
  EVENT_COORDINATOR = "EventCoordinator", // Users responsible for organizing and promoting events related to the blogging platform.
  SYSTEM_ADMINISTRATOR = "SystemAdministrator", // Users with full control over the blogging system, including user management and system configuration.
  SYSTEM_OWNER = "SystemOwner", // Highest level of access, typically reserved for system owners or developers.
}
