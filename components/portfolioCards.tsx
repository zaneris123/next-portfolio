import { Card } from "@nextui-org/card";
import Image from "next/image";

export const PortfolioCards = ({ projects }: { projects: any[] }) => {
  return (
    <div>
      {projects.map((project: any) => (
        <Card key={project.id} isFooterBlurred>
          <Image
            alt={project.title.rendered}
            src={project._embedded["wp:featuredmedia"][0].source_url}
            width={300}
            height={300}
          />
        </Card>
      ))}
    </div>
  );
};
