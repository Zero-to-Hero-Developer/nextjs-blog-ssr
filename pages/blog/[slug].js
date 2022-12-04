import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Layout from "../../components/Layout";

export default function BlogDetail({ frontmatter, content }) {
  const { title, author, category, date, bannerImage, tags } = frontmatter;

  return (
    <Layout title={title}>
      <h2>
        {author} || {date}
      </h2>
      <h3>
        {category} || {tags.join()}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  let path = `posts/${slug}.md`;
  if (fs.existsSync(path)) {
    const fileName = fs.readFileSync(path, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
