import { BLOG_TITLE } from "@/constants";
import Link from "next/link";
import styles from "./notFound.module.css";
export const metadata = {
  title: `Page not found | ${BLOG_TITLE}`,
  description: "This page does not exist. Please check the URL and try again.",
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
