import PostPage from "./sidebar";

import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories,
} from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params: pendingParams }) {
  const params = await pendingParams;
  const post = await getPostBySlug(params.slug);
  return { title: post.title };
}

export default async function PostDefault({ params: pendingParams }) {
  const params = await pendingParams;
  const post = await getPostBySlug(params.slug);
  const categories = await getTopCategories();
  return <PostPage post={post} categories={categories} />;
}

// export const revalidate = 60;
