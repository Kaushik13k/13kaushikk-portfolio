import rust from "@app/assets/icons/rust-icon.svg";

interface IconMapping {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  link: string;
  type: "lineicon" | "svg";
}

export const iconMappings: Record<string, IconMapping> = {
  python: {
    icon: "python",
    link: "https://www.python.org/",
    type: "lineicon",
  },
  "next.js": {
    icon: "nextjs",
    link: "https://nextjs.org/",
    type: "lineicon",
  },
  redis: { icon: "redis", link: "https://redis.io/", type: "lineicon" },
  rust: { icon: rust, link: "https://www.rust-lang.org/", type: "svg" },
};
