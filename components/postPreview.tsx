import { DropDownIcon } from "@/components/icons";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { useState } from "react";

export const PostPreview = ({ post }: any) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = post.content.rendered.split('</p>');

  return (
    <Card
      isBlurred
      isPressable
      className={
        expanded
          ? "transition ease-in-out w-full mt-6 h-fit"
          : "transition ease-in-out h-32 w-full mt-6"
      }
      onPress={() => setExpanded(!expanded)}
    >
      <CardHeader>
        <h2
          dangerouslySetInnerHTML={{
            __html: post.title.rendered ? post.title.rendered : "*Untitled*",
          }}
          className="text-xl font-bold"
        />
        <DropDownIcon className={expanded ? "ml-auto" : "rotate-90 ml-auto"} />
      </CardHeader>
      <CardBody className="text-clip overflow-hidden w-full text-default-400 space-y-3">
        {paragraphs.map((paragraph: string, index: number) => (
          <div dangerouslySetInnerHTML={{ __html: paragraph }} key={index} />
        ))}
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
          Read on Wordpress
        </Link>
      </CardFooter>
    </Card>
  );
};
