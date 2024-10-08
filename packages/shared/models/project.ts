export interface ProjectModel {
  projectId: number;
  name: string;
  description: string | null;
  avatar: string | null;
  created: string | null;
  modified: string | null;
}

export interface ProjectCreateCommand {
  name: string;
  description: string | null;
  avatar: string | null;
}

export interface ProjectUpdateCommand {
  name: string;
  description: string | null;
  avatar: string | null;
}
