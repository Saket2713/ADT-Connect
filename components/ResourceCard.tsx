"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  resourceLink: string;
}

const ResourceCard = ({ title, description, icon, resourceLink }: ResourceCardProps) => {
  const { toast } = useToast();

  const handleNavigate = () => {
    window.location.href = resourceLink; // Navigate to the resource page
    toast({
      title: "Navigating to Resource",
    });
  };

  return (
    <section className="flex min-h-[200px] w-full flex-col justify-between rounded-[14px] bg-light-1 px-5 py-8">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="resource" width={28} height={28} />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-base font-normal">{description}</p>
        </div>
      </article>
      <article className="flex justify-center">
        <Button onClick={handleNavigate} className="bg-blue-1 px-6">
          Go to Resource
        </Button>
      </article>
    </section>
  );
};

export default ResourceCard;