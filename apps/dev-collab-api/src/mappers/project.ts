import { ProjectModel } from "shared/models/project";
import { Project } from "../entities/project";

export const mapProjectToProjectModel = (project: Project): ProjectModel =>
  ({
    projectId: project.projectId,
    name: project.name,
    description: project.description,
    avatar: project.avatar,
    created: project.created?.toISOString() || null,
    modified: project.modified?.toISOString() || null,
  }) satisfies ProjectModel;
