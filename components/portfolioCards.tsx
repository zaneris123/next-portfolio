import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import { useState } from "react";

export const PortfolioCards = ({ projects }: { projects: any[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  interface Project {
    id: string;
    content: {
      rendered: string;
    };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-wrap">
      {projects.map((project: any) => (
        <Card
          key={project.id}
          isPressable
          className="relative justify-center"
          onPress={() => {
            setCurrentProject(project);
            onOpen();
          }}
        >
          <CardHeader className="z-10 top-1 flex-col items-center justify-start">
            <h2
              dangerouslySetInnerHTML={{ __html: project.title.rendered }}
              className="text-medium font-bold"
            />
          </CardHeader>
          <CardBody className="flex justify-center items-center">
            {project._embedded && project._embedded["wp:featuredmedia"] && (
              <Image
                alt={project.title.rendered}
                className="object-cover object-center h-48 w-48 rounded-3xl"
                height={300}
                src={project._embedded["wp:featuredmedia"][0].source_url}
                width={300}
              />
            )}
          </CardBody>
        </Card>
      ))}
      <Modal
        isOpen={isOpen}
        size="xl"
        onClose={onClose}
        scrollBehavior="inside"
        className="w-full fixed"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {currentProject && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: currentProject.content.rendered,
                    }}
                    key={currentProject.id}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
