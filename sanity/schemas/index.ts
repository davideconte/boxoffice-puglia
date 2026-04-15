import blockContent from "./blockContent";
import category from "./category";
import venue from "./venue";
import event from "./event";
import pointOfSale from "./pointOfSale";
import article from "./article";
import author from "./author";
import service from "./service";
import posApplication from "./posApplication";
import siteSettings from "./siteSettings";

export const schemaTypes = [
  // Settings (singleton)
  siteSettings,
  // Content
  event,
  article,
  pointOfSale,
  // References
  venue,
  category,
  author,
  service,
  // Submissions
  posApplication,
  // Primitives
  blockContent,
];
