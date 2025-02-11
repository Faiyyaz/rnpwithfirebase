export interface UploadFile {
  url?: string;
  isDeleted?: boolean;
  gsPath?: string;
  base64?: string;
  name?: string | undefined | null;
  type?: string | undefined | null;
  uri?: string;
}
