export function buildYouTubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

export function sendYouTubeCommand(
  iframe: HTMLIFrameElement,
  func: string,
): void {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: "" }),
    "*",
  );
}
