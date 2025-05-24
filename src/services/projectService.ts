import { Client, Databases, Storage, ID } from "appwrite";
import type { Project } from "@/types/Project";
import { useImageUtils } from "@/composables/useImageUtils";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export async function uploadImagem(file: File): Promise<string> {
  const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
  return response.$id;
}

export function getImagemUrl(imagemId: string): string | null {
  if (!imagemId) return null;

  try {
    return storage.getFilePreview(BUCKET_ID, imagemId).toString();
  } catch (error) {
    console.error("Erro ao buscar URL da imagem", error);
    return null;
  }
}

export async function criarProjeto(project: Project): Promise<Project> {
  const { id, ...projectData } = project;
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    projectData
  );
  return { id: response.$id, ...response } as unknown as Project;
}

export async function atualizarProjeto(project: Project): Promise<Project> {
  const { extrairIdDaImagem } = useImageUtils();
  const { $id } = project;
  if (!$id) throw new Error("Projeto sem $id");

  const projectData = {
    name: project.name,
    cliente: project.cliente,
    datainicio: project.datainicio,
    datafim: project.datafim,
    imagem: project.imagem,
    favorito: project.favorito,
  };

  const response = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    $id,
    projectData
  );

  return response as unknown as Project;
}

export async function updateFavorito(
  id: string,
  dados: Partial<Project>
): Promise<Project> {
  const response = await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    id,
    dados
  );

  return response as unknown as Project;
}

export async function deletarProjeto(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
}

export async function listarProjetos(): Promise<Project[]> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

  const projetos = await Promise.all(
    response.documents.map(async (doc) => {
      const url = await storage.getFilePreview(BUCKET_ID, doc.imagem);
      return {
        ...doc,
        imagem: url,
      };
    })
  );

  return projetos as unknown as Project[];
}
