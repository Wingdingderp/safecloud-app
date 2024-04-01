import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  logo: <span>smp</span>,
  logoLink: "/",
  project: {
    link: "https://github.com/Wingdingderp/safecloud-app",
  },
  docsRepositoryBase: "https://github.com/Wingdingderp/safecloud-app/blob",
  footer: {
    text: <span>SafeCloudSMP by Wing and August, for the community.</span>,
  },
  head: () => {
    const { frontMatter } = useConfig();

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content={
            frontMatter.title ? `${frontMatter.title} - smp docs` : "smp docs"
          }
        />
        <meta
          property="og:description"
          content={frontMatter.description || "SafeCloudSMP Documentation"}
        />
      </>
    );
  },
  useNextSeoProps() {
    const { route } = useRouter();

    if (route !== "/docs") {
      return {
        titleTemplate: "%s – smp",
      };
    }
  },
};
