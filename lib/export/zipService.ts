import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface ZipExportOptions {
  videos: { blob: Blob; filename: string }[];
  captions: string;
  zipFilename?: string;
}

export async function exportToZip(options: ZipExportOptions): Promise<void> {
  const zip = new JSZip();

  // Add videos to the zip
  options.videos.forEach((video) => {
    zip.file(video.filename, video.blob);
  });

  // Add captions.txt
  zip.file('captions.txt', options.captions);

  // Generate the zip file as a Blob
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  // Trigger download
  saveAs(zipBlob, options.zipFilename || 'export.zip');
}
