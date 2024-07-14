// ../types/Group.ts

export interface Group {
  groupId: string;
  groupName: string;
  participantsCount: number;
  totalMessages: number;
  totalSizeKB: number;
  totalEmissionsOneByte: number;
  totalEmissionsSWD: number;
  lastReportTimestamp: string;
  adminIds: number[];
  groupLimits: string;
  donations: string[]; // Assuming donations are strings
  textTotalMessages: number;
  textTotalSize: number;
  textEmissionsOneByteMethod: number;
  textEmissionsSWDMethod: number;
  photoTotalMessages: number;
  photoTotalSize: number;
  photoEmissionsOneByteMethod: number;
  photoEmissionsSWDMethod: number;
  voiceTotalMessages: number;
  voiceTotalSize: number;
  voiceEmissionsOneByteMethod: number;
  voiceEmissionsSWDMethod: number;
  videoTotalMessages: number;
  videoTotalSize: number;
  videoEmissionsOneByteMethod: number;
  videoEmissionsSWDMethod: number;
  documentTotalMessages: number;
  documentTotalSize: number;
  documentEmissionsOneByteMethod: number;
  documentEmissionsSWDMethod: number;
  pollTotalMessages: number;
  pollTotalSize: number;
  pollEmissionsOneByteMethod: number;
  pollEmissionsSWDMethod: number;
  stickerTotalMessages: number;
  stickerTotalSize: number;
  stickerEmissionsOneByteMethod: number;
  stickerEmissionsSWDMethod: number;
}
