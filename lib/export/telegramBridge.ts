export interface TelegramPostOptions {
  botToken: string;
  chatId: string;
  videoBlob: Blob;
  caption: string;
}

export async function postToTelegram(options: TelegramPostOptions): Promise<void> {
  const { botToken, chatId, videoBlob, caption } = options;

  const url = `https://api.telegram.org/bot${botToken}/sendVideo`;
  const formData = new FormData();

  formData.append('chat_id', chatId);
  formData.append('caption', caption);
  formData.append('video', videoBlob, 'video.mp4');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.status} - ${errorText}`);
  }
}
