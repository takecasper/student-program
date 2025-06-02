declare module 'react-media-recorder' {
  export interface MediaRecorderProps {
    video?: boolean;
    audio?: boolean;
    blobPropertyBag?: BlobPropertyBag;
  }

  export interface MediaRecorderState {
    status: 'idle' | 'recording' | 'stopped';
    mediaBlobUrl: string | null;
    previewStream: MediaStream | null;
    startRecording: () => void;
    stopRecording: () => void;
  }

  export function useReactMediaRecorder(props?: MediaRecorderProps): MediaRecorderState;
}
