import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

export const PostPreview = ({ post }: any) => {
  return (
    <Card className="border-2 w-full mt-6">
      <CardHeader>
        <h2
          dangerouslySetInnerHTML={{
            __html: post.title.rendered ? post.title.rendered : "*Untitled*",
          }}
          className="text-xl font-bold"
        />
      </CardHeader>
      <CardBody className="text-default-400 h-46">
        <div
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered
              .replace("</p>", "</p><br>")
              .replace(/<a[^>]*class="more-link"[^>]*>.*?<\/a>/gi, ""),
          }}
        />
      </CardBody>
      <CardFooter>
        <p className="text-default-300 text-sm">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <Link
          isExternal
          className="ml-auto"
          color="primary"
          href={post.link}
          rel="noopener noreferrer"
          size="sm"
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};
