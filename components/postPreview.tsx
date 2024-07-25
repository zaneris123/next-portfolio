import { Card, CardBody, CardHeader } from "@nextui-org/card";

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
    </Card>
  );
};
