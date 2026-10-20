import { parseDomainExport } from "./domain-import";
self.onmessage = (event: MessageEvent<{ bytes: ArrayBuffer; observedOn: string }>) => {
  try {
    self.postMessage({ preview: parseDomainExport(event.data.bytes, event.data.observedOn) });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : "Unable to read export." });
  }
};
