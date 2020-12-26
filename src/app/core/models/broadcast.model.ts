// Interface that represents a broadcast message.
export interface IBroadcast {
  key: EBroadcast;
  value: any;
}

// Enumerator for broadcast message keys.
export enum EBroadcast {
  ChangeLanguage,
}
