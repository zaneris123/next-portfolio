import { Card, CardBody } from "@nextui-org/card"

export const PortfolioCards = ({ projects }: { projects: any[] }) => {
    return (
      <div>
        {projects.map((project: any) => (
            <Card>
              <CardBody>
                {project.title.rendered}
              </CardBody>
            </Card>
        ))}
      </div>
    );
  };