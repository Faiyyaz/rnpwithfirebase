import storage from '@react-native-firebase/storage';
import {UploadFile} from '../interfaces/UploadFile';

export async function deleteFile(gsPath: string | undefined): Promise<void> {
  await storage().ref(gsPath).delete();
}

async function processFile(
  file: UploadFile,
  pageName: string,
): Promise<UploadFile | null> {
  try {
    const url = file.url;
    const isDeleted = file.isDeleted;
    if (!isDeleted) {
      if (url) {
        return file;
      } else {
        if (file.type === 'application/pdf') {
          const newFile = await uploadPdf(file, pageName);
          return newFile;
        } else {
          const newFile = await uploadImage(file, pageName);
          return newFile;
        }
      }
    } else if (url) {
      const gsPath = file.gsPath;
      await deleteFile(gsPath);
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function uploadFiles(
  files: UploadFile[] | UploadFile,
  pageName: string,
): Promise<UploadFile[]> {
  const finalFiles = [];

  if (files && Array.isArray(files)) {
    for (const file of files) {
      try {
        const newFile = await processFile(file, pageName);
        if (newFile) {
          finalFiles.push(newFile);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  } else {
    const file = files;
    try {
      const newFile = await processFile(file, pageName);
      if (newFile) {
        finalFiles.push(newFile);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return finalFiles;
}

async function uploadPdf(
  file: UploadFile,
  pageName: string,
): Promise<UploadFile> {
  try {
    const fileName = file.name;
    const fileStoragePath = `/pdf/${pageName}/${fileName}`;
    const fileRef = storage().ref(fileStoragePath);
    const fileUri = file.uri;

    if (fileUri) {
      await fileRef.putFile(fileUri);
    }

    const fileDownloadUrl = await fileRef.getDownloadURL();

    const newPdfFile = {
      url: fileDownloadUrl,
      gsPath: fileStoragePath,
      name: fileName,
    };

    return newPdfFile;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function uploadImage(
  file: UploadFile,
  pageName: string,
): Promise<UploadFile> {
  try {
    const fileName = file.name;
    const imgStoragePath = `/images/${pageName}/${fileName}`;
    const imgRef = storage().ref(imgStoragePath);

    const fileUri = file.uri;

    if (fileUri) {
      await imgRef.putFile(fileUri);
    }

    const imgDownloadUrl = await imgRef.getDownloadURL();
    const newImage = {
      url: imgDownloadUrl,
      gsPath: imgStoragePath,
      name: fileName,
    };
    return newImage;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
