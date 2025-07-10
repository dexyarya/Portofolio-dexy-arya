// components/ProjectCard.tsx
import React from 'react';
import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image'

// Definisi tipe untuk props ProjectCard
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveLink?: string;
  githubLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imgSrc, setImgSrc] = useState(project.image)
  const fallbackUrl = `https://placehold.co/600x400/1a202c/a0aec0?text=${encodeURIComponent(project.title)}`;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-green-glow border border-gray-700">
  <div className="w-full h-48 relative">
      <Image
        src={imgSrc}
        alt={project.title}
        fill
        className="object-cover rounded"
        onError={() => setImgSrc(fallbackUrl)}
        sizes="(max-width: 768px) 100vw, 600px"
        priority
      />
    </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-green-400 mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-green-glow-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-green-glow-sm"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
