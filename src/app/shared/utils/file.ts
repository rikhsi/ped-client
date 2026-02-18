import { environment } from 'src/environments/environment';

/**
 * Преобразует файл в Data URL (base64).
 * Это удобно, если нужно, например, отобразить превью картинки до загрузки.
 *
 * @param file - объект File из <input type="file"> или Drag&Drop
 * @returns Promise, который резолвится строкой с Data URL (base64)
 *
 * Пример:
 * const url = await fileToDataUrl(file);
 * img.src = url; // показывает картинку
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Сработает, когда файл полностью считан
    reader.onload = () => {
      resolve(reader.result as string);
    };

    // На случай ошибки чтения файла
    reader.onerror = () => {
      reject(reader.error);
    };

    // Начинаем читать файл как Data URL (base64)
    reader.readAsDataURL(file);
  });
}

/**
 * Скачивает Blob как файл.
 *
 * @param blob - бинарные данные файла (например, из API)
 * @param filename - имя файла (с расширением)
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  // Добавляем в документ, кликаем и убираем
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Освобождаем память
  URL.revokeObjectURL(url);
}

export async function downloadImage(
  url: string,
  filename: string = 'image.jpg',
): Promise<boolean> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const blob = await response.blob();
    const link = document.createElement('a');
    const objectURL = URL.createObjectURL(blob);

    link.href = objectURL;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(objectURL);
    return true;
  } catch (error) {
    return false;
  }
}

export async function fetchFileFromUrl(
  url: string,
  fileName?: string,
): Promise<File> {
  try {
    // Определяем имя файла
    const name = fileName || url.split('/').pop() || 'file';

    // Определяем тип по расширению
    const ext = name.split('.').pop()?.toLowerCase();
    let type = 'application/octet-stream'; // по умолчанию

    if (ext === 'pdf') type = 'application/pdf';
    else if (ext === 'zip') type = 'application/zip';
    else if (ext === 'txt') type = 'text/plain';
    else if (ext === 'jpg' || ext === 'jpeg') type = 'image/jpeg';
    else if (ext === 'png') type = 'image/png';
    // можно расширять список по необходимости

    // Загружаем файл
    const response = await fetch(environment.fileUrl + url);

    const blob = await response.blob();

    return new File([blob], name, { type });
  } catch (error) {
    throw error;
  }
}
