import {
  DocumentPickerOptions,
  DocumentPickerResponse,
  pick,
} from '@react-native-documents/picker';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {UploadFile} from '../interfaces/UploadFile';

export async function pickSingleAttachment(
  options?: DocumentPickerOptions,
): Promise<UploadFile | null> {
  try {
    const results: DocumentPickerResponse[] | null = await pick({
      ...options,
      allowMultiSelection: false,
    });

    if (results.length > 0) {
      const file = results[0];
      return {
        uri: file.uri,
        name: file.name,
        type: file.type,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pickMultipleAttachment(
  options?: DocumentPickerOptions,
): Promise<UploadFile[]> {
  try {
    const results: DocumentPickerResponse[] | null = await pick({
      ...options,
      allowMultiSelection: false,
    });

    if (results.length > 0) {
      const files: UploadFile[] = [];
      for await (const result of results) {
        files.push({
          uri: result.uri,
          name: result.name,
          type: result.type,
        });
      }
      return files;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function pickSingleImage(
  options?: ImageLibraryOptions,
): Promise<UploadFile | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }

    const results: ImagePickerResponse = await launchImageLibrary({
      ...options,
      includeBase64: true,
      selectionLimit: 1,
    });

    if (results.assets && results.assets.length > 0) {
      const file = results.assets[0];
      return {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pickMultipleImage(
  options?: ImageLibraryOptions,
): Promise<UploadFile[] | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }
    const results = await launchImageLibrary({
      ...options,
      includeBase64: true,
    });
    if (results.assets && results.assets.length > 0) {
      const files: UploadFile[] = [];
      for await (const result of results.assets) {
        files.push({
          uri: result.uri,
          name: result.fileName,
          type: result.type,
        });
      }
      return files;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function takeImage(
  options?: ImageLibraryOptions,
): Promise<UploadFile | null> {
  try {
    if (!options) {
      options = {
        mediaType: 'photo',
      };
    }
    const results = await launchCamera({
      ...options,
      includeBase64: true,
    });

    if (results.assets && results.assets.length > 0) {
      const file = results.assets[0];
      return {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
